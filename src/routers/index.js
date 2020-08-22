const {Router,urlencoded,json}=require("express")
const session = require("express-session")
const token=require("../utils/token")
const cors=require("../filter/cors")
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
const {formatData}=require("../utils/tools")
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
router.use("/user",userRouter)
router.use("/goods",goodsRouter)
router.use("/reg",regRouter)
router.use("/log",logRouter)
router.use("/vcode",vcodeRouter)
//上传图片 
router.use("/upload",uploadRouter)
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