const jwt = require("jsonwebtoken")
const privateKey = require("../constant")

module.exports = function (req, res, next) {
    const token = req.headers["token"] || req.headers["authorization"]
    if (!token) return res.status(401).send("Invalid Token.")
    try {
        let user = {}
        user = jwt.verify(token, privateKey, {ignoreExpiration: false})
        req.user = user
        next()
    } catch (ex) {
        res.status(401).send("Invalid Token.")
    }
}