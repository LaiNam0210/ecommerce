package query

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"log"
	"net/http"
	"regexp"
	"runtime/debug"
	"strconv"
	"strings"

	"labix.org/v2/mgo"
	"labix.org/v2/mgo/bson"
)

type (
	OnChangeFunc func(db *mgo.Database, action string, id int64, data Doc)
	BeforeFunc   func(db *mgo.Database, action string, id int64, data Doc) bool
)

type QueryHandler struct {
	db         *mgo.Database
	collection *mgo.Collection

	name    string
	route   string
	route_  string
	sorts   []string
	perPage int

	maxId         int64
	onchanges     []OnChangeFunc
	beforecreates []BeforeFunc
	beforeupdates []BeforeFunc
	searches      []*searchStruct
	populates     []*populateStruct
}

type ListResponse struct {
	Total   int         `json:"total"`
	Page    int         `json:"page"`
	PerPage int         `json:"perPage"`
	Data    interface{} `json:"data"`
}

type (
	M   map[string]interface{}
	Doc map[string]interface{}
)

const (
	Create = "create"
	Update = "update"
	Delete = "delete"

	Number = "number"
	String = "string"
)

type searchStruct struct {
	field     string
	fieldType string
}

type populateStruct struct {
	field      string
	srcField   string
	refField   string
	collection string
	sort       string
	isList     bool
}

func New(db *mgo.Database,
	collection string, route string) *QueryHandler {

	q := new(QueryHandler)
	q.db = db
	q.name = collection
	q.collection = db.C(collection)

	if route != "/" && route[len(route)-1] == '/' {
		route = route[:len(route)-1]
	}
	q.route = route
	q.route_ = route + "/"

	q.maxId = -1

	return q
}

func (q *QueryHandler) DefaultPerPage(perPage int) *QueryHandler {

	if perPage < 0 {
		panic("perPage negative")
	}

	q.perPage = perPage
	return q
}

func (q *QueryHandler) DefaultSort(sorts ...string) *QueryHandler {
	q.sorts = sorts
	return q
}

var searchRe = regexp.MustCompile("^([a-zA-Z0-9_]+)(,([a-zA-Z0-9_]+))?$")

func (q *QueryHandler) EnableSearch(searches ...string) *QueryHandler {
	if q.searches == nil {
		q.searches = make([]*searchStruct, 0)
	}

	for _, str := range searches {

		parts := searchRe.FindStringSubmatch(str)
		s := &searchStruct{
			field:     parts[1],
			fieldType: parts[3],
		}

		// We currently only support number and string
		if s.fieldType != Number {
			s.fieldType = String
		}

		q.searches = append(q.searches, s)
	}

	return q
}

func (q *QueryHandler) BeforeCreate(callbacks ...BeforeFunc) *QueryHandler {
	if q.beforecreates == nil {
		q.beforecreates = make([]BeforeFunc, 0)
	}
	for _, callback := range callbacks {
		q.beforecreates = append(q.beforecreates, callback)
	}
	return q
}

func (q *QueryHandler) BeforeUpdate(callbacks ...BeforeFunc) *QueryHandler {
	if q.beforeupdates == nil {
		q.beforeupdates = make([]BeforeFunc, 0)
	}
	for _, callback := range callbacks {
		q.beforeupdates = append(q.beforeupdates, callback)
	}
	return q
}

func (q *QueryHandler) OnChange(callbacks ...OnChangeFunc) *QueryHandler {
	if q.onchanges == nil {
		q.onchanges = make([]OnChangeFunc, 0)
	}
	for _, callback := range callbacks {
		q.onchanges = append(q.onchanges, callback)
	}
	return q
}

func (q *QueryHandler) fireBefore(callbacks []BeforeFunc, action string, id int64, doc Doc) bool {
	if callbacks == nil {
		return true
	}

	for _, fn := range callbacks {
		if !fn(q.db, action, id, doc) {
			log.Println("fireBefore stop")
			return false
		}
	}

	return true
}

