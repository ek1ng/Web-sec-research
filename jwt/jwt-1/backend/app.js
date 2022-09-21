const express = require("express")
const config = require("./config")
const jwt = require("./libs/jwt")
const cors = require("./libs/cors")
const app = express()

const users = [
    {username: "John", password: "r@hi$sfna", permission: "admin"},
    {username: "Mike", password: "124124", permission: "user"},
]
app.use(express.json());
app.use(cors)
app.post('/login', function (req, res) {
    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).json({msg: "invalid parameters"});
    }
    for (const elem of users) {
        if (username === elem.username && password === elem.password) {
            const token = jwt.sign({user: elem.permission})
            return res.json({msg: 'success', token})
        }
    }
    return res.status(401).json({msg: "invalid username or password"});
})
app.get("/admin", jwt.auth, function (req, res) {
    if (req.user.user === "admin")
        return res.sendStatus(200)
    else
        return res.sendStatus(403)
})
app.post("/sign", function (req, res) {
    console.log(req.body)
    const token = jwt.sign(req.body)
    return res.json({token})
})
app.listen(config.port, config.host, function () {
    console.log(`app is running at http://${config.host}:${config.port}`)
})