const express=require("express")
const router=express.Router()
const pool=require("../../db/pool")
const result=require("../../utils/result")

router.get("/all-active-courses",(req,res)=>{
    const sql=`select * from courses where start_date<=curdate() and end_date>curdate()`
    pool.query(sql,(error,data)=>{
        res.send(result.createResult(error,data))
    })
})


module.exports=router