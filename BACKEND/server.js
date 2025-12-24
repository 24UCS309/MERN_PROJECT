const express = require("express")
const commonRouter = require("./routes/common/allActiveCourse")
const commonRouter1 = require("./routes/common/login")
const studentRouter = require("../../routes/students")
const courseRouter = require("../../routes/course")

const app = express()

app.use(express.json())
app.use("/common", commonRouter)
app.use("/common", commonRouter1)
app.use("/students",studentRouter)
app.use("/courses",courseRouter)

app.listen(1000, () => {
  console.log("SERVER is started on port 1000")
})
