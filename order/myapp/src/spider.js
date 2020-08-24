// const fs = require('fs');
// const path = require('path');
const request = require('request');
const cheerio = require('cheerio');


// http://annasuionline.com/
const url = 'http://annasuionline.com/';
request(url,(err,res,body)=>{
    let $ = cheerio.load(body);
    const goodslist = []
    $('.t41').find('.itemsWrap').each((idx,el)=>{
        const $el = $(el);
        const name = $el.find('.item h6').text();
        const price2 = $el.find('.mktprice1').text();
        const price0 = $el.find('.price0').text();
        const price1 = $el.find('.price1').text();
        const imgurl = $el.find('.goodsImg img').attr('src');
        const goods = {
            name,
            price0,
            price1,
            price2,
            imgurl
        }
        goodslist.push(goods);
        
        // 2. 爬取图片到本地
        // request请求图片地址，返回一个数据流
        // const filename = path.basenamae(imgurl);
        // const fileStream = fs.createWriteStream("./img/"+filename)
        // request(imgurl).pipe(fileStream);

    });
    console.log(goodslist);
})