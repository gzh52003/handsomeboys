const express=require("express")
const router=express.Router()
// const query = require('../utils/mysql');
const mongo = require('../utils/mongo');
const {formatData,md5} = require('../utils/tools')
router.put("/",async (req,res)=>{
    //id为本地的id
    let { goods_id,goods_name,big_img_url,category,sales_price,price,sales_qty,img_url,qty}=req.body.params.goods
    console.log('要添加的数据',req.body.params.goods);
    // console.log("传过来的id",isd);
    //你自己输入的数据
    //查询这个商品是存在
    const data = await mongo.find("shopcart", {goods_id} )
    console.log('一个长度',data.length);
    if(data.length>0){
        return true
    }
    let newData={ goods_id,goods_name,big_img_url,category,sales_price,price,sales_qty,img_url,qty}
    try{
        //id传过去，更改数据库的数据 newData已经是对象了
        const result= await mongo.insert('shopcart',newData);
        console.log('数据啊',result);
        res.send(formatData({code:1}))
    }catch(err){
        res.send(formatData({code:0}))
    }
})

module.exports=router