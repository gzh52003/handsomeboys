<template>
  <div class="fl clearfix">
    <div class="tl AllWrap"></div>

    <div class="t2 AllWrap">
      <div class="picture1">
        <a href>
          <img src="../images/picture1.jpg" alt style="width:374px;height:180px;" />
        </a>
      </div>
      <div class="picture2">
        <a href>
          <img src="../images/picture2.jpg" alt style="width:374px;height:180px;" />
        </a>
      </div>
      <div class="activity">
        <div class="acBorder">
          <div class="border-top">
            <h3>最新活动</h3>
          </div>
          <div class="border-body">
            <div class="ArticleListWrap">
              <ul>
                <li :key="item" v-for="item in activity">
                  <img src="../images/arrow_1.gif" alt />
                  <a href>{{item.text}}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="t3 AllWrap clearfix">
      <div class="t31">
        <div class="border02">
          <div class="border-top">
            <h3>新品上市</h3>
          </div>
          <div class="border-body">
            <div class="GoodsListWarp">
              <div class="GoodsList">
                <div class="itemsWrap" style="width:24%" :key="item" v-for="item in Goods">
                  <div class="item">
                    <div
                      class="goodsImg"
                      style="overflow:hidden;text-align:center;vertical-align: middle;"
                    >
                      <a href>
                        <img :src="item.imgurl" alt />
                      </a>
                    </div>
                    <h6>
                      <a href>{{item.name}}</a>
                    </h6>
                    <ul>
                      <li>
                        <span class="mktprice1">{{item.mktprice}}</span>
                      </li>
                      <li>
                        <span class="price0">{{item.price1}}</span>
                        <span class="price1">{{item.price}}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="t32">
        <div class="border02">
          <div class="border-top">
            <h3>商品分类</h3>
          </div>
          <div class="border-body">
            <div class="GoodsCategoryWrap">
              <ul>
                <li class="classify" :key="index" v-for="(item,index) in classify">
                  <a href>{{item.title}}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="t41 AllWrap" :key="index" v-for="(item,index) in recommend">
      <div class="border02">
        <div class="border-top">
          <h3>{{item.title}}</h3>
        </div>
        <div class="border-body">
          <div class="GoodsListWrap">
            <div class="GoodsList" style="height:658px">
              <div class="itemsWrap" style="width:19%" :key="i" v-for="(sub,i) in item.commodity">
                <div class="item">
                  <div
                    class="goodsImg"
                    style="overflow:hidden;text-align:center;vertical-align: middle;"
                  >
                    <a href>
                      <img :src="sub.imgurl" alt />
                    </a>
                  </div>
                  <h6>
                    <a href>{{sub.name}}</a>
                  </h6>
                  <ul>
                    <li>
                      <span class="mktprice1">{{sub.price2}}</span>
                    </li>
                    <li>
                      <span class="price0">{{sub.price0}}</span>
                      <span class="price1">{{sub.price1}}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="more clearfix">
              <a href>更多...</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activity: [
        {
          text: "安娜苏五一活动",
        },
        {
          text: "女王节活动",
        },
        {
          text: "春节放假及发货通知",
        },
        {
          text: "11。11钜惠",
        },
        {
          text: "安娜苏五一优惠活动！",
        },
      ],
      Goods: [
        {
          name: "Annasui安娜苏黑色蔷薇花...",
          mktprice: "市场价:￥220.00",
          price: "208.00",
          price1: "销售价：",
          imgurl: require("../img/cde3d7529a2e3c07.jpg"),
        },
        {
          name: "Annasui安娜苏黑色蔷薇花...",
          mktprice: "市场价:￥220.00",
          price: "208.00",
          price1: "销售价：",
          imgurl: require("../img/7569fb57037806ee.jpg"),
        },
        {
          name: "Annasui安娜苏许愿精灵女...",
          mktprice: "市场价:￥440.00",
          price: "396.00",
          price1: "销售价：",
          imgurl: require("../img/ebd65f02af1de7fe.jpg"),
        },
        {
          name: "Annasui安娜苏波西米亚花...",
          mktprice: "市场价:￥189.00",
          price: "158.00",
          price1: "销售价：",
          imgurl: require("../img/d24d3545fe8a299c.jpg"),
        },
        {
          name: "Annasui安娜苏...",
          mktprice: "市场价:￥456.00",
          price: "380.00",
          price1: "销售价：",
          imgurl: require("../img/04ea0035070af2ad.jpg"),
        },
        {
          name: "Annasui安娜苏...",
          mktprice: "市场价:￥120.00",
          price: "99.00",
          price1: "销售价：",
          imgurl: require("../img/67a03efa1e2a364b.jpg"),
        },
        {
          name: "Annasui安娜苏漫舞精灵女...",
          mktprice: "市场价:￥394.80",
          price: "329.00",
          price1: "销售价：",
          imgurl: require("../img/e82c5782cfa9e7f5.jpg"),
        },
        {
          name: "Annasui安娜苏新品魔法肌...",
          mktprice: "市场价:￥318.00",
          price: "299.00",
          price1: "销售价：",
          imgurl: require("../img/4eb89d46f251b4a3.jpg"),
        },
      ],
      classify: [
        {
          title: "Annasui安娜苏明星产品",
        },
        {
          title: "Annasui安娜苏2016圣诞限量新品",
        },
        {
          title: "Annasui安娜苏许愿精灵",
        },
        {
          title: "Annasui安娜苏香水系列",
        },
        {
          title: "Annasui安娜苏口红、唇膏",
        },
        {
          title: "Annasui安娜苏Q版香水",
        },
        {
          title: "Annasui安娜苏香水套装系列",
        },
        {
          title: "Annasui安娜苏包包系列",
        },
        {
          title: "Anansui安娜苏BB防晒系列",
        },
        {
          title: "Annasui安娜苏眉部系列",
        },
        {
          title: "Annasui安娜苏眼部系列",
        },
        {
          title: "Annasui安娜苏美甲系列",
        },
        {
          title: "Annasui安娜苏沐浴系列",
        },
        {
          title: "Annasui/安娜苏美妆工具",
        },
        {
          title: "Annasui安娜苏套装",
        },
        {
          title: "Annasui安娜苏脸部系列",
        },
      ],
      recommend: [
        {
          title: "推荐热卖",
          commodity: [
            {
              name: "Annasui安娜苏摇滚天后女...",
              price0: "销售价:",
              price1: "￥329.00",
              price2: "市场价:￥478.80",
              imgurl: require("../img/8aa6e09da2d65162.jpg"),
            },
            {
              name: "Annasui安娜苏...",
              price0: "销售价:",
              price1: "￥399.00",
              price2: "市场价: ￥478.80",
              imgurl: require("../img/5020c9e2a5d4ace3.jpg"),
            },
            {
              name: "Annasui安娜苏许愿精灵女...",
              price0: "销售价:",
              price1: "￥396.00",
              price2: "市场价:￥440.00",
              imgurl: require("../img/ebd65f02af1de7fe.jpg"),
            },
            {
              name: "Annasui安娜苏紫境魔钥/永...",
              price0: "销售价:",
              price1: "￥298.00",
              price2: "市场价:￥340.00",
              imgurl: require("../img/f372a0a5873fba95.jpg"),
            },
            {
              name: "Annasui\\安娜苏逐梦翎雀/...",
              price0: "销售价:",
              price1: "￥369.00",
              price2: "市场价:￥394.80",
              imgurl: require("../img/3de5070154c86006.jpg"),
            },
            {
              name: "Annasui安娜苏魔影幻彩/纯...",
              price0: "销售价:",
              price1: "￥248.00",
              price2: "市场价:￥259.00",
              imgurl: require("../img/2dd6215ce595841b.jpg"),
            },
            {
              name: "Annasui安娜苏魔恋 精灵/ 圆...",
              price0: "销售价: ",
              price1: "￥358.00",
              price2: "市场价: ￥399.00",
              imgurl: require("../img/b4278033c0a0de3d.jpg"),
            },
            {
              name: "Annasui安娜苏蔷薇蜜漾唇...",
              price0: "销售价:",
              price1: "￥238.00",
              price2: "市场价:￥265.00",
              imgurl: require("../img/a372237d7c9e4a38.jpg"),
            },
            {
              name: "Annasui安娜苏魔影完美饰...",
              price0: "销售价:",
              price1: "￥199.00",
              price2: "市场价:￥220.00",
              imgurl: require("../img/37fe4ba53276a66c.jpg"),
            },
            {
              name: "Annasui安娜苏摇滚甜心女...",
              price0: "销售价:",
              price1: "￥315.00",
              price2: "市场价:￥350.00",
              imgurl: require("../img/c6c2574085378fc0.jpg"),
            },
            {
              name: "Annasui安娜苏魔幻戒指唇...",
              price0: "销售价: ",
              price1: "￥299.00",
              price2: "市场价: ￥309.60",
              imgurl: require("../img/8ef93b46b989245e.jpg"),
            },
            {
              name: "Annasui 安娜苏...",
              price0: "销售价: ",
              price1: "￥380.00",
              price2: "市场价: ￥456.00",
              imgurl: require("../img/04ea0035070af2ad.jpg"),
            },
            {
              name: "Annasui安娜苏蔷薇双效唇蜜7G",
              price0: "销售价:",
              price1: "￥238.00",
              price2: "市场价:￥285.60",
              imgurl: require("../img/b97de1710c3a2214.jpg"),
            },
            {
              name: "Annasui安娜苏魔法星愿/星...",
              price0: "销售价:",
              price1: "￥278.00",
              price2: "市场价:￥322.80",
              imgurl: require("../img/6d1bd4a2d4d0b441.jpg"),
            },
            {
              name: "Annasui安娜苏漫舞精灵女...",
              price0: "销售价:",
              price1: "￥329.00",
              price2: "市场价:￥394.80",
              imgurl: require("../img/e82c5782cfa9e7f5.jpg"),
            },
          ],
        },
        {
          title: "精品推荐",
          commodity: [
            {
              name: "Annasui安娜苏魔法肌密防...",
              price0: "销售价:",
              price1: "￥319.00",
              price2: "市场价:￥358.00",
              imgurl: require("../img/157ac4af88fcde95.jpg"),
            },
            {
              name: "Annasui安娜苏魔法肌密防...",
              price0: "销售价:",
              price1: "￥399.00",
              price2: "市场价:￥428.00",
              imgurl: require("../img/822da50f90a06129.jpg"),
            },
            {
              name: "Annasui安娜苏魔法肌密防...",
              price0: "销售价:",
              price1: "￥289.00",
              price2: "市场价:￥346.80",
              imgurl: require("../img/c8d2e6b711364939.jpg"),
            },
            {
              name: "Annasui安娜苏毛孔隐形 隔...",
              price0: "销售价: ",
              price1: "￥248.00",
              price2: "市场价: ￥282.80",
              imgurl: require("../img/430defc76f25078e.jpg"),
            },
            {
              name: "Annasui 安娜苏魔颜精灵蔷...",
              price0: "销售价: ",
              price1: "￥442.00",
              price2: "市场价: ￥480.00",
              imgurl: require("../img/813ee5e18d1e19b2.jpg"),
            },
            {
              name: "Annasui安娜苏...",
              price0: "销售价:",
              price1: "￥369.00",
              price2: "市场价:￥406.80",
              imgurl: require("../img/08ca3c66377710a1.jpg"),
            },
            {
              name: "Annasui安娜苏魔幻光透瓷...",
              price0: "销售价:",
              price1: "￥359.00",
              price2: "市场价:￥389.00",
              imgurl: require("../img/4369ac9597ed6d9c.jpg"),
            },
            {
              name: "Annasui安娜苏肌密完颜底...",
              price0: "销售价:",
              price1: "￥469.00",
              price2: "市场价:￥519.00",
              imgurl: require("../img/41218f77a2941380.jpg"),
            },
            {
              name: "Annasui安娜苏洋娃娃10周...",
              price0: "销售价:",
              price1: "￥439.00",
              price2: "市场价:￥489.00",
              imgurl: require("../img/752323aef7d9b08d.jpg"),
            },
            {
              name: "Annasui安娜苏漫舞精灵女...",
              price0: "销售价:",
              price1: "￥399.00",
              price2: "市场价:￥429.00",
              imgurl: require("../img/430f01e4453e1000.jpg"),
            },
            {
              name: "Annasui安娜苏紫色魔幻蝴...",
              price0: "销售价:",
              price1: "￥129.00",
              price2: "市场价:￥158.00",
              imgurl: require("../img/806328af0f8038ea.jpg"),
            },
            {
              name: "Annasui安娜苏经典字典缎...",
              price0: "销售价: ",
              price1: "￥99.00",
              price2: "市场价: ￥108.00",
              imgurl: require("../img/4cefeb7375882c3e.jpg"),
            },
            {
              name: "Annasui安娜苏魔法肌密防...",
              price0: "销售价:",
              price1: "￥349.00",
              price2: "市场价:￥508.00",
              imgurl: require("../img/a6abbd2179ae3940.jpg"),
            },
            {
              name: "Annasui安娜苏彩蝶飞舞化...",
              price0: "销售价:",
              price1: "￥118.00",
              price2: "市场价:￥129.00",
              imgurl: require("../img/3cd66634f0fbc492.jpg"),
            },
            {
              name: "Annasui安娜苏黑色镶钻蔷...",
              price0: "销售价:",
              price1: " ￥132.00",
              price2: "市场价: ￥158.00",
              imgurl: require("../img/b98052c2a56e5b01.jpg"),
            },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="scss">
/* 公共样式 */

/* fl */
.fl {
  width: 100%;
  background: url(../images/dbj.gif);
  height: 2502px;
}
.clearfix {
  display: block;
}

/* tl */
.tl {
  height: 332px;
  background: pink;
}

/* t2 */
.t2 {
  margin-top: 5px !important;
  height: 180px;
}
.picture1 {
  float: left;
}
.picture2 {
  float: left;
  margin-left: 5px;
}
.activity {
  width: 230px;
  float: right;
}
.activity .acBorder {
  margin-bottom: 10px;
}
.acBorder .border-top h3 {
  padding: 5px 0 0 15px;
  color: #ccc;
  margin: 0;
  background: #333;
  border: 1px solid #333333;
}
.acBorder .border-body {
  padding: 5px;
  border: 1px solid #333333;
}
.activity li {
  line-height: 25px;
}
.ArticleListWrap {
  overflow: hidden;
  white-space: nowrap;
}
.ArticleListWrap img {
  margin-right: 4px;
}
.ArticleListWrap li a {
  padding-left: 3px;
  font-size: 12px;
}

/* t3 */
.t3 {
  margin-top: 5px;
  font-size: 12px;
  height: 487px;
}
.t31 {
  float: left;
  width: 750px;
  overflow: hidden;
  display: block;
}
.t31 div {
  margin-left: 3px;
}

.border02 {
  margin-bottom: 10px;
}
.border02 .border-top {
  height: 33px;
}
.border02 .border-top h3 {
  padding: 5px 0 0 15px;
  color: #ffcc33;
  font-size: 20px;
  font-weight: bold;
  background: #666666;
  border: 1px solid #666;
}
.GoodsListWarp {
  padding-top: 10px;
  text-align: center;
}
.itemsWrap {
  float: left;
  line-height: 16px;
}
.GoodsList .item {
  padding: 0 5px;
}
.GoodsList .goodsImg a {
  vertical-align: middle;
  text-align: center;
}
.itemsWrap h6 {
  font-weight: normal;
}
.GoodsList .mktprice1 {
  text-decoration: line-through;
  font-size: 1em;
  color: #999;
}
.GoodsList .price1 {
  font-size: 1em;
  font-weight: normal;
  color: #f60;
}
.t32 {
  float: right;
  width: 230px;
  border: 2px solid #666;
}
.t32 .classify {
  margin-left: 5px;
}
.classify a {
  color: #000;
  font-size: 14px;
  line-height: 20px;
  font-weight: bold;
}

/* t41 */
.t41 {
  margin-top: 10px;
  overflow: hidden;
  display: block;
  border: 2px solid #666;
}
.t41 div {
  margin-left: 3px;
}
.more {
  margin: 5px 5px 0 0;
  text-align: right;
}
.more a{
  font-size: 12px;
}
</style>