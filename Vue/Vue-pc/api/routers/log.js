const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const token = require("../utils/token")
const { formatData } = require('../utils/tools');
const mongo = require('../utils/mongo');
//登录
router.get("/", async (req, res) => {
    let { username, password, vcode, mdl } = req.query
    //如果这个验证码不相等
    if (vcode !== req.session.vcode) {
        res.send(formatData({ code: 10 }))
        return
    }
    const hash = crypto.createHash('md5');
    hash.update(password + 'laoxie'); // 加盐 盐值
    password = hash.digest('hex');

    //验证用户名是否存在
    let result = await mongo.find("user", { username, password })
    if (result.length > 0) {
        // console.log(789);
        let authorization
        //引入token 单位秒,，带单位h就是小时就是持续在那个页面的时间,{username,20}
        //如果是“20”就是毫秒，，没有双引号就是秒
        // const authorization=token.create({username})
        if (mdl === "true") {
            authorization = token.create({ username }, "7d")
            //取到里面的对象
            result = result[0];
            result.authorization = authorization
            res.send(formatData({ data: result }));
            return;
        } else {
            authorization = token.create({ username })
        }
        res.send(formatData({code: 1}))
    } else {
        res.send(formatData({ code: 0 }))
    }
})
//查询用户名和密码是否存在
router.post("/", async (req, res) => {
    console.log(666);
    let { username } = req.body
    //这是旧的密码
    let password = req.body.oldpass
    //解密1
    console.log("uuu", username, typeof(password));
    //old要对应数据库的名字

        const hash = crypto.createHash('md5');
        hash.update(password + 'laoxie'); // 加盐 盐值
        password = hash.digest('hex');
        let result = await mongo.find("user", { username, password })
    console.log(result.length);
    if (result.length > 0) {
        res.send(formatData({}))
    } else {
        res.send(formatData({ code: 0 }))
    }
})
//修改密码
router.put("/", async (req, res) => {
    console.log(123000000);
    let password = req.body.newPass
    let username = req.body.username
    console.log("rrr", password);
    //加密
    const hash = crypto.createHash('md5');
    hash.update(password + 'laoxie'); // 加盐 盐值
    password = hash.digest('hex');

    //old要对应数据库的名字==>需要传数据库对应的id过来
    const result = await mongo.update('user', { username }, { $set: { password } });
    console.log(777, result);
    res.send(formatData({ code: 1 }))
})
module.exports = router