func (q *QueryHandler) fireOnChange(action string, id int64, doc Doc) {

	if q.onchanges == nil {
		return
	}

	for _, fn := range q.onchanges {
		fn(q.db, action, id, doc)
	}
}

//                                   .111111111111111.233333333333333322.444444.555555555555555..66666666666666677888.999999999999997..
var populateRe = regexp.MustCompile(`^([a-zA-Z0-9_]+):(([a-zA-Z0-9_]+)=)?(\[\])?([a-zA-Z0-9_]+)\.([a-zA-Z0-9_]+)(,(-)?([a-zA-Z0-9]+))?$`)

func (q *QueryHandler) Populate(descs ...string) *QueryHandler {
	if q.populates == nil {
		q.populates = make([]*populateStruct, 0)
	}

	for _, s := range descs {

		parts := populateRe.FindStringSubmatch(s)

		p := &populateStruct{
			field:      parts[1],
			srcField:   parts[3],
			collection: parts[5],
			refField:   parts[6],
			sort:       parts[8] + parts[9], // T
		}
		if len(parts[4]) > 0 {
			p.isList = true
		}
		if p.srcField == "" {
			p.srcField = p.field
		}

		q.populates = append(q.populates, p)
	}

	return q
}

func (q *QueryHandler) doPopulate(docs []Doc) {
	if q.populates == nil || docs == nil {
		return
	}

	// (1) Find all ids in each doc & collection
	// (2) Query using {_id: {$in: [1,2]}}
	// (3) Read result and put back into docs

	// (1)
	// collection[name][id]
	cached := make(map[string]map[int64]interface{})

	for _, p := range q.populates {

		_C := cached[p.collection]
		if _C == nil {
			_C = make(map[int64]interface{})
			cached[p.collection] = _C
		}

		// We current only support single id population, single deep level
		switch {
		case !p.isList:

			for _, doc := range docs {
				srcData := doc[p.srcField]
				if srcData == nil {
					continue
				}

				// Assume Id, int64
				refId, err := toInt64(srcData)
				if err != nil {
					log.Println("Populate not support (id)", p, srcData)
					continue
				}

				_C[refId] = nil
			}

		default:
			log.Println("Populate not support", p)
			continue
		}
	}

	// (2)
	for _name, _C := range cached {

		_ids := make([]int64, len(_C))
		_i := 0
		for _id, _ := range _C {
			_ids[_i] = _id
			_i++
		}

		C := q.db.C(_name)
		var _docs []Doc
		err := C.Find(M{"_id": M{"$in": _ids}}).All(&_docs)

		if err != nil {
			log.Println("Populate error (2)", err, _name, _ids)
			continue
		}

		for _, _doc := range _docs {
			_id, err := toInt64(_doc["_id"])
			if err != nil {
				log.Println("Populate not support (2)", _name, _doc["_id"], _doc)
				continue
			}

			_C[_id] = _doc
		}
	}

	// (3)
	for _, p := range q.populates {

		_C := cached[p.collection]

		// We current only support single id population, single deep level
		switch {
		case !p.isList:

			for _, doc := range docs {
				srcData := doc[p.srcField]
				if srcData == nil {
					continue
				}

				// Assume Id, int64
				refId, err := toInt64(srcData)
				if err != nil {
					log.Println("Populate not support (id)", p, srcData, refId)
					continue
				}

				doc[p.field] = _C[refId]
			}

		default:
			log.Println("Populate not support", p)
			continue
		}
	}
}

func (q *QueryHandler) Index(res http.ResponseWriter, req *http.Request) {

	defer func() {
		err := recover()
		if err == nil {
			return
		}
		q.ServerError(res, req)
		log.Printf("Error INDEX: %v\n", err)
		debug.PrintStack()
	}()

	// var args argsStruct
	// loadFormValues(req, &args)

	page, err := strconv.Atoi(req.FormValue("page"))
	if err != nil || page < 0 {
		page = 0
	}

	perPage, err := strconv.Atoi(req.FormValue("per_page"))
	if err != nil || perPage < 0 {
		perPage = q.perPage
	}

	searches := q.parseSearch(res, req)
	data := q.readList(page, perPage, searches)

	res.Write(data)
}

