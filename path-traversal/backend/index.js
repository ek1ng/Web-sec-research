const express = require('express')
const cors = require('./libs/cors')
const app = express()
const host = '127.0.0.1'
const port = 3000
app.use(cors)
app.use(express.json());
app.use(express.static('public'))

app.get('/file', function (req, res){
    if (req.query.filename) {
        const filename = __dirname + '/public/' + req.query.filename
        console.log(filename)
        return res.download(filename)
    } else {
        res.status(400).send({ msg: "invalid query!" })
    }
})
app.listen(port ,host, function () {
    console.log(`app is running at http://${host}:${port}`)
})