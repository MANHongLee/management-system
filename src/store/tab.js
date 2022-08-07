export default {
    state: {
        //管理CommonAside是否展开，true为收缩，false为展开
        isCollapse: false,
        tabsList: [
            {
                name: 'home',
                path: '/',
                label: '首页',
            },
        ],
        currentMenu: null,
    },
    mutations: {
        //管理CommonAside组建收缩的方法,第一个参数默认为state，甚于参数为需要传入的值
        collapseManage(state) {
            state.isCollapse = !state.isCollapse;
        },
        handelTabsList(state, val) {
            if (val.name !== "home") {
                state.currentMenu = val;
                const result = state.tabsList.findIndex(item => item.name === val.name);
                if (result === -1) {
                    state.tabsList.push(val);
                } else {
                    state.tabsList.splice(result + 1, state.tabsList.length - result);
                }
            } else {
                state.currentMenu = null;
                state.tabsList = [
                    {
                        name: 'home',
                        path: '/',
                        label: '首页',
                    },
                ]
            }
        }
    }
    // multations: {

    // }
}