const result = require("./result")
const config = require("./config")
const jwt = require("jsonwebtoken")

function authUser(req, res, next) {
    const allowedUrls = ["/auth/signup", "/auth/signin"]


    if (allowedUrls.includes(req.url)) {
        return next()
    } else {
        const token = req.headers.token

        if (!token) {
            res.send(result.createResult("Token is Missing"))
        } else {
            try {
                const payload = jwt.verify(token, config.SECRET)
                // req.headers.uid = payload.uid
                req.headers.email = payload.email
                req.headers.role=payload.role
                next()
            } catch (ex) {
                return res.send(result.createResult("Token is Invalid"))
            }
        }
    }
}

function checkAuthorization(req,res,next){
    if(role=='admin'){
        return next()
    }
}

module.exports = {authUser ,checkAuthorization}