func (q *QueryHandler) parseSearch(res http.ResponseWriter, req *http.Request) M {

	var result M

	for _, searchField := range q.searches {

		name := searchField.field
		searchValue := req.FormValue("search_" + name)

		searchValue = strings.TrimSpace(searchValue)
		if searchValue == "" {
			continue
		}

		if result == nil {
			result = make(M)
		}

		var value interface{}
		var err error

		switch searchField.fieldType {
		case String:
			value = &bson.RegEx{
				Pattern: searchValue,
				Options: "i",
			}

		case Number:
			// search_name=A_B, A_, _B, A
			numbers := strings.Split(searchValue, "_")

			if len(numbers) == 1 {
				value, err = toInt64(numbers[0])
				if err != nil {
					log.Println("Search error", searchField, value)
					continue
				}

			} else if len(numbers) == 2 {
				_M := make(M)
				value = _M

				if numbers[0] == "" && numbers[1] == "" {
					log.Println("Search error [0,1]", searchField, numbers)
					continue
				}
				if numbers[0] != "" {
					_M["$gte"], err = toInt64(numbers[0])
					if err != nil {
						log.Println("Search error [0]", searchField, numbers)
						continue
					}
				}
				if numbers[1] != "" {
					_M["$lte"], err = toInt64(numbers[1])
					if err != nil {
						log.Println("Search error [1]", searchField, numbers)
						continue
					}
				}

			} else {
				log.Println("Search error", searchField, value)
				continue
			}

		default:
			log.Println("Search not support", searchField)
			continue
		}

		result[name] = value
	}

	return result
}

func (q *QueryHandler) Find(res http.ResponseWriter, req *http.Request,
	id int64) {

	defer func() {
		err := recover()
		if err == nil {
			return
		}

		e, ok := err.(error)
		if ok && strings.Index(e.Error(), "not found") >= 0 {
			log.Println("Not Found", req.RequestURI)
			q.NotFound(res, req)
			return
		}

		q.ServerError(res, req)
		log.Printf("Error GET ONE: %v\n", err)
		debug.PrintStack()
	}()

	data := q.readItem(id)

	res.Write(data)
}

func (q *QueryHandler) Post(res http.ResponseWriter, req *http.Request) {

	defer func() {
		err := recover()
		if err == nil {
			return
		}
		q.ServerError(res, req)
		log.Printf("Error POST: %v %v", req.RequestURI, err)
		debug.PrintStack()
	}()

	data, err := ioutil.ReadAll(req.Body)
	panicIfError(err)

	doc := q.createItem(data)
	q.OK(res, req, doc)
}

func (q *QueryHandler) Put(res http.ResponseWriter, req *http.Request,
	id int64) {

	defer func() {
		err := recover()
		if err == nil {
			return
		}
		q.ServerError(res, req)
		log.Printf("Error PUT: %v %v", req.RequestURI, err)
		debug.PrintStack()
	}()

	data, err := ioutil.ReadAll(req.Body)
	panicIfError(err)

	doc := q.updateItem(id, data)
	q.OK(res, req, doc)
}

func (q *QueryHandler) Delete(res http.ResponseWriter, req *http.Request,
	id int64) {

	defer func() {
		err := recover()
		if err == nil {
			return
		}
		q.ServerError(res, req)
		log.Printf("Error DELETE: %v %v", req.RequestURI, err)
		debug.PrintStack()
	}()

	q.deleteItem(id)
	q.OK(res, req, nil)
}

func (q *QueryHandler) requestNextId() int64 {

	if q.maxId < 0 {
		q.maxId = q.queryMaxId()
	}

	q.maxId++
	return q.maxId
}

