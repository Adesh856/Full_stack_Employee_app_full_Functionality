const express = require("express")
const app = express()
const connection = require("./db")
const UserRouter = require("./routes/user.route")
const auth = require("./middleware/auth")
const employeeRouter = require("./routes/employee.route")
app.use(express.json())

app.use("/user",UserRouter)
app.use(auth)
app.use("/employees",employeeRouter)

app.listen(process.env.port,async()=>{
    try {
        await  connection
        console.log("Server is connected with DB")
    } catch (error) {
        console.log("Server is not connected with DB")
    }
    console.log(`Server is listening at ${process.env.port}`)
})