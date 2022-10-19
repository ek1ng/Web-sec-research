const express = require("express")
const sqlite3 = require("sqlite3")
const DOMPurify = require('isomorphic-dompurify')

const db = new sqlite3.Database("sqlite.db", () => {
  let sql = ""
  sql += "drop table if exists comments;"
  sql += `create table comments (
            id integer primary key autoincrement,
            page integer,
            content varchar(128),
            created_time default current_timestamp
          );`
  sql += "insert into comments (page,content) values (1,\"Hello world\");"
  db.exec(sql)
})
const app = express()

app.use(express.json())
app.use(express.static("static"))

app.get("/comment", (req, res) => {
  const page = req.query.page || 1
  db.all("select * from comments where page=?", [page], (err, rows) => {
    res.json(rows)
  })
})

app.post("/comment", (req, res) => {
  const page = req.body.page || 1
  let content = req.body.content
  // content =  DOMPurify.sanitize(content)
  db.all("insert into comments (page,content) values (?,?)", [page, content], (err, rows) => {
    res.json(rows)
  })
})

app.listen(9090, () => {
  console.log("app is running at http://127.0.0.1:9090")
})