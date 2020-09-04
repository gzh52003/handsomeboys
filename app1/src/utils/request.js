import axios from 'axios'
//  取消axios请求
const source=axios.CancelToken.source()
const request =axios.create({
    baseURL:"http://localhost:2003/api",
    //关于cookie的问题
    withCredentials:true
})
//放到request里面，方便访问
request.source=source
export default request