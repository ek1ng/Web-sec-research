const express = require("express")
const session = require("express-session")

const app = express()

function cors(req, res, next) {

  // allow *
  // res.setHeader("Access-Control-Allow-Origin", "*")

  // reflect
  res.setHeader("Access-Control-Allow-Origin", req.header("origin") || "http://127.0.0.1:9090")

  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")
  res.setHeader("Access-Control-Max-Age", 86400)
  res.setHeader("Access-Control-Allow-Credentials", "true")

  next()
}

app.use(cors)
app.use(express.json())
app.use(session({
  secret: 'rcnQZ2Us4zCipkuL',
  resave: false,
  saveUninitialized: true,
}))

const money = {}

app.get("/", (req, res) => {
  res.send("pong!")
})

app.get("/login", (req, res) => {
  const { username } = req.query
  if (!money[username]) {
    money[username] = 500
    req.session.username = username
  }
  res.json({ msg: "ok" })
})

app.post("/transfer", (req, res) => {
  const { to } = req.body
  const from = req.session.username || "admin"
  money[from] -= 100
  money[to] += 100
  res.json({ msg: "ok" })
})

app.get("/view", (req, res) => {
  const u = req.session.username
  if (!u) {
    res.status(401).json({ msg: "login first" })
    return
  }
  res.json({ msg: `username: ${u}; money: ${money[u]}` })
})

app.listen(9090, () => {
  console.log("app is running at http://127.0.0.1:9090")
})