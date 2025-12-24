const express=require("express")
const cryptojs=require("crypto-js")
const jwt=require("jsonwebtoken")

const result=require("../utils/result")
const config=require("../utils/config")
const pool=require("../db/pool")

const router=express.Router()

router.put("/change-password",(req,res)=>{
    const {newPassword,conformPassword}=req.body
    const email=req.headers.email
    if(!newPassword || !conformPassword){
        res.send("Both feilds requires")
    }else if(newPassword != conformPassword){
        res.send("Matching!")
    }else{
        const hashedPassword=cryptojs.SHA256(newPassword).toString()
        const sql=`update users set password = ? where email = ?`;
        pool.query(sql,[hashedPassword,email],(error,data)=>{
            res.send(result.createResult(error,data))
        })
    }
})

router.get("/my-courses",(req,res)=>{
    const email=req.headers.email
    const sql = `select s.name, c.course_id,c.course_name from students s join courses c on s.course_id = c.course_id where email='paras@gmail.com';`;
    pool.query(sql,[email],(error,data)=>{
        res.send(result.createResult(error,data))
    })
})

router.get("/my-coursewith-videos",(req,res)=>{
    const email=req.headers.email
    const sql = `select s.name, c.course_id,c.course_name,v.video_id,v.youtube_url from students s join courses c on s.course_id = c.course_id join videos v on c.course_id = v.course_id where email=?`;
    pool.query(sql,[email],(error,data)=>{
        res.send(result.createResult(error,data))
    })
})

module.exports=router