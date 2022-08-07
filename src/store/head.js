export default {
    state: {
        //管理header显示的标签名称
        menuLabel: "首页"
        
    },
    mutations: {
        //用于管理header的标签状态， item为当前的模块名称
        labelManage (state, item) {
            state.menuLabel = item.label;
        }
        
    }
    
}