var request = require("request");
var querystring = require("querystring");
const express = require("express");
const Router = express.Router(); //Router==app
const { formatData } = require('../utils/tools');
const mongo = require('../utils/mongo');
const { log } = require("console");

//获取手机验证码,用自己的模板
Router.get("/check", async (req, res) => {
  let { phone, username } = req.query; //获取电话号码
  console.log("电话号码", phone, username);
  let str = ""; //准备拼接四位随机数：这里就是发到用户手机的随机数
  for (let i = 0; i < 4; i++) {
    str += parseInt(Math.random() * 10); //0-9的随机数
  }
  var queryData = querystring.stringify({
    mobile: phone, // 接受短信的用户手机号码
    tpl_id: "144712", // 您申请的短信模板ID，根据实际情况修改
    // tpl_id: "222246",
    tpl_value: "#code#=" + str, // 您设置的模板变量，根据实际情况修改
    key: "360467c49f4c1899234735dbac01ea94", // 应用APPKEY(应用详细页查询)
    // key:"c6b46772a66cba574d9279777b989e48"
  });

  var queryUrl = "http://v.juhe.cn/sms/send?" + queryData;
  console.log("订单", queryUrl);
  //要安装中间件
  request(queryUrl, function (error, response, body) {
    console.log("ttt", response.statusCode);
    if (!error && response.statusCode == 200) {
      console.log("返回的内容", body); // 打印接口返回内容

      var jsonObj = JSON.parse(body); // 解析接口返回的JSON内容
      console.log(jsonObj);
      //   res.send(jsonObj); //实际的需求：这个不用返回，直接存到数据库中，点击提交的时候拿到的验证码和这个验证码对比就行
      //存数据库,生成的验证码可以这样存
      //存一个时间
      function dates() {
        let date =  new Date()
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var dates = date.getDate();

        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();

        var day = date.getDay(); //0-6  0表示星期天

        var arr = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

        // 把格式化号的 时间返回
        return year + '-' + month + '-' + dates + ' ' + h + ':' + m + ':' + s + '  ' + arr[day]
      }

      // let d = Date.now()
      // let date1 = new Date(d);
      // let date = date1.toLocaleDateString();
      
      let date =dates()
      console.log("ttt",date);
      // let vcode = jsonObj
      let vcode = 200
      mongo.update("user", { username }, { $set: { vcode, date } })
      console.log();

      res.send("发送成功");
    } else {
      console.log("请求异常");
      res.send("发送失败");
    }
  });
});

module.exports = Router; //导出路由对象
