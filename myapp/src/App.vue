<template>
  <div id="app">
    <!-- 头部 -->
    <div class="top">
      <div class="tou">
        <div class="ttop"></div>
        <div class="sz">
          你好！
          <span id="login">
            <a href style="margin-right:8px">[请登录]</a>
            <a href>[免费注册]</a>
          </span>
        </div>
        <div class="gw">
          <div class="ShopCartWrap">
            <a href class="cart-container">
              购物车中有
              <b class="cart-number">0</b>
              件商品
            </a>
          </div>
        </div>
        <div class="dd">
          <a href>我的订单</a>|
          <a href>联系我们</a>
        </div>
        <div class="rx">
          <p>
            安娜苏正品&nbsp;| 满500免费配送
            <br />&nbsp;&nbsp;&nbsp; Anna Suin Fashion
          </p>
        </div>
        <div class="logo">
          <a href>
            <img src="./images/logo.png" alt />
          </a>
        </div>
        <div class="tx"></div>
        <div class="daoh">
          <ul class="MenuList">
            <li :key="item.path" v-for="item in menu">
              <router-link :to="item.path">{{item.text}}</router-link>
            </li>
          </ul>
        </div>
        <div class="daohy">
          <a href>周二新品</a>
          <a href>清仓特卖</a>
        </div>
        <div class="rmss">
          热门分类：
          <a href :key="item" v-for="item in classify">{{item.title}}</a>
        </div>
        <div class="ss">
          <form action class="SearchBar">
            <table>
              <tr>
                <td class="search_label">
                  <input type="text" class="inputstyle keywords" />
                </td>
                <td>
                  <input type="submit" value="搜索" class="btn_search" />
                </td>
              </tr>
            </table>
          </form>
        </div>
      </div>
    </div>

    <!-- 中间内容 -->

    <router-view />

    <!-- 底部 -->
    <div class="AllWrap footer">
      <div class="foota" :key="index" v-for="(item,index) in footer">
        <div class="TreeList">
          <div class="cat1">
            <a href>{{item.title}}</a>
          </div>
          <div class="cat2" :key="i" v-for="(sub,i) in item.cat2">
            <a href>{{sub.text}}</a>
          </div>
        </div>
      </div>
    </div>
    <div style="text-align:center">
      <div class="themefoot">
        <p>
          <a href>
            <img src="./images/img1.gif" alt />
          </a>
          <a href>
            <img src="./images/img2.gif" alt />
          </a>
          <a href>
            <img src="./images/img3.gif" alt />
          </a>
          <img src="./images/img4.gif" alt />
          <img src="./images/img5.gif" alt />
          <img src="./images/img6.gif" alt />
          <img src="./images/img7.gif" alt />
          <br />© 2020 All rights reserved 本商店顾客个人信息将不会被泄漏给其他任何机构和个人
          <br />有任何购物问题请联系我们 | 电话：4000-666-339 | 工作时间：周一至周五 8:00－18:00
        </p>
      </div>
    </div>
    <div class="box">
      <a href>
        Powered by
        <b style="color:#5c719e">Shop</b>
        <b style="color:#f39000">Ex</b>
      </a>
      <span style="font-size:9px">v4.8.5</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      activeIndex: "/home",
      openMenu: [],
      menu: [
        {
          text: "首页",
          open: "/home",
        },
        {
          text: "品牌故事",
          open: "/brand",
        },
        {
          text: "热卖单品",
          open: "/hot",
        },
        {
          text: "本期推荐",
          open: "/recommend",
        },
        {
          text: "会员中心",
          open: "/member",
        },
        {
          text: "客户留言",
          open: "/client",
        },
        {
          text: "友情链接",
          open: "/blogroll",
        },
        {
          text: "帮助中心",
          open: "/help",
        },
      ],
      classify: [
        {
          title: "安娜苏香水",
          open: "/1",
        },
        {
          title: "安娜苏许愿精灵香水",
          open: "/2",
        },
        {
          title: "安娜苏钱包 ",
          open: "/3",
        },
        {
          title: "安娜苏化妆镜",
          open: "/4",
        },
        {
          title: "安娜苏唇膏",
          open: "/5",
        },
        {
          title: "安娜苏许愿精灵",
          open: "/6",
        },
      ],
      footer: [
        {
          title: "新手上路",
          cat2: [
            {
              text: "顾客必读",
            },
            {
              text: "会员等级折扣",
            },
            {
              text: "订单的几种状态",
            },
            {
              text: "积分奖励计划",
            },
            {
              text: "商品退货保障",
            },
          ],
        },
        {
          title: "购物指南",
          cat2: [
            {
              text: "非会员购物通道",
            },
            {
              text: "体贴的售后服务",
            },
            {
              text: "网站使用条款",
            },
            {
              text: "网站免责声明",
            },
            {
              text: "简单的购物流程",
            },
          ],
        },
        {
          title: "支付/配送方式",
          cat2: [
            {
              text: "支付方式",
            },
            {
              text: "配送方式",
            },
            {
              text: "订单何时出库？",
            },
            {
              text: "网上支付小贴士",
            },
            {
              text: "关于送货和验货",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="scss">
/* 通用 */
* {
  padding: 0;
  margin: 0;
}
a {
  color: #333333;
  text-decoration: none;
}
li,
ul {
  list-style: none;
}
h3 {
  font-size: 14px;
}

/* top */
.top {
  height: 215px;
  background: #353535;
  font-size: 12px;
}
/* ttop */
.ttop {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 25px;
  width: 990px;
  border-bottom: 1px solid #ddd;
  background: #2a2a2a;
}

/* tou */
.tou {
  height: 215px;
  position: relative;
  margin: 0 auto;
  width: 990px;
}
.sz {
  position: absolute;
  left: 5px;
  top: 3px;
  color: #cccccc;
}
.sz a {
  color: #cccccc;
}

/* gw */
.gw {
  position: absolute;
  top: 3px;
  right: 5px;
}
.gw a {
  background: url(./images/gw.gif) no-repeat left center;
  padding-left: 18px;
  color: #cccccc;
}

/* dd */
.dd {
  position: absolute;
  top: 3px;
  right: 160px;
  color: #cccccc;
}
.dd a {
  color: #cccccc;
  padding: 0 5px;
}

/* rx */
.rx {
  position: absolute;
  top: 50px;
  right: 0;
  width: 295px;
  height: 60px;
  border: 1px solid #ddd;
  text-align: center;
  color: #cccccc;
  font-size: 16px;
  line-height: 29px;
}

/* logo */
.logo {
  position: absolute;
  left: 5px;
  top: 40px;
}

/* tx */
.tx {
  position: absolute;
  left: 0;
  top: 142px;
  width: 990px;
  height: 30px;
  border-top: 1px solid #666;
  border-bottom: 1px solid #666;
  background: #2a2a2a;
}

/* daoh */
.daoh {
  position: absolute;
  left: 10px;
  top: 140px;
}
.MenuList {
  line-height: 38px;
}
.MenuList li {
  float: left;
  margin-right: 10px;
  font-size: 14px;
}
.MenuList li a {
  float: left;
  display: block;
  color: #ffcc99;
  padding: 0 5px;
  font-size: 18px;
  font-weight: bold;
}
// .MenuList li:hover{
//   color: #F11A5D !important;
// }

/* daohy */
.daohy {
  position: absolute;
  right: 5px;
  top: 146px;
}
.daohy a {
  color: #cccccc;
  padding: 0 8px;
  font-size: 15px;
  font-weight: bold;
}

/* rmss */
.rmss {
  position: absolute;
  top: 182px;
  left: 20px;
  color: #cccccc;
  font-size: 15px;
}
.rmss a {
  color: #cccccc;
  font-size: 14px;
  padding: 0 8px;
}

/* ss */
.ss {
  position: absolute;
  right: 5px;
  top: 179px;
  width: 195px;
  height: 24px;
  background: url(./images/ss.gif) no-repeat;
}
.SearchBar {
  padding: 0px;
}
.inputstyle {
  padding: 2px;
}
.keywords {
  width: 122px;
  height: 18px;
  padding-left: 20px;
}
.SearchBar .btn_search {
  width: 46px;
  height: 23px;
  overflow: hidden;
  cursor: pointer;
  margin-top: 0px;
}

/* 底部 */
.AllWrap {
  margin: 0 auto ;
  width: 990px;
}
.footer {
  margin-top: 10px;
  font-size: 12px;
  height: 129px;
}
.foota {
  float: left;
  width: 255px;
  margin-left: 10px;
  border: 1px dashed #ddd;
  padding-left: 50px;
}
.TreeList .cat1 {
  color: #000;
  padding-left: 3px;
  font-weight: 700;
}
.TreeList .cat2 {
  color: #000;
  padding: 0 0 0 25px;
}

/* .themefoot */
.themefoot {
  margin: 0 auto;
  font-size: 12px;
}

/* box */
.box {
  font-family: Verdana;
  line-height: 20px !important;
  height: auto !important;
  font-size: 11px !important;
  text-align: center;
  text-indent: 0 !important;
  margin-top: 20px;
}
</style>
