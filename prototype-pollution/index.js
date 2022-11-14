const express = require("express")
const ejs = require("ejs")

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set("views", "./views")
app.set("view engine", "ejs")
app.use(express.static("static"))

function extend(dst, src) {
  for (const key in src) {
    dst[key] = src[key]
  }
}

function purify(options) {
  for (const key in options) {
    if (/javascript/i.test(options[key])) {
      console.log(key, options[key], "not allowed")
      delete options[key]
    }
  }
}

app.post("/render", (req, res) => {
  const options = {
    time: new Date().toDateString(),
  }
  extend(options, req.body)
  purify(options)
  const template = `
  <h1>Welcome</h1>
  <p>Username: <%= username %></p>
  <p>Time: <%= time %></p>
  <p>Blog: <a href="<%= blog||undefined %>"><%= blog||undefined %></a></p>
  `
  res.send(ejs.render(template, options))

})

app.post("/login",)

app.listen(9090, () => {
  console.log("app is running at http://127.0.0.1:9090")
})