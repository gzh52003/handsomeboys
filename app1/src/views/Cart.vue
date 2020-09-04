<template>
  <div>
    <!--  steps步骤条-->
    <van-steps :active="active">
      <van-step>购物车</van-step>
      <van-step>提交订单</van-step>
      <van-step>付款</van-step>
      <van-step>购买完成</van-step>
    </van-steps>
    <!-- 卡片 -->
    <van-card
      :price="item.sales_price"
      :title="item.goods_name"
      :thumb="item.img_url"
      v-for="item in goodslist"
      :key="item._id"
      @click-thumb="gotoDetail(item._id)"
    >
      <!--只点击图片跳转 -->
      <template #tag>
        <van-checkbox v-model="item.checked"></van-checkbox>
      </template>
      <template #price>
        <p class="price">
          <del>{{item.price}}</del>
          <span>{{item.sales_price}}</span>
          <van-stepper
            v-model="item.qty"
            theme="round"
            input-width="20px"
            button-size="20px"
            async-change integer
            @change="changeQty(item._id,$event)"
          />
          <!-- $event保留原来的参数 -->
        </p>
      </template>
      <template #footer>
        <van-button plain type="danger" icon="cross" @click.stop="removeItem(item._id)" size="mini"></van-button>
      </template>
    </van-card>
    <div style="padding:10px">
      <van-button plain type="danger" size="small" @click="clearCart">清空购物车</van-button>
    </div>
    <van-submit-bar :price="totalPrice" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checkAll">全选</van-checkbox>
      <template #tip>
        你的收货地址不支持同城送,
        <span>修改地址</span>
      </template>
    </van-submit-bar>
  </div>
</template>
<script>
//单个文件引入==》性能更好
import Vue from "vue";
import {Card, Step, Steps, Button, SubmitBar, Stepper } from "vant";
import {mapState,mapMutations,mapActions} from 'vuex';
Vue.use(Card);
Vue.use(Step);
Vue.use(Steps);
Vue.use(Button);
Vue.use(SubmitBar);
Vue.use(Stepper);
export default {
  name: "Cart",
  data() {
    return {
      active: 0,
      selecteds: [],
    };
  },
  computed: {
    // goodslist() {
    //   return this.$store.state.cart.goodslist;
    // },
    //下面是简写的写法
    //把vuex中state数据映射到组件的computed
    // ...mapState(["goodslist"]), //state中的方法名和这边的函数一样时可以这样写,等效于：goodslist()=>this.$store.state.goodslist
    //不同的时候   // 等效于：cartlist()=>this.$store.state.goodslist
    ...mapState({
      // { cartlist: "goodslist" }
    // 如果有命名空间的话
    goodslist(state){
      return state.cart.goodslist
    },
    }),
    checkAll: {
      get() {
        return this.goodslist.every((item) => item.checked);
      },
      set(val) {
        console.log("复选框", val);
        this.goodslist = this.goodslist.map((item) => {
          item.checked = val;
          return item;
        });
      },
    },
    totalPrice() {
      //没有store的写法
      // return this.goodslist.reduce((pre,item)=>pre+item.sales_price*item.qty,0)*100;
      return this.$store.getters.totalPrice;
      //添加命名空间的获取方式
      // return this.$store.getters['cart/totalPrice']
    },
  },
  methods: {
    onSubmit() {
      console.log(123);
    },
    gotoDetail(id) {
      //去商品详情
      this.$router.push("/goods/" + id);
    },
    //移除
    // removeItem(id) {
    //   // this.$store.commit("remove", id);

    // },
    //移除和清空
    ...mapMutations({
      removeItem: "remove",
      clearCart: "clear",
    }),
    //清空购物车
    // clearCart() {
    //   console.log(333);
    //   this.$store.commit("clear");
    // },
    //修改数量
    // changQty(id, qty) {
    //   this.$store.commit("changeQty", { _id: id, qty });
    //   this.$store.dispatch('changeQtyAsync',{_id:id,qty})
    // },
    ...mapActions({
      // changeQty:'changeQtyAsync'
      changeQty(dispatch, _id,qty) {
        dispatch("changeQtyAsync", { _id, qty });
      },
    }),
  },
  created() {
    // this.$parent.showMenu = false;
    // console.log("goodslist=", this.$store.state);
    //隐藏下边的东西
    this.$store.commit("displayTabbar", false);
  },
  beforeDestroy() {
    // this.$parent.showMenu = true;
    // console.log("cart.destroyed", this.$parent.showMenu);
    //显示下边的东西
    this.$store.commit("displayTabbar", true);
  },
};
</script>