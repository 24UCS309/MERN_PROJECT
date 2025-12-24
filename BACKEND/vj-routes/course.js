const express = require("express")
const jwt=require("jsonwebtoken")
const cryptojs=require("crypto-js")

const result=require("../utils/result")
const config=require("../utils/config")
const pool=require("../db/pool")

const router=express.Router()

router.get("/all-courses",(req,res)=>{
    const {start_date,end_date}=req.query
    const sql=`select *from courses where start_date>=? and end_date<=?`;
    pool.query(sql,[start_date,end_date],(error,data)=>{
        res.send(result.createResult(error,data))
    })
})

module.exports=router