func (q *QueryHandler) queryMaxId() int64 {

	var doc struct {
		Id int64 `bson:"_id"`
	}

	err := q.collection.Find(nil).Sort("-_id").One(&doc)
	if err != nil {
		// log.Printf("Error queryMaxId %v\n", err)
		return 0
	}

	return doc.Id
}

func (q *QueryHandler) handler(res http.ResponseWriter, req *http.Request) {

	uri := req.URL.Path
	if uri != q.route {
		log.Println("uri", uri, q.route)
		q.BadRequest(res, req)
		return
	}

	err := req.ParseForm()
	if err != nil {
		log.Printf("Error handler, parseForm: %v %v", req.RequestURI, q.name)
		q.BadRequest(res, req)
		return
	}

	switch req.Method {
	case "GET":
		q.Index(res, req)

	case "POST":
		q.Post(res, req)

	default:
		q.BadRequest(res, req)
		return
	}
}

func (q *QueryHandler) handlerId(res http.ResponseWriter, req *http.Request) {

	uri := req.URL.Path
	if !strings.HasPrefix(uri, q.route_) {
		log.Println("Bad Request:", uri, q.route_)
		q.BadRequest(res, req)
		return
	}

	_id := uri[len(q.route_):]
	id, err := toInt64(_id)
	if err != nil {
		log.Println("Bad Request, id:", uri, _id)
		q.BadRequest(res, req)
		return
	}

	err = req.ParseForm()
	if err != nil {
		log.Printf("Error handlerId, parseForm: %v %v", req.RequestURI, q.name)
		q.BadRequest(res, req)
		return
	}

	switch req.Method {
	case "GET":
		q.Find(res, req, id)

	case "PUT":
		q.Put(res, req, id)

	case "DELETE":
		q.Delete(res, req, id)

	default:
		q.BadRequest(res, req)
		return
	}
}

func (q *QueryHandler) BadRequest(res http.ResponseWriter, req *http.Request) {

	res.WriteHeader(400)
	res.Write([]byte("Bad Request"))
}

func (q *QueryHandler) ServerError(res http.ResponseWriter, req *http.Request) {

	res.WriteHeader(500)
	res.Write([]byte("Server Error"))
}

func (q *QueryHandler) NotFound(res http.ResponseWriter, req *http.Request) {

	res.WriteHeader(404)
	res.Write([]byte("Not Found"))
}

func (q *QueryHandler) OK(res http.ResponseWriter, req *http.Request, doc Doc) {

	if doc == nil {
		res.WriteHeader(200)
		res.Write([]byte("OK"))

	} else {
		data, err := json.Marshal(doc)
		if err != nil {
			log.Println(err)
			q.ServerError(res, req)
			return
		}
		res.WriteHeader(200)
		res.Write(data)
	}
}

func (q *QueryHandler) RegisterRoutes(mux *http.ServeMux) {

	if mux == nil {
		mux = http.DefaultServeMux
	}

	if q.route == "" {
		panic("Route not init")
		return
	}

	mux.HandleFunc(q.route, q.handler)
	mux.HandleFunc(q.route_, q.handlerId)
}

func (q *QueryHandler) readList(page, perPage int,
	searches M) []byte {

	C := q.collection
	query := C.Find(searches)
	queryCount := C.Find(searches)

	if q.sorts != nil {
		query = query.Sort(q.sorts...)
	}

	start := page * perPage
	if start > 0 {
		query = query.Skip(start)
	}

	if perPage > 0 {
		query = query.Limit(perPage)
	}

	var docs []Doc
	err := query.All(&docs)
	panicIfError(err)

	if docs == nil {
		docs = make([]Doc, 0)
	}

	q.doPopulate(docs)

	total, err := queryCount.Count()
	panicIfError(err)

	response := ListResponse{
		Total:   total,
		Page:    page,
		PerPage: perPage,
		Data:    docs,
	}

	data, err := json.Marshal(response)
	panicIfError(err)

	return data
}

