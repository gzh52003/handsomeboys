const express =require("express")
//引入中间件
const router=express.Router()
const mongo=require("../utils/mongo");
const { Db } = require("mongodb");
//查
router.get("/",async (req,res)=>{
    //这里是根据idx排序
    let {page=1,size=10,sort="idx"}=req.query;
    const skip=(page-1)*size;//0
    const limit=size*1//10
    // //处理排序参数
    sort=sort.split(",")// ['price'],['price','-1']
    //dd是指数据库

    const result= await mongo.find("dd",{},{skip,limit,sort})
    res.send(result)
})
//删
router.delete("/:id",async (req,res)=>{
    const {id}=req.params;
    console.log(id);

    try{
        const result =await mongo.remove("dd",{_id:id})
        res.send("success")
    }catch(err){
        res.send("fail")
    }
})
//增
router.patch("/",async (req,res)=>{
    const result= await mongo.insert("dd",{"name":"哒哒","age":"19"})
    res.send(result)
})
//改
// router.update("")
module.exports=router