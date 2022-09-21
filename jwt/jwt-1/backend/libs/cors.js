const config = require("../config")

function cors(req, res, next) {
    res.header("Access-Control-Allow-Origin", config.cors_allow_origin.join(","))
    res.header("Access-Control-Allow-Methods", config.cors_allow_methods.join(","))
    res.header("Access-Control-Allow-Headers", config.cors_allow_headers.join(","))
    res.header("Access-Control-Allow-Credentials", config.cors_allow_credentials.toString())

    if (req.method === "OPTIONS") {
        return res.status(204).send()
    }
    next()
}

module.exports = cors
