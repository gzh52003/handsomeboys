<template>
  <div id="app">
    <!-- <div id="nav"> -->
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>-->
    <!-- </div> -->
    <van-tabbar v-model="active" route v-show="showTabbar">
      <van-tabbar-item 
        :badge="item.name==='cart'?cartLength:''"
        :icon="item.icon"
        v-for="item in menu"
        :key="item.name"
        :to="item.path"
      >{{item.text}}</van-tabbar-item>
    </van-tabbar>

    <router-view />
  </div>
</template>
<script>
import Vue from "vue";
import { Button,Tag, Tabbar, TabbarItem, Field, Checkbox } from "vant";
Vue.use(Button);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Tag)
Vue.use(Field)
Vue.use(Checkbox)
export default {
  data() {
    return {
      active:0,
      showMenu:true,
      menu: [
        {
          name: "home",
          path: "/home",
          icon: "wap-home-o",
          text: "首页",
        },
        {
          name: "discover",
          path: "/discover",
          icon: "smile-o",
          text: "分类",
        },
        {
          name: "cart",
          path: "/cart",
          icon: "shopping-cart-o",
          text: "购物车",
        },
        {
          name: "mine",
          path: "/mine",
          icon: "user-o",
          text: "个人中心",
        },
      ],
    };
  },
  //数据的长度
  computed:{
    cartLength(){
      return this.$store.state.cart.goodslist.length
    },
    showTabbar(){
      //默认显示下边底下的东西
      return this.$store.state.common.showTabbar
    }
  },
  created(){
    console.log(123);
  }
};
</script>>
<style lang="scss">
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
.price {
  del {
    color: #999;
    margin-right: 5px;
    &::before {
      content: "￥";
    }
  }
  span {
    color: #f00;
    &::before {
      content: "￥";
    }
  }
}

</style>
