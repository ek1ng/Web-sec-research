const express = require("express")
const mysql = require('mysql2');

const options = {
  host: 'mysql_db',
  port: 3306,
  user: 'test',
  password: 'test',
  database: 'test'
}
let connection = null

let connected = false
function connect() {
  try {
    connection = new mysql.createConnection(options)
    connection.connect(err => {
      if (err) {
        console.log("failed to connect to mysql, retrying...")
        setTimeout(connect, 3000)
      } else {
        connected = true
        console.log("successfully connected to myql")
      }
    })
  } catch {
  }
}
connect()

const app = express()

app.use(express.json())
app.use(express.static("static"))

app.get("/ping", (req, res) => {
  res.send("pong!")
})

app.get("/query_vul", (req, res) => {
  const { username } = req.query
  const sql = "SELECT * FROM users WHERE username = '" + username + "'"
  connection.query(sql, (err, rows) => {
    if (err) {
      console.log(err)
      res.status(500).json({ success: false, msg: err.message })
    } else {
      console.log(rows)
      res.json({ success: true, data: rows })
    }
  })
})

app.get("/query", (req, res) => {
  const { username } = req.query
  const sql = "SELECT * FROM users WHERE username = ?"
  connection.query(sql, [username], (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).json({ success: false, msg: err.message })
    } else {
      res.json({ success: true, data: result })
    }
  })
})

app.listen(9090)