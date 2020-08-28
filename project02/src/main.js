import Vue from 'vue'
import ElementUI from 'element-ui'
//引入App.vue（主页面）
import App from './App.vue'
// import Index from './index.vue'
//这里可以省略index.js==》引入所有创建的路由
import router from './router/index.js'
import request from './utils/request'
import 'element-ui/lib/theme-chalk/index.css'
//使用ElementUI
Vue.use(ElementUI)
//通过原型链共享ajax请求的方法
Vue.prototype.$request=request

new Vue({
  //把router注入Vue实例
  router:router,
  render:h=>h(App)
}).$mount('#app')
