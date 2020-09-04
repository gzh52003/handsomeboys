import request from '../utils/request'
//显示库存不足
import { Notify } from 'vant'
const cart = {
    //可以添加命名空间
    // namespace: true,
    //state相当于data里的数据
    state: {
        goodslist: [{
            _id: "5f3f986fa2711242f8100ab3",
            goods_id: "25572",
            goods_name:
                "瑞士艺术制表大师 爱宝时（EPOS）-Ladies女士系列 心跳时光 4314.133.20.50.10 机械女表",
            big_img_url: "/img/80b6a4d2175c4028999e3e2eab242d3f_big.jpg",
            category: "女士表",
            sales_price: "580",
            price: "6960",
            sales_qty: 968.0,
            img_url: "/img/80b6a4d2175c4028999e3e2eab242d3f.jpg",
            qty: 1,
            checked: false,
        },
        {
            _id: "5f3f986fa2711242f8100ab4",
            goods_id: "25578",
            goods_name:
                "瑞士艺术制表大师 爱宝时（EPOS）-Ladies女士系列 梦想家 4387.152.24.28.15 机械女表",
            big_img_url: "/img/9591bc752bdb4992bfa3c56bf56667ff_big.jpg",
            category: "女士表",
            sales_price: "613.3",
            price: "7360",
            sales_qty: 285.0,
            img_url: "/img/9591bc752bdb4992bfa3c56bf56667ff.jpg",
            qty: 5,
            checked: false,
        },
        {
            _id: "5f3f986fa2711242f8100ab5",
            goods_id: "42531",
            goods_name:
                "瑞士艺术制表大师 爱宝时（EPOS）-Ladies 女士系列 罗马假期 4390.152.20.16.30 机械女表",
            big_img_url: "/img/36c7dec6f3f44491a31ad99ad4338fea_big.jpg",
            category: "女士表",
            sales_price: "680",
            price: "8160",
            sales_qty: 179.0,
            img_url: "/img/36c7dec6f3f44491a31ad99ad4338fea.jpg",
            qty: 10,
            checked: false,
        }]
    },
    //相当于局部组件的computed
    getters: {
        //属性
        // totalPrice(state) {
        //     //原先单位是分
        //     return state.goodslist.reduce((pre, item) => pre + item.sales_price * item.qty, 0) * 100
        // }
        // totalPrice(state,getters,rootState,rootGetters){
        totalPrice(state) {
            return state.goodslist.reduce((pre, item) => pre + item.sales_price * item.qty, 0) * 100
        },
        // test() {
        //     return 'cart'
        // }
    },
    //唯一可以修改state的方法
    mutations: {
        //初始化购物车的数据
        initCart(state, data) {
            state.goodslist = data
        },
        //添加到购物车
        //goods是对象
        add(state, goods) {
            state.goodslist.unshift(goods)
        },
        //修改qty==》数量
        changeQty(state, { _id, qty }) {
            state.goodslist = state.goodslist.map(item => {
                if (item._id === _id) {
                    item.qty = qty
                }
                return item
            })
        },
        //删除商品
        remove(state, _id) {
            state.goodslist = state.goodslist.filter(item => item._id !== _id)
        },
        //清空购物车
        clear(state) {
            state.goodslist = []
        }
    },
    //查询库存
    actions: {
        //content相当于state
        async changeQtyAsync(context, { _id, qty }) {
            console.log('context',context);
            //获得商品的库存数量==》判断是否添加数量
            //请求商品的库存
            const { data } = await request.get(`/goods/${_id}/kucun`)
            const kucun = data.data
            console.log("kucun",kucun);
            if (kucun < qty) {
                //显示库存不足
                Notify({ type: 'danger', message: '库存不足' })
                qty = kucun
            }
            //启动mutations里的方法
            context.commit("changeQty", { _id, qty })
        },
        async getCart(context) {
            //请求cart里的数据
            const { data } = await request.get(`/cart`)

            context.commit('initCart', data.data)
        }
    }
}
export default cart