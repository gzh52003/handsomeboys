const {Router,urlencoded,json}=require("express")
const session = require("express-session")
const token=require("../utils/token")
const cors=require("../filter/cors")
//插入用户
const insertRouter=require("./insert")
//插入商品
const inserGoodsRouter=require("./inserGoods")
const router =Router()
//用户管理
const userRouter=require("./user")
const goodsRouter=require("./goods")
//注册
const regRouter=require("./reg")
//登录
const logRouter=require("./log")
//验证码
const vcodeRouter=require("./vcode")
//上传图片
const uploadRouter=require("./upload")
//增加用户用的图片
const insertPicRouter=require("./insertPic")
//增加商品用的图片
const insertgoodsPicRouter=require("./insertGoodsPic")
//商品修改
const goodsPicRouter=require("./goodsPic")
//关于订单
const orderRouter=require("./order")
const {formatData}=require("../utils/tools")
//添加订单
const orderinsertRouter=require("./insertorder")
//CORS跨域
router.use(cors)
router.use(urlencoded({extended:false}),json())
//这个存在cookie的
router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000*60*60*2 }
  }))
router.use("/insert",insertRouter)
router.use("/user",userRouter)
router.use("/goods",goodsRouter)
router.use("/reg",regRouter)
router.use("/log",logRouter)
router.use("/vcode",vcodeRouter)
//上传图片 
router.use("/upload",uploadRouter)
//商品修改
router.use("/goodsPic",goodsPicRouter)
//增加用户用的图片
router.use("/insertPic",insertPicRouter)
//增加商品用的图片
router.use("/insertgoodsPic",insertgoodsPicRouter)
//插入商品
router.use("/insertGoods",inserGoodsRouter)
//关于订单
router.use("/order",orderRouter)
//添加订单
router.use("/insertorder",orderinsertRouter)
//校验token
router.get("/jwtverify",(req,res)=>{
  const {authorization}=req.query
  if(token.verify(authorization)){
    res.send(formatData({}))
  }else{
    res.send(formatData({code:0}))
  }
})
module.exports = router