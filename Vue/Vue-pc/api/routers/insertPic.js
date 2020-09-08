const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
//这是添加用户的图片
const mongo = require('../utils/mongo');
const { formatData, md5 } = require('../utils/tools')
let storage = multer.diskStorage({

    // 上传文件保存目录，无则自动创建
    destination: path.join(__dirname,  '../../dist/uploads/'),

    // 格式化文件名：字段名+时间戳+扩展名
    // avatar-1597202347355.jpg
    filename: function (req, file, cb) {
        // 获取文件后缀名
        let ext = path.extname(file.originalname);

        cb(null, file.fieldname + '-' + Date.now() + ext);
    }
})
// 设置中间件
const uploadMiddleware = multer({ storage });
router.post("/avatar",uploadMiddleware.single("avatar"),(req,res)=>{
    console.log("嘤嘤嘤",000)
    const {username}=req.body
    //更新用户信息==>
    const avatarUrl="/uploads/"+req.file.filename
    //根据用户名来找到唯一标识，来增加图片
    mongo.update("user",{username},{$set:{avatarUrl}})
    //返回数据
    const as=res.send(formatData({data:{username,avatarUrl}}))
    console.log(as);
    
})

module.exports = router;