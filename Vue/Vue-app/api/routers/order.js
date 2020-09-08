const express=require("express")
const router=express.Router()
// const query = require('../utils/mysql');
const mongo = require('../utils/mongo');
const {formatData,md5} = require('../utils/tools')
//获取到所有的用户
router.get("/",async (req,res)=>{
    console.log("我是一个test");
    let {page,size=6,}=req.query;
    console.log(page);
    const skip=(page-1)*size;//0
    const limit=size*1//10
    const result =await mongo.find("order",{},{skip,limit})
    res.send(formatData({data:result}))
})
router.delete("/:id",async(req,res)=>{
    const {id}=req.params
    
    try{
        await mongo.remove("order",{_id:id})
        res.send(formatData({}))
    }catch(err){
        res.send(formatData({code:0}))
    }
})
//获取单个用户信息
router.get("/:id",async(req,res)=>{
    //这个id是点击的id
    const {id}=req.params
    //设置只显示十条数据
    const result=await mongo.find("order",{_id:id},{
        field:{
            password:false
        }
        //去掉密码,不要把密码显示出来
    })
    res.send(formatData({data:result[0]}))
})
//修改信息
router.put("/:id",async (req,res)=>{
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
        const result= await mongo.update('order',{_id:id},{$set:newData});
        res.send(formatData({data:{_id:id,...newData}}))
    }catch(err){
        res.send(formatData({code:0}))
    }
})
//插入数据


module.exports=router