func (q *QueryHandler) readItem(id int64) []byte {

	var doc Doc
	err := q.collection.FindId(id).One(&doc)
	panicIfError(err)

	q.doPopulate([]Doc{doc})

	data, err := json.Marshal(doc)
	panicIfError(err)

	return data
}

func (q *QueryHandler) createItem(data []byte) Doc {

	doc := parseData(data)
	nextId := q.requestNextId()
	ok := q.fireBefore(q.beforecreates, Create, nextId, doc)
	if !ok {
		panic("BeforeFunc not ok")
	}

	doc["_id"] = nextId

	err := q.collection.Insert(doc)
	panicIfError(err)

	q.fireOnChange(Create, nextId, doc)
	return doc
}

func (q *QueryHandler) updateItem(id int64, data []byte) Doc {

	doc := parseData(data)
	ok := q.fireBefore(q.beforeupdates, Update, id, doc)
	if !ok {
		panic("BeforeFunc not ok")
	}

	doc["_id"] = id

	err := q.collection.UpdateId(id, doc)
	panicIfError(err)

	q.fireOnChange(Update, id, doc)
	return doc
}

func (q *QueryHandler) deleteItem(id int64) {

	err := q.collection.RemoveId(id)
	panicIfError(err)

	q.fireOnChange(Delete, id, nil)
}

func parseData(data []byte) Doc {
	var doc Doc
	err := json.Unmarshal(data, &doc)
	panicIfError(err)

	// remove private properties, include _id
	for i := range doc {
		if len(i) > 0 && (i[0] == '_' || i[0] == '$') {
			delete(doc, i)
		}
	}

	return doc
}

var kErrorInt64 = errors.New("toInt64")

func toInt64(number interface{}) (i int64, err error) {

	switch number := number.(type) {
	case int:
		i = int64(number)

	case int32:
		i = int64(number)

	case int64:
		i = number

	case float64:
		i = int64(number)

	case string:
		var ix int
		ix, err = strconv.Atoi(number)
		i = int64(ix)

	default:
		err = kErrorInt64
	}

	return i, err
}

func panicIfError(err error) {
	if err != nil {
		panic(err)
	}
}

//----
// type argsStruct struct {
// 	 page    int64 `page`
// 	 perPage int64 `perPage`
// }

// func loadFormValues(req *http.Request, args interface{}) {
//   TODO
// }

//----
// func (q *QueryHandler) updateList(data []byte) error {

// log.Printf("call updateList: %v\n%v\n-----", q.name, string(data))

// var docs []Doc
// err := json.Unmarshal(data, &docs)

// if err != nil {
// 	log.Printf("Error storeData, json: %v", err)
// 	return err
// }

// C := q.collection

// for _, doc := range docs {
// 	id := doc["_id"]

// 	if id == nil {
// 		id = q.requestNextId()
// 		doc["_id"] = id
// 		log.Printf("will store new data, id=%v", id)
// 	}

// 	// remove _ and $ field
// 	for k := range doc {
// 		if k[0] == '$' || (k[0] == '_' && k != "_id") {
// 			delete(doc, k)
// 		}
// 	}

// 	_, err = C.UpsertId(id, doc)
// 	if err != nil {
// 		log.Printf("Error storeData, insert id=%v: %v", id, err)
// 		continue
// 	}
// }

// q.fireOnChange(kUpdate, id)
// 	return nil
// }

//----
// // Check for []int64
// // do Populate
// case p.isList:
// list, ok := srcData.([]int64)
// if !ok {
// 	log.Println("Populate not support ([id])", p, srcData)
// 	return
// }

// // Assume Id
// objList := make([]interface{}, len(list))[:0]
// for _, refId := range list {
// 	var doc interface{}
// 	err := refC.FindId(refId).One(&doc)
// 	if err != nil {
// 		log.Println("Populate error", refId, list, p, err)
// 		return
// 	}

// 	objList = append(objList, doc)
// }

// data[p.field] = objList
