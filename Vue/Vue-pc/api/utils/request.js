import axios from 'axios'
//  取消axios请求
const source=axios.CancelToken.source()
const baseURL=process.env.NODE_ENV==='development'?'http://localhost:2007':'http://47.112.131.23:2007'
const request =axios.create({
    baseURL:baseURL+"/api",
    //关于cookie的问题
    withCredentials:true
})
//放到request里面，方便访问
request.source=source
export default request