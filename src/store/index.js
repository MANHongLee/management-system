import Vue from 'vue';
import Vuex from 'vuex';
import tab from '../store/tab';
import head from '../store/head';
import user from '../store/user';

//全局的注入Vuex
Vue.use(Vuex);

//将store进行对外暴露，通过模块的方式来组建store仓库
export default new Vuex.Store({
    modules: {
        tab,
        head,
        user,
    }
})