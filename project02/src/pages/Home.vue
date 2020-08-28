<template>
  <div>
    <!-- <el-calendar v-model="value"></el-calendar> -->
    <!-- <img src="./img1/bag2.gif" alt=""> -->
    欢迎你的到来!
  </div>
</template>
<script>
export default {
//   data() {
//     return {
//       value: new Date(),
//     };
//   },
  beforeDestroy() {
    console.log("beforeDestroy");
  },
  destroyed() {
    console.log("destroyed");
  },
};
</script>
<style lang="scss">
// img{
//     display: block;
//     width: 1064px;
//     height: 480px;
// }
</style>