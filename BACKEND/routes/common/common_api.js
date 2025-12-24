const express=require("express")
const crypto=require("crypto-js")
const jwt=require("jsonwebtoken")

const pool = require("../../db/pool")
const result = require("../../utils/result")
const config = require("../../utils/config")

const router=express.Router()

router.post('/signup', (req, res) => {
    const { name, email, password, mobile } = req.body
    const sql = `INSERT INTO users1(name,email,password,mobile) VALUES (?,?,?,?)`
    const hashedPassword = crypto.SHA256(password).toString()
    pool.query(sql, [name, email, hashedPassword, mobile], (error, data) => {
        res.send(result.createResult(error, data))
    })
})

router.post('/signin',(req,res)=>{
    const {email,password}=req.body
    const hashedPassword = crypto.SHA256(password).toString()
    const sql=`select *from users1 where email=? and password=?`;
    pool.query(sql,[email,hashedPassword],(error,data)=>{
        if(error){
            res.send(result.createResult(error))
        }else if(data.length==0){
            res.send("Invalid Username or Password!!!")
        }else{
            const user= data[0]
            const payload={
                uid:user.uid,
                email:user.email
            }
            const token =jwt.sign(payload,config.SECRET)
            const userData={
                name:user.name,
                mobile:user.mobile,
                token
            }
            res.send(result.createResult(null,userData))
        }
    })
})

//get all courses 
router.get('/all-courses',(req,res)=>{
    const sql=`select *from courses`;
    pool.query(sql,(error,data)=>{
        res.send(result.createResult(error,data))
    })
})

module.exports=router