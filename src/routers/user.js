const express=require("express")
const router=express.Router()
// const query = require('../utils/mysql');
const mongo = require('../utils/mongo');
const {formatData,md5} = require('../utils/tools')
router.get("/",async (req,res)=>{
    const result =await mongo.find("user")
    res.send(formatData({data:result}))
})
router.delete("/:id",async(req,res)=>{
    const {id}=req.params
    try{
        await mongo.remove("user",{_id:id})
        res.send(formatData({}))
    }catch(err){
        res.send(formatData({code:0}))
    }
})
//获取单个用户信息
router.get("/:id",async(req,res)=>{
    console.log("来自远方的session",req.session.vcode);
    //这个id是点击的id
    const {id}=req.params
    const result=await mongo.find("user",{_id:id},{
        field:{
            password:false
        }
        //去掉密码,不要把密码显示出来
    })
    // console.log("气球",result);
    res.send(formatData({data:result[0]}))
})
router.put("/:id",async (req,res)=>{
    //id为本地的id
    const {id}=req.params
    // console.log("传过来的id",id);
    //你自己输入的数据
    let {password,age,gender}=req.body
    let newData={age,gender}
    if(password){
        //加密
        password=md5(password)
        newData.password=password
    }
    try{
        //id传过去，更改数据库的数据 newData已经是对象了
        const result= await mongo.update('user',{_id:id},{$set:newData});
        res.send(formatData({data:{_id:id,...newData}}))
    }catch(err){
        res.send(formatData({code:0}))
    }
})
module.exports=router