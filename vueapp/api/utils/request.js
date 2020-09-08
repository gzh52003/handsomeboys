import axios from 'axios'
const request = axios.create({
    baseURL:'http://localhost:2003/api'
});
// export const nsg =axios.create({
//     baseURL:'http://www.nsg.com'
// })
// axios.get(url,config)
// axios.post(url,data,config)
//导出这个axios,这个相当于是ajax和fetch
export default request