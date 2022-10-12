package main

import (
	"github.com/flamego/flamego"
	"net/http"
)

func callback(c flamego.Context, w http.ResponseWriter) {
	token := c.Query("token")
	w.Write([]byte("login success, token: " + token))
}

func main() {
	f := flamego.Classic()
	f.Use(flamego.Static(flamego.StaticOptions{
		Directory: "./static",
	}))
	f.Get("/admin", callback)

	http.ListenAndServe("0.0.0.0:8090", f)
}
