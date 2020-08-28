var datalist = [{
    name: "laoxie",
    price: 1998
}, { name: 'laoxie2', price: 2000 }]//这是一个default//
// export给模块对象添加属性
//default为默认属性，在导入时可以不加花括号
export default datalist
export var name='list'
export function getData(){
    return datalist

}
export function setName(newName){
    //更换名字
    name=newName
}
export {
    //更换名字
    datalist as data
}
