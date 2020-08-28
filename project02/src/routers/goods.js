const express =require("express")
//引入中间件
const router=express.Router()
const mongo=require("../utils/mongo");
const { Db } = require("mongodb");
const {formatData} = require('../utils/tools')
//查所有的商品信息
router.get("/",async (req,res)=>{
    console.log(666);
    //这里是根据idx排序
    let {page,size=5}=req.query;
    const skip=(page-1)*size;//0
    const limit=size*1//10
    // //处理排序参数
    // sort=sort.split(",")// ['price'],['price','-1']
    //dd是指数据库

    const result= await mongo.find("goods",{},{skip,limit})
    res.send(formatData({data:result}))
})
//查单个的商品信息
router.get("/:id",async(req,res)=>{
    //这个id是点击的id
    const {id}=req.params
    const result=await mongo.find("goods",{_id:id}
        //去掉密码,不要把密码显示出来
    )
    res.send(formatData({data:result[0]}))
})  

//删
router.delete("/:id",async (req,res)=>{
    const {id}=req.params;
    console.log(id);

    try{
        const result =await mongo.remove("goods",{_id:id})
        res.send(formatData({}))
    }catch(err){
        res.send(formatData({code:0}))
    }
})
//增
router.patch("/",async (req,res)=>{
    const result= await mongo.insert("dd",{"name":"哒哒","age":"19"})
    res.send(result)
})
//改
router.put("/:id",async (req,res)=>{
    //id为本地的id
    const {id}=req.params
    // console.log("传过来的id",id);
    //你自己输入的数据
    let {name,price1,price2}=req.body
    let newData={price1,price2}
    try{
        //id传过去，更改数据库的数据 newData已经是对象了
        const result= await mongo.update('goods',{_id:id},{$set:newData});
        res.send(formatData({data:{_id:id,...newData}}))
    }catch(err){
        res.send(formatData({code:0}))
    }
})
module.exports=router