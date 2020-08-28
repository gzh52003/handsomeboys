import Vue from 'vue';
// 1. 引入Vue-Router
import VueRouter from 'vue-router'


import Home from '../pages/Home.vue'

import User from '../pages/user/Default.vue'
import UserList from '../pages/user/List.vue'
import UserAdd from '../pages/user/Add.vue'
import UserEdit from '../pages/user/Edit.vue'

import Order from '../pages/Order.vue'
import Goods from '../pages/Goods.vue'
import Goodlist from '../pages/goodslist.vue'
import GoodsEdit from '../pages/goodsEdit.vue'
import GoodsInert from "../pages/goodsInsert.vue"
import Reg from '../pages/Reg.vue'
import Login from '../pages/Login.vue'
import NotFound from '../pages/NotFound.vue'
import forGet from "../pages/forgot.vue"
//关于订单
//订单列表
import orderList from "../pages/orderList.vue"
//订单修改
import orderEdit from "../pages/orderEdit.vue"
//订单添加
import orderInsert from "../pages/orderinsert.vue"
// 2. 使用VueRouter
Vue.use(VueRouter)

// 3. 实例化并配置参数
const router = new VueRouter({
    // mode:'history', // 一般上线后改为history路由(需要额外配置服务器)
    routes: [
        // {
        //     path: '/', // /->/home
        //     redirect: '/login'
        // },
        {
            path: '/home',
            component: Home,
            // meta:{

            // }
        },
        {
            path: '/user',
            component: User,
            children:[
                {
                    path:'',
                    //重定向
                    redirect:'list'
                },{
                    path:'add',
                    //全局组件
                    component:UserAdd
                },
                {
                    name:'userlist',
                    path:'list',
                    component:UserList
                },
                {
                    name:'userEdit',
                    //传参
                    path:'edit/:id',
                    component:UserEdit
                }
            ]
        },
        {
            path: '/order',
            component: Order,
            children:[
                {
                    path:'',
                    //重定向
                    redirect:'orderlist'
                },
                //添加
                {
                    path:'orderinsert',
                    component:orderInsert
                },
                //列表
                {
                    //这边对应请求==》给一个组件
                    path:'orderlist',
                    component:orderList
                },
                //修改
                {
                    name:'orderEdit',
                    //传参
                    path:'orderedit/:id',
                    component:orderEdit
                }
            ]
        },
        {
            path: '/goods',
            component: Goods,
            children:[
                {
                    path:'',
                    //重定向
                    redirect:'goodslist'
                },
                //插入商品
                {
                    path:'goodsinsert',
                    component:GoodsInert
                },
                {
                    //这边对应请求==》给一个组件
                    path:'goodslist',
                    component:Goodlist
                },
                {
                    name:'goodsEdit',
                    //传参
                    path:'goodsedit/:id',
                    component:GoodsEdit
                }
            ]
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/forget',
            component: forGet
        },
        {
            path: '/reg',
            component: Reg
        },
        {
            path: '/404',
            component: NotFound
        },

        // 404页面效果
        {
            path:'*',
            redirect:'/404'
        }
    ]
})
//导出default
export default router;

