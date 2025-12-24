const express = require("express")
const commonRouter = require("./routes/common/common_api")
const studentRouter = require("../VJ-Backend/vj-routes/student")
const courseRouter = require("../VJ-Backend/vj-routes/course")

const app = express()

app.use(express.json())
app.use("/common", commonRouter)
app.use("/students",studentRouter)
app.use("/courses",courseRouter)

app.listen(1000, () => {
  console.log("SERVER is started on port 1000")
})
