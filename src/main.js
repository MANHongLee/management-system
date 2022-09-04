// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "../src/assets/less/index.less";
import store from '../src/store';
import http from "axios";
import "../src/api/mock";
// import * as echarts from "echarts";

Vue.use(ElementUI);

Vue.config.productionTip = false;

//由于axios不是一个插件，所以需要加入在Vue的原型中，并起了别名叫$http
Vue.prototype.$http = http;

//路由守卫 用于判断登陆
router.beforeEach((to, from, next) => {
  //防止页面刷新，导致token失效
  store.commit('getToken')

  const token = store.state.user.token;
  //如果没有token,而且当前页不是登陆页,就让页面回到登陆页
  if (!token && to.name !== 'login') {
    next({ name: 'login',});
  }else{
    next();
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
