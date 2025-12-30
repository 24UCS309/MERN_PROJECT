const express = require("express");
const pool = require("../../../db/pool");
const result = require("../../../utils/result");
const { checkAuthorization } = require("../../../utils/auth");

const router = express.Router();

router.get("/", (req, res) => {
  const sql = `SELECT 
      v.video_id,
      v.course_id,
      c.course_name,
      v.title,
      v.description,
      v.youtube_url,
      v.added_at
    FROM videos v
    LEFT JOIN courses c ON v.course_id = c.course_id`;
  pool.query(sql, (error, data) => {
    res.send(result.createResult(error, data));
  });
});

router.get("/:course_id", (req, res) => {
  const { course_id } = req.params;
  const sql = `SELECT * FROM videos WHERE course_id=?`;
  pool.query(sql, [course_id], (error, data) => {
    res.send(result.createResult(error, data));
  });
});

router.post("/addVideo", (req, res) => {
  const { course_id, title, description, youtube_url } = req.body;
  const sql = `INSERT INTO videos (course_id,title,description,youtube_url) VALUES (?,?,?,?)`;
  pool.query(
    sql,
    [course_id, title, description, youtube_url],
    (error, data) => {
      res.send(result.createResult(error, data));
    }
  );
});

router.put("/:video_id", (req, res) => {
  const { video_id } = req.params;
  const { course_id, title, youtube_url, description } = req.body;
  const sql = `UPDATE videos SET course_id=?,title=?,youtube_url=?,description=? WHERE video_id=? `;
  pool.query(
    sql,
    [course_id, title, youtube_url, description, video_id],
    (error, data) => {
      res.send(result.createResult(error, data));
    }
  );
});

router.delete("/:video_id", (req, res) => {
  const { video_id } = req.params;
  const sql = `DELETE FROM videos WHERE video_id= ?`;
  pool.query(sql, [video_id], (error, data) => {
    res.send(result.createResult(error, data));
  });
});

router.get("/", (req, res) => {
  const { course_id } = req.query.course_id;
  const sql = `SELECT * FROM students WHERE course_id= ?`;
  pool.query(sql, [course_id], (error, data) => {
    res.send(result.createResult(error, data));
  });
});
module.exports = router;
