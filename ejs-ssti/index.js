const express = require("express")
const ejs = require("ejs")
const urlencode = require("urlencode")

const app = express()

app.use(express.static("static"))
app.use(express.urlencoded({ extended: false }))
app.set("views", "./views")
app.set("view engine", "ejs")


app.get("/", (req, res) => {
  res.render("index")
})

app.all("/login", (req, res) => {
  console.log(req.body)
  console.log(req.query.callback)

  const callback = req.query.callback
  const msg = ejs.render(`
    Login success,rediecting to 
    <a href="${callback}">${callback}</a>
  <script>
    setTimeout(() => {
      window.location = "${callback}"
    }, 30000)
  </script>
  `)
  res.send(msg)
})


app.listen(9090, () => {
  console.log("app is running at http://127.0.0.1:9090")
})