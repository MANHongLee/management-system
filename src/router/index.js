import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Main from '@/views/Main'
// import User from '@/views/User'


Vue.use(Router)

//避免重复点击路由时，控制台出现报错，虽不影响，但也不爽
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mainPage',
      component: Main,
      redirect: "/home",
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import("@/views/home"),
        },
        {
          path: '/user',
          name: 'user',
          // component: User,
          //按需引入的写法
          component: () => import("@/views/user"),
        },
        {
          path: '/mall',
          name: 'mall',
          // component: User,
          //按需引入的写法
          component: () => import("@/views/mall"),
        },
        {
          path: '/other/pageOne',
          name: 'page1',
          // component: User,
          //按需引入的写法
          component: () => import("../views/other/pageOne.vue"),
        },
        {
          path: '/other/pageTwo',
          name: 'page2',
          // component: User,
          //按需引入的写法
          component: () => import("../views/other/pageTwo.vue"),
        }
      ]
    },
    
  ]
})
