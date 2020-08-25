import Vue from 'vue'

import VueRouter from 'vue-router'

import Home from '../pages/Home.vue'
import Brand from '../pages/Brand.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    routes:[
        {
            path:'/',
            redirect:'/home'
        },
        {
            path:'/home',
            component:Home
        },
        {
            path:'/brand',
            component:Brand
        }
    ]
})

export default router;

console.log('router=' , router);
