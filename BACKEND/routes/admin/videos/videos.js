const express=require("express")
const pool=require("../../db/pool")
const result=require("../../utils/result")
const { checkAuthorization } = require("../../utils/authUser")


const router=express.Router()

router.get("/:course_id",(req,res)=>{
    const{course_id}=req.params
    const sql=`SELECT * FROM videos WHERE course_id=?`
    pool.query(sql,[course_id],(error,data)=>{
        res.send(result.createResult(error,data))
    })
})

router.post("/",(req,res)=>{
    const{video_id,course_id,title,description,youtube_url}=req.body
    const sql=`INSERT INTO videos (video_id,course_id,title,description,youtube_url) VALUES (?,?,?,?,?)`
    pool.query(sql,[video_id,course_id,title,description,youtube_url],(error,data)=>{
        res.send(result.createResult(error,data))
    })
})

router.put("/:video_id",(req,res)=>{
    const{video_id}=req.params
    const{course_id,title,youtube_url,description}=req.body
    const sql=`UPDATE videos SET course_id=?,title=?,youtube_url=?,description=? WHERE video_id=? `
    pool.query(sql,[course_id,title,youtube_url,description,video_id],(error,data)=>{
        res.send(result.createResult(error,data))
    })
})

router.delete("/:video_id",(req,res)=>{
    const{video_id}=req.params
    const sql=`DELETE FROM videos WHERE video_id= ?`
    pool.query(sql,[video_id],(error,data)=>{
        res.send(result.createResult(error,data))
    })
})

router.get("/getEnrolStud",(req,res)=>{
    const{course_id}=req.query
    const sql=`SELECT * FROM students WHERE course_id= ?`
    pool.query(sql,[course_id],(error,data)=>{
        res.send(result.createResult(error,data))
    })
})
module.exports=router