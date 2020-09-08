const express=require("express")
const router=express.Router()
const allRouter=require("./routers")
const app=express()
// const middleware=express.static("./public")
// app.use(middleware)
app.use("/api",allRouter)
app.listen(2003,()=>{
    console.log("server is running on port 2003");
})