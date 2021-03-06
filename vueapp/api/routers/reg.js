const express=require("express")
const router=express.Router()
const cryto=require("crypto")
const {formatData}=require("../utils/tools")
const mongo=require("../utils/mongo")
//注册
router.post("/",async (req,res)=>{
    console.log('参数',req.body);
    let {username,password}=req.body.body
    //这是加密的代码
    const hash=cryto.createHash("md5")
    // //加盐
    hash.update(password+"laoxie")
    password=hash.digest("hex")
    console.log('注册',username,password);
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
    console.log("名字",username);
    const result=await mongo.find("user",{username})
    console.log("返回的长度",result.length);
    if(result.length>0){
        res.send(formatData({code:0}))
    }else{
        res.send(formatData({code:1}))
        // res.send(12333)
    }
})
router.post("/check",async (req,res)=>{
    //接收前端的参数
    const {username}=req.param
    console.log("这是一个名字",username);
    const result=await mongo.find("user",{username})
    if(result.length>0){
        res.send(formatData({code:0}))
    }else{
        res.send(formatData())
        // res.send(12333)
    }
})

module.exports=router