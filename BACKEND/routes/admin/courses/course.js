const express = require("express");
const cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken");
const pool = require("../../../db/pool");
const result = require("../../../utils/result");

const router = express.Router();

router.get("/", (req, res) => {
  const { start_date, end_date } = req.query;
  const sql = `select * from courses where start_date >= ? and end_date  <= ?`;

  pool.query(sql, [start_date, end_date], (error, data) => {
    res.send(result.createResult(error, data));
  });
});

router.post("/addCourse", (req, res) => {
  const {
    course_name,
    description,
    fees,
    start_date,
    end_date,
    video_expire_days,
  } = req.body;
  const sql = `insert into courses(course_name, description, fees, start_date, end_date,video_expire_days) values(?,?,?,?,?,?)`;
  pool.query(
    sql,
    [course_name, description, fees, start_date, end_date, video_expire_days],
    (error, data) => {
      res.send(result.createResult(error, data));
    }
  );
});

router.put("/:course_id", (req, res) => {
  const { course_id } = req.params;
  const {
    course_name,
    description,
    fees,
    start_date,
    end_date,
    video_expire_days,
  } = req.body;
  const sql = `update courses set 
    course_name=?,
    description=?,
    fees=?,
    start_date=?,
    end_date=?,
    video_expire_days=? 
    where course_id=?`;
  pool.query(
    sql,
    [
      course_name,
      description,
      fees,
      start_date,
      end_date,
      video_expire_days,
      course_id,
    ],
    (error, data) => {
      res.send(result.createResult(error, data));
    }
  );
});

router.delete("/:course_id", (req, res) => {
  const { course_id } = req.params;

  const sql1 = `delete from students where course_id=?`;
  const sql2 = `delete from videos where course_id=?`;
  const sql3 = `delete from courses where course_id=?`;

  pool.query(sql1, [course_id], (error1, data3) => {
    pool.query(sql2, [course_id], (error12, data3) => {
      pool.query(sql3, [course_id], (error3, data3) => {
        res.send(result.createResult(error3, data3));
      });
    });
  });
});

module.exports = router;
