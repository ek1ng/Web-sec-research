const jwt = require("jsonwebtoken");
const {TOKEN_SECRET: token_secret} = require("../config.js")

function auth(req, res, next) {
    const token = req.headers["authorization"]
    try {
        req.user = jwt.verify(token, '',{algorithms: 'none'})
        console.log(req.user)
    } catch(err) {
        console.log(err)
        return res.status(401).json({msg: 'log in again'})
    }
    next();
}

function sign(payload) {
    return jwt.sign(payload, "",{algorithm: 'none'})
}

module.exports = {
    auth,
    sign,
}