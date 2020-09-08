const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const mongo = require('../utils/mongo');
const { formatData, md5 } = require('../utils/tools')
let storage = multer.diskStorage({

    // 上传文件保存目录，无则自动创建
    destination: path.join(__dirname, '../../dist/uploads/'),

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
    console.log(req.file,000)
    const {_id}=req.body
    console.log("图片的id",_id);
    //更新用户信息
    const avatarUrl="/uploads/"+req.file.filename
    mongo.update("goods",{_id},{$set:{avatarUrl}})
    const as=res.send(formatData({data:{_id,avatarUrl}}))
    console.log(as);
    
})

module.exports = router;