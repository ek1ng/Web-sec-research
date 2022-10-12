package main

import (
	"github.com/flamego/binding"
	"github.com/flamego/flamego"
	"math/rand"
	"net/http"
	"net/url"
)

type User struct {
	Username string `form:"username"`
	Password string `form:"password"`
}

func genToken() string {
	const letterBytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	b := make([]byte, 16)
	for i := 0; i < 16; i++ {
		idx := rand.Intn(16)
		b[i] = letterBytes[idx]
	}
	return string(b)
}

func login(c flamego.Context, user User, w http.ResponseWriter) {

	if user.Username == "admin" && user.Password == "admin@123" {
		callback := c.Query("callback")
		u, err := url.Parse(callback)
		if err != nil {
			w.WriteHeader(500)
			w.Write([]byte("invalid callback url"))
			return
		}
		q := u.Query()
		q.Set("token", genToken())
		u.RawQuery = q.Encode()
		c.Redirect(u.String())
	} else {
		w.WriteHeader(401)
		w.Write([]byte("invalid username or password"))
		return
	}
}

func main() {
	f := flamego.Classic()
	f.Use(flamego.Static(flamego.StaticOptions{
		Directory: "./static",
	}))
	f.Post("/login", binding.Form(User{}), login)
	http.ListenAndServe("0.0.0.0:9090", f)
}
