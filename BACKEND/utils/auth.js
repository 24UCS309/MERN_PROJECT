const jwt=require("jsonwebtoken")

const config=require("../utils/config")
const result=require("../utils/result")

function authUser(req,res,next){
    const allowUserUrls=['/users/signup','/users/signup']
    if(allowUserUrls.includes(req.url))
        next
    else{
        const token = req.headers.token
        if(!token){
            res.send(result.createResult("Token is missing!!!!!"))
        }
        else{
            try{
                const payload=jwt.verify(token,config.SECRET)
                req.headers.uid=payload.uid
                req.headers.email=payload.email
                next()
            }
            catch(e){
                res.send(result.createResult("Toke is Invalid!!!!!"))
            }
        }
    }
}

module.exports={authUser}