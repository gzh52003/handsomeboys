const express = require('express');
const router = express.Router()
//session
//验证码的模块
const svgCaptcha = require('svg-captcha');
const {formatData} = require('../utils/tools');
//session
router.get("/",async (req,res)=>{
    const options = {
        // size: 10,
        noise:3,
        ignoreChars: '0o1il',
        background:'#58bc58',
        color:true,
        fontSize:45,
        height:40
   }
   const captcha=svgCaptcha.create(options)
   //存放好验证码
   req.session.vcode=captcha.text.toLowerCase()
//    console.log("session",captcha.text.toLowerCase());
//    console.log("存放验证码",req.session.vcode);
   res.send(formatData({data:captcha.data}))
})
module.exports=router