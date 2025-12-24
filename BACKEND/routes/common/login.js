const express=require("express")
const cryptoJs=require("crypto-js")
const jwt=require("jsonwebtoken")


const pool=require("../../db/pool")
const result=require("../../utils/result")
const config=require("../../utils/config")


const router=express.Router()

// router.post("/signup",(req,res)=>{
//     const {name,email,mobile_no,course_id}=req.body
//     const sql=`INSERT INTO students (name,email,mobile_no,course_id) VALUES(?,?,?,?)`
//     // const hashpwd=cryptoJs.SHA256(password).toString()
//     pool.query(sql,[name,email,mobile_no,course_id],(error,data)=>{
//         res.send(result.createResult(error,data))
//     })
// })

router.post("/signin",(req,res)=>{
    const{email,password}=req.body
    const hashpwd=cryptoJs.SHA256(password).toString()
    const  sql=`SELECT * FROM users WHERE email=? AND password=?`

    const sql2=`INSERT INTO users (email,password)VALUES (?,?)`

    

    pool.query(sql,[email,hashpwd],(error,data)=>{
        if(error){
            res.send(result.createResult(error))
        }
        else if(data.length==0){
            // res.send("Please enter valid email and password")
            pool.query(sql2,[email,hashpwd],(error1,data1)=>{
                res.send(result.createResult(error1,data1))
            })
        }
        else{
            //JWT : JSON WEB TOKEN
            const user=data[0]

            //create a payload and pass it uid and email for encrypted
            const payload={
                // uid:user.uid,
                email:user.email,
                role:user.role
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
// router.post("/signin", (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.send(
//       result.createResult(null, { message: "Email and password required" })
//     );
//   }

//   const sql = `SELECT * FROM users WHERE email=?`;

//   pool.query(sql, [email], (error, data) => {
//     if (error) {
//       return res.send(result.createResult(error));
//     }

//     if (data.length === 0) {
//       return res.send(
//         result.createResult(null, { message: "Email not registered" })
//       );
//     }

//     const user = data[0];
//     const hashpwd = cryptoJs.SHA256(password).toString();

//     if (user.password !== hashpwd) {
//       return res.send(
//         result.createResult(null, { message: "Invalid password" })
//       );
//     }

//     const payload = {
//       email: user.email,
//       role: user.role
//     };

//     const token = jwt.sign(payload, config.SECRET);

//     res.send(
//       result.createResult(null, {
//         email: user.email,
//         token
//       })
//     );
//   });
// });


module.exports=router