<template>
  <div class="home">
    <!-- 轮播图==》滑动 -->
    <van-swipe class="my-swipe" :autoplay="3000">
      <van-swipe-item v-for="(image,index) in images" :key="index" style="height:150px">
        <van-image :src="image.image" style="width:375px;height:150px"/>
      </van-swipe-item>
    </van-swipe>
    <!-- 头部搜索栏 -->
    <van-search v-model="value" shape="round" placeholder="请输入搜索关键词" />
    <!-- 商品列表==>宫格 -->
    <van-grid :border="false" :column-num="2" class="goodslist">
      <van-grid-item v-for="item in goodslist" :key="item._id" @click="gotoDetail(item._id)">
        <van-image :src="item.img_url" />
        <h4>{{item.goods_name}}</h4>
        <p class="price">
          <del>{{item.price}}</del>
          <span>{{item.sales_price}}</span>
        </p>
      </van-grid-item>
    </van-grid>
    
  </div>
</template>
<script>
import Vue from "vue";
import {
  Swipe,
  SwipeItem,
  Lazyload,
  Image,
  Grid,
  GridItem,
  Search,
} from "vant";

Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Image);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Search);
export default {
  name: "Home",
  data() {
    return {
      //装数据的空数组==》轮播图
      recommend: [],
      goodslist: [],
      images: [
        {
          image: "/img/img/3c4ad57ee0139e3b.jpg",
        },
        {
          image: "/img/img/029a60f90c545ad9.jpg",
        },
        {
          image: "/img/img/57deb811cf72df8b.jpg",
        },
        {
          image: "/img/img/502f4f10d7e0a35f.jpg",
        },
        {
          image: "/img/img/b92c93492cb8d139.jpg",
        },
        {
          image: "/img/img/f017ae15a7ec3a16.jpg",
        }
      ],
    };
  },
  component: {},
  methods: {
    //跳到商品商情
    gotoDetail(id) {
      this.$router.push({
        name: "Goods",
        params: {
          id,
        },
      });
    },
  },
  // async created() {
  //   //轮播图数据
  //   // const {
  //   //   data: { data: recommend },
  //   // } = await this.$request.get("goods", {
  //   //   params: {
  //   //     size: 5,
  //   //     sort: "sales_qty",
  //   //     total: 0,
  //   //   },
  //   // });
  //   // console.log("数据", recommend);
  //   // this.recommend = recommend;
  //   //列表数据
  //   const {
  //     data: { data: goodslist },
  //   } = await this.$request.get("goods", {
  //     params: {
  //       total: 0,
  //     },
  //   });
  //   this.goodslist = goodslist;
  // },
};
</script>
<style lang="scss">
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.my-swipe .van-swipe-item img {
  height: 100%;
}
.goodslist {
  //   img {
  //   }
  h4 {
    margin-bottom: 0;
    font-size: 14px;
  }
}
// .price {
//   del {
//     color: #999;
//     margin-right: 5px;
//     &::before {
//       content: "￥";
//     }
//   }
//   span {
//     color: #f00;
//     &::before {
//       content: "￥";
//     }
//   }
// }
</style>