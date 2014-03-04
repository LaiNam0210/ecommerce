/*
Package user implements simple session & user handling.
*/
package user

import (
	_ "errors"
	_ "log"
	"net/http"
	"time"

	sss "github.com/gorilla/sessions"
	mgo "labix.org/v2/mgo"
)

type Info struct {
	Id        int64
	UserName  string
	LoginTime time.Time
}

type User struct {
	Id       int64  `bson:"_id"`
	UserName string `bson:"username"`
	Email    string `bson:"email"`
	Name     string `bson:"name"`
	Avatar   string `bson:"avatar"`
}

var (
	SSName string
	Store  *sss.CookieStore
	UserDB *mgo.Collection
)

const (
	kCurrentUser = "current_user"
)

func (i *Info) IsLoggedIn() bool {
	return i != nil && i.Id != 0 && i.UserName != ""
}

func Current(r *http.Request) string {
	session := getSession(r)
	info, _ := session.Values[kCurrentUser].(string)
	return info
}

func SetCurrentUserName(w http.ResponseWriter, r *http.Request, username string) error {

	session := getSession(r)
	defer session.Save(r, w)

	// if id == 0 {
	// 	session.Values[kCurrentUser] = nil
	// 	return nil
	// }

	// var user User
	// err := UserDB.FindId(id).One(&user)
	// if err != nil {
	// 	session.Values[kCurrentUser] = nil
	// 	log.Println("user.SetCurrent", id, err)
	// 	return err
	// }

	// current := "hoangnam"

	session.Values[kCurrentUser] = username
	return nil
}

func Get(id int64) (*User, error) {
	var user User
	err := UserDB.FindId(id).One(&user)
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func getSession(r *http.Request) *sss.Session {
	session, _ := Store.Get(r, SSName)
	return session
}
