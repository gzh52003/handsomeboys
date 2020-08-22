const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const token =require("../utils/token")
const {formatData} = require('../utils/tools');
const mongo = require('../utils/mongo');
//登录
router.get("/",async(req,res)=>{
    let {username,password,vcode,mdl}=req.query
    //如果这个验证码不相等
    // if(vcode!==req.session.vcode){
    //     res.send(formatData({code:10}))
    //     return
    // }
    const hash = crypto.createHash('md5');
    hash.update(password+'laoxie'); // 加盐 盐值
    password = hash.digest('hex');
    
    //验证用户名是否存在
    let result=await mongo.find("user",{username,password})
    console.log("这是一个长度",result.length);
    if(result.length>0){
        console.log(789);
        let authorization
        if(mdl==="true"){
            authorization=token.create({username},"7d")
            //取到里面的对象
            result = result[0];
            result.authorization = authorization
            res.send(formatData({data:result}));
            return;
        }else{
            authorization=token.create({username})
        }
        res.send(formatData({}))
    }else{
        res.send(formatData({code:0}))
    }
})
module.exports=router