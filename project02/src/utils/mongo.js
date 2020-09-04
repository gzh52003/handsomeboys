//Mongo的封装
//解构赋值，引入mongodb模块
const { MongoClient, ObjectId } = require("mongodb")
//编写mongo数据库的地址
const url = "mongodb://localhost:27017";
//数据库的名称
const dbName = "mongoDB"
async function connect() {
    //因为下面的这个方法返回的是一个promise对象
    //所以可以用awiat
    //连接mongodb
    const client = await MongoClient.connect(url)
    //连接数据库
    const db = client.db(dbName)
    //返回连接mongdb和连接数据库
    return { client, db }
}
//增
async function insert(colName, data) {
    //连接mongodb和连接数据库
    const { db, client } = await connect()
    //根据集合的名称来获取数据库的某个集合
    const collection = db.collection(colName)
    // if(Array.isArray(data)){
    //     collection.insertMany(data); // collection['inserMany']
    // }else{
    //     collection.insertOne(data)
    // }
    const result = await collection[Array.isArray(data) ? "insertMany" : "insertOne"](data)
    client.close()
    return result
}
//删
async function remove(colName, query) {
    const { db, client } = await connect()
    if (query._id && typeof query._id === "string") {
        //只有加ObjeId才能删除
        query._id = ObjectId(query._id)
    }
    console.log(query);
    const collection = db.collection(colName)
    const result = await collection.deleteMany(query)
    client.close()
    return result
}
//改
// newData{$set:{price:200,qty:2},$inc:{view:1}}
//$inc:{view:1}每次进来是在原来的基础上+1
async function update(colName, query, newData) {
    const { db, client } = await connect()
    const collection = db.collection(colName)
    if (query._id && typeof query._id === 'string') {
        query._id = ObjectId(query._id);
    }
    const result = await collection.updateMany(query, newData)
    // client.close()
    //返回更新完的数据
    return result
}
//查
async function find(colName, query = {}, options = {}) {
    const { client, db } = await connect()
    const connection = db.collection(colName)
    if (query._id && typeof query._id === 'string') {
        query._id = ObjectId(query._id);
    }
    //查询到数据集合==》不显示密码
    const opt = {}
    if (options.field) {
        opt.projection = options.field;
    }
    let result = connection.find(query, opt)
    //获取查询的商品总数//80
    const count = await result.count()
    //判断是否要跳过记录   
    if (options.skip) {
        // 跳过指定数量：`db.表名.find().skip(数量)
        result = result.skip(options.skip)
    }
    if (options.limit) {
        // db.表名.find().limit(数量);
        result = result.limit(options.limit)
    }
    //排序
    if (options.sort) { //['price'],['price','1']
        let key, val
        //变量作为key值要用中括号括起来
        key = options.sort[0]
        if (options.sort.length > 1) {
            val = options.sort[1] * 1
        } else {
            val = -1
        }
        result = result.sort({
            [key]: val
        })
    }
    //toArray()返回的是promise对象，数据转数组
    result = await result.toArray()
    client.close()
    
    if (options.total == 1) {
        return {
            total: count,
            data: result
        }
    } else {
        return result;
    }
    // return result
}
module.exports = {
    insert,
    remove,
    update,
    find
}