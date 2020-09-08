const express=require("express")
const router=express.Router()
// const query = require('../utils/mysql');
const mongo = require('../utils/mongo');
const {formatData,md5} = require('../utils/tools')
//插入用户
router.put("/",async (req,res)=>{
    console.log(55555);
    //id为本地的id
    const {id}=req.params
    // console.log("传过来的id",isd);
    //你自己输入的数据s
    let {name,price,num,consignee,address,contact,total}=req.body
    let newData={name,price,num,consignee,address,contact,total}
    // if(password){
    //     //加密
    //     password=md5(password)
    //     newData.password=password
    // }
    try{
        //id传过去，更改数据库的数据 newData已经是对象了
        const result= await mongo.insert('order',newData);
        console.log('数据啊',result);
        res.send(formatData({code:1}))
    }catch(err){
        res.send(formatData({code:0}))
    }
})

module.exports=router