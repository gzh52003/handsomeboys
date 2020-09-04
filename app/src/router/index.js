import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
//引入所有的路由
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { name: "Home" }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/list',
    name: 'List',
    component:()=>import('../views/List.vue')
  },
  {
    path: '/goods/:id',
    name: 'Goods',
    component:()=>import('../views/Goods.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component:()=>import('../views/Cart.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component:()=>import('../views/Login.vue')
  },
  {
    path: '/reg',
    name: 'Reg',
    component: ()=>import("../views/Reg.vue")
  },
  {
    path: '/mine',
    name: 'Mine',
    component: ()=>import("../views/Mine.vue")
  },

  // {
  //   path: '/about',
  //   name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})
//导出路由
export default router
