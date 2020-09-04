import Vue from 'vue';
import Vuex from 'vuex';
import cart from './cart'
import common from './common'
Vue.use(Vuex)
//模块化
const store =new Vuex.Store({
  modules:{
    cart,
    common,
  }
})
//导出
export default store