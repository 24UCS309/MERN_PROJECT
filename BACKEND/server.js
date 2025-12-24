const express = require("express")
const commonRouter = require("./routes/common/allActiveCourse")
const commonRouter1 = require("./routes/common/login")
const studentRouter = require("./routes/students/students")
const courseRouter = require("./routes/admin/courses/course")
const videoRouter=require("./routes/admin/videos/videos")

const app = express()

app.use(express.json())
app.use("/course", commonRouter)
app.use("/auth", commonRouter1)
app.use("/students",studentRouter)
app.use("/courses",courseRouter)
app.use("/video",videoRouter)

app.listen(4000, () => {
  console.log("SERVER is started on port 4000")
})
