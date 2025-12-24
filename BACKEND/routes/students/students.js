const express=require("express")
const router=express.Router()
const cryptojs=require("crypto-js")
const pool=require("../../db/pool")
const result=require("../../utils/result")


router.post("/register-to-course", (req, res) => {
  const { name, email, course_id, mobile_no } = req.body

  const sql = `insert into students(name,email,course_id,mobile_no) values(?,?,?,?)`
  const sql1 = `select * from users where email=?`
  const sql2 = `insert into users(email) values(?)`

  pool.query(sql1, [email], (error, data) => {
    if (error) {
      res.send(result.createResult(error))
    } 
    else if (data.length == 0) {

      
      pool.query(sql2, [email], (error1,data1) => {
        if (error1) {
          return res.send(result.createResult(error1))
        }

       
        pool.query(sql, [name, email, course_id, mobile_no], (error2, data2) => {
          if (error2) {
            return res.send(result.createResult(error2))
          }

          res.send(result.createResult(null,data2))
        })
      })
    } 
    else {

      
      pool.query(sql, [name, email, course_id, mobile_no], (error3, data3) => {
        if (error3) {
          return res.send(result.createResult(error3))
        }
         res.send(result.createResult(null,data3))
        
      })
    }
  })
})




router.put("/change-password",(req,res)=>{
    const email=req.headers.email
    const{newPassword,confirmPassword}=req.body
    
    const hashedPassword=cryptojs.SHA256(confirmPassword).toString()
    


    const sql=`update users set password =? where email=?`
    if(newPassword==confirmPassword){
    pool.query(sql,[hashedPassword,email],(error,data)=>{
        res.send(result.createResult(error,data))
    })
}
else{
     res.send(result.createResult("confirm password is not match with newpassword"))
}

})


router.get("/my-course",(req,res)=>{
    const email=req.headers.email
    const sql=`select s.reg_no,s.name,c.course_id,c.course_name from students s join courses c on s.course_id=c.course_id where email=?`
    pool.query(sql,[email],(error,data)=>{
        res.send(result.createResult(error,data))
    })
    
  
})

router.get("/my-course-with-videos",(req,res)=>{
    const email=req.headers.email
    const sql=`select s.reg_no,s.name,c.course_id,c.course_name,v.title,v.youtube_url,v.description from students s inner join courses c on s.course_id=c.course_id inner join videos v on v.course_id=c.course_id where email=?`
    pool.query(sql,[email],(error,data)=>{
        res.send(result.createResult(error,data))
    })
    
  
})


module.exports=router