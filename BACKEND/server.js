const express = require("express")
const commonRouter = require("./routes/common/allActiveCourse")
const commonRouter1 = require("./routes/common/login")
const studentRouter = require("../../routes/students")
const courseRouter = require("../../routes/course")
const videoRouter=require("./routes/admin/videos/videos")

const app = express()

app.use(express.json())
app.use("/auth", commonRouter)
app.use("/course", commonRouter1)
app.use("/students",studentRouter)
app.use("/courses",courseRouter)
app.use("/video",videoRouter)

app.listen(1000, () => {
  console.log("SERVER is started on port 1000")
})
