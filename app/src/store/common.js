const common={
    state:{
        showTabbar:true
    },
    getters:{
        // test(){
        //     return 'common'
        // }
    },
    mutations:{
        //菜单的显示
        displayTabbar(state,payload){
            state.showTabbar=payload
        }
    },
    actions:{

    }

}
export default common
