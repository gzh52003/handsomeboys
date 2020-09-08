const express=require("express")
const fs=require('fs')
// const app=express()
// app.use(express.static('./'))
const router=express.Router()
const allRouter=require("./routers")
const app=express()
const middleware=express.static("./public")
app.use(middleware)
app.use("/api",allRouter)
app.use((req,res)=>{
    const content =fs.readFileSync('./index.html')
    res.set('Content-Type','text/html;charset=utf-8')
    res.send(content.toString())
})
app.listen(2007,()=>{
    console.log("server is running on port 2007");
})