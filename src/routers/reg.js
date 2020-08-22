const express=require("express")
const router=express.Router()
const cryto=require("crypto")
const {formatData}=require("../utils/tools")
const mongo=require("../utils/mongo")
//注册
router.post("/",async (req,res)=>{
    let {username,password}=req.body
    // console.log("password",password);
    //这是加密的代码
    const hash=cryto.createHash("md5")
    // //加盐
    hash.update(password+"laoxie")
    password=hash.digest("hex")
    // console.log('password2=',password,password.length)
    let result
    try{
        result=await mongo.insert("user",{username,password})
        console.log("result",result);
        res.send(formatData({code:1}))
    }catch(err){
        res.send(formatData({code:0}))
    }
})
//查重
router.get("/check",async (req,res)=>{
    //接收前端的参数
    const {username}=req.query
    const result=await mongo.find("user",{username})
    if(result.length>0){
        res.send(formatData({code:0}))
    }else{
        res.send(formatData())
    }
})
module.exports=router