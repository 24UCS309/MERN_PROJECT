const mysql2=require("mysql2")
const pool=mysql2.createPool({
    host:"10.195.86.126",
    user:"ankita",
    password:"ankita123",
    database:"sunbeam_db"
});

module.exports=pool