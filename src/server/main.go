package main

import (
	"flag"
	"log"
	"net/http"
	"time"

	ctx "github.com/gorilla/context"
	sss "github.com/gorilla/sessions"
	mgo "labix.org/v2/mgo"
	wqr "server/query"

	"server/user"
)

const (
	kIndexHtml = "index.html"
	kSSName    = "ssdef"
)

var (
	flPort   = flag.String("port", "80", "port")
	flDir    = flag.String("dir", "public", "resource dir")
	flDbName = flag.String("dbname", "sendo", "database name")

	db     *mgo.Database
	dbname string
	store  = sss.NewCookieStore([]byte("this-is-secret-string"))
)

func connectDatabase(connectionString, databaseName string) *mgo.Database {
	session, err := mgo.Dial(connectionString)
	if err != nil {
		panic("Error connecting database: " + connectionString)
	}

	dbname = databaseName
	db = session.DB(dbname)
	return db
}

func setModifiedDate(db *mgo.Database, action string, id int64, doc wqr.Doc) bool {

	time := time.Now().Unix() * 1000

	if action == wqr.Create {
		doc["dateCreated"] = time
	}
	doc["dateModified"] = time

	return true
}

func defineModels() {
	wqr.New(db, "category", "/api/category").
		BeforeCreate(setModifiedDate).
		BeforeUpdate(setModifiedDate).
		RegisterRoutes(nil)

	wqr.New(db, "product", "/api/product").
		DefaultPerPage(10).
		BeforeCreate(setModifiedDate).
		BeforeUpdate(setModifiedDate).
		Populate("shop:shopid=shop._id").
		EnableSearch("title", "newPrice,number", "catid,number", "discount,number", "freeship,number").
		RegisterRoutes(nil)

	wqr.New(db, "inventoryInfo", "/api/inventory").
		BeforeCreate(setModifiedDate).
		BeforeUpdate(setModifiedDate).
		RegisterRoutes(nil)

	wqr.New(db, "costume", "/api/costume").
		BeforeCreate(setModifiedDate).
		BeforeUpdate(setModifiedDate).
		RegisterRoutes(nil)

	wqr.New(db, "support", "/api/support").
		BeforeCreate(setModifiedDate).
		BeforeUpdate(setModifiedDate).
		RegisterRoutes(nil)

	wqr.New(db, "cached", "/api/cached").
		BeforeCreate(setModifiedDate).
		BeforeUpdate(setModifiedDate).
		EnableSearch("value").
		RegisterRoutes(nil)
}

func linkPackages() {
	user.SSName = kSSName
	user.Store = store
	user.UserDB = db.C("user")
}

func main() {
	flag.Parse()

	rootDir := *flDir
	if rootDir[len(rootDir)-1] != '/' {
		rootDir += "/"
	}

	connectDatabase("127.0.0.1", *flDbName)
	linkPackages()
	defineModels()

	fileServer := http.FileServer(http.Dir(rootDir))
	http.Handle("/", fileServer)

	log.Printf("Start server, port=%v, dir=%v", *flPort, rootDir)
	http.ListenAndServe(":"+*flPort, ctx.ClearHandler(http.DefaultServeMux))
}
