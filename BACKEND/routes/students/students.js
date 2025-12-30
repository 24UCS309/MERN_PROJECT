const express=require("express")
const router=express.Router()
const cryptojs=require("crypto-js")
const pool=require("../../db/pool")
const result=require("../../utils/result")


router.post("/register-to-course", (req, res) => {
  const { name, email, course_id, mobile_no } = req.body
  const pass = "sunbeam"
  const newpwd = cryptojs.SHA256(pass).toString()
  const sql1 = `select * from students where email=? and course_id=?`
  const sql2 = `select * from users where email=?`
  const sql3 = `insert into users(email,password) values(?,?)`
  const sql4 = `insert into students(name,email,course_id,mobile_no) values(?,?,?,?)`

  pool.query(sql1, [email, course_id], (err, data) => {
    if (err) {
      return res.send(result.createResult(err))
    }

    if (data.length > 0) {
      return res.send(
        result.createResult("Student already registered for this course")
      )
    }

    pool.query(sql2, [email], (error, users) => {
      if (error) {
        return res.send(result.createResult(error))
      }

      if (users.length === 0) {
        pool.query(sql3, [email, newpwd], (e1) => {
          if (e1) {
            return res.send(result.createResult(e1))
          }

          pool.query(
            sql4,
            [name, email, course_id, mobile_no],
            (e2, data2) => {
              if (e2) {
                return res.send(result.createResult(e2))
              }
              res.send(result.createResult(null, data2))
            }
          )
        })
      } 
      else {
        pool.query(
          sql4,
          [name, email, course_id, mobile_no],
          (e3, data3) => {
            if (e3) {
              return res.send(result.createResult(e3))
            }
            res.send(result.createResult(null, data3))
          }
        )
      }
    })
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
router.get("/all-students", (req, res) => {
  
  const sql = `select * from students`;

  pool.query(sql, (error, data) => {
    res.send(result.createResult(error, data));
  });
});
router.get("/my-profile",(req,res)=>{
    const email=req.headers.email
    console.log("req.headers.email: ", req.headers.email);
    
    const sql=`select *from students  where email=?`
    pool.query(sql,[email],(error,data)=>{
        res.send(result.createResult(error,data))
    })
    
  
})

module.exports=router