//引入token
const jwt = require('jsonwebtoken');
//盐
const privateKey = 'laoxie';
//创建一个令牌，用来弄7天免登录，如果这个令牌正确就可以不用登陆就能进入那个后台管理系统
function create(data={},expiresIn='2h'){
    const token = jwt.sign({ ...data }, privateKey ,{
        // token有效期
        expiresIn
    });

    return token;
}
//解密
function verify(token){
    let result ;
    try{
        jwt.verify(token, privateKey);
        result = true;
    }catch(err){
        result = false
    }

    return result;
}


module.exports = {
    create,
    verify
}