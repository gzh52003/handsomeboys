const allow_origin = ['localhost:2003','localhost:8080']

function cors(req,res,next){
    // 设置响应头
    // Access-Control-Allow-Origin
    // Access-Control-Allow-Methods
    // Access-Control-Allow-Headers

    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    // res.header("Access-Control-Allow-Methods","PUT,POST,GET,PATCH,DELETE,OPTIONS");

    if(allow_origin.includes(req.get('host'))){

    // 获取请求者的域名
    res.set({
       "Access-Control-Allow-Credentials":"true",
        // "Access-Control-Allow-Origin":"*",
        // "Access-Control-Allow-Origin": "http://localhost:2003",
        "Access-Control-Allow-Origin": "http://localhost:8080",
        // "Access-Control-Allow-Origin": "http://127.0.0.1:2003",
        // "Access-Control-Allow-Origin": "http://127.0.0.1:8080",
        // "Access-Control-Allow-Headers":"Content-Type,Content-Length, Authorization, Accept,X-Requested-With",
        "Access-Control-Allow-Methods":"PUT,POST,GET,PATCH,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With,userId,token"
    })
    // 跨域请求CORS中的预请求
    if(req.method=="OPTIONS") {
        res.sendStatus(200);/*让options请求快速返回*/
    } else{
        next();
    }
    }else{
        res.send(401)
    }
   

}

module.exports = cors;