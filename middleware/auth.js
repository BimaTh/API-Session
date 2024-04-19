const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = function auth(req, res, next) {
    const token = req.header('x-auth-token')
    if(!token) return res.status(401).send("Token needed to continue")

    try {
    const decoded =jwt.verify(token, process.env.SECRET_KEY)
    req.user = decoded
    next()
    } catch (ex) {
        res.status(400).send('Invalid token.')

    }
}
