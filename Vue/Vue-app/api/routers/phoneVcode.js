const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const token = require("../utils/token")
const { formatData } = require('../utils/tools');
const mongo = require('../utils/mongo');
const { log } = require('console');
//验证用户名
router.post("/", async (req, res) => {
    console.log(6566);
    let { username } = req.body
    //解密1
    //old要对应数据库的名字
    let result = await mongo.find("user", { username })
    console.log(result.length);
    if (result.length > 0) {
        res.send(formatData({}))
    } else {
        res.send(formatData({ code: 0 }))
    }
})
//更换密码
router.put("/", async (req, res) => {
    let password = req.body.newPass
    let yan = req.body.yan
    console.log("前端传来的验证码",yan);
    let username = req.body.username
    //通过userame条件去数据库，获取到验证码，再和前端进行对比
    let result = await mongo.find("user", { username })
    let code = result.map((item, idx) => {
        console.log("查询验证码", item.vcode)
        return item.vcode
    })
    if (yan == code) {
        const hash = crypto.createHash('md5');
        hash.update(password + 'laoxie'); // 加盐 盐值
        password = hash.digest('hex');

        //old要对应数据库的名字==>需要传数据库对应的id过来
        mongo.update('user', { username }, { $set: { password } });
        // console.log(777, result);
        res.send(formatData({ code: 1 }))
    }else{
        res.send(formatData({ code: 10 }))
    }
    // console.log("rrr", result.vcode);
    //加密
    // if(yan=)
})

module.exports = router
