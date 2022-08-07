<template>
  <el-menu
    :default-active="currentMenuPath"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <!-- <h3>{{isCollapse ? '后台' : '企业通用管理后台'}}</h3> -->
    <div class="logoBox">
      <div class="logo">
        <img src="../assets/images/zjzl_logo.png" title="企业通用管理后台">
      </div>
      <div class="name" v-show="!isCollapse">
        企业通用管理后台
      </div>
    </div>
    <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :index="item.path" :key="item.path">
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{item.label}}</span>
    </el-menu-item>

    <el-submenu v-for="(item, index) in hasChildren" :index="index + ''" :key="item.path">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{item.label}}</span>
      </template>
      <el-menu-item-group v-for="chilItem in item.children" :index="chilItem.path" :key="chilItem.path">
        <el-menu-item :index="chilItem.name" @click="clickMenu(chilItem)">
            <i :class="'el-icon-' + chilItem.icon"></i>
            {{chilItem.label}}
            </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import {mapMultation} from "vuex";
export default {
  data() {
    return {
      menu: [
        {
          path: "/",
          name: "home",
          label: "首页",
          icon: "s-home",
          url: "Home/Home",
        },
        {
          path: "/mall",
          name: "mall",
          label: "商品管理",
          icon: "video-play",
          url: "MallManage/MallManage",
        },
        {
          path: "/user",
          name: "user",
          label: "用户管理",
          icon: "user",
          url: "UserManage/UserManage",
        },
        {
          label: "其他",
          icon: "location",
          children: [
            {
              path: "/other/pageOne",
              name: "page1",
              label: "页面1",
              icon: "setting",
              url: "Other/PageOne",
            },
            {
              path: "/other/pageTwo",
              name: "page2",
              label: "页面2",
              icon: "setting",
              url: "Other/PageTwo",
            },
          ],
        },
      ],
      currentMenuPath: "/"
    };
  },
  watch: {
    //监听路由地址的变化，如果改变，则实现对应的菜单高亮
    $route: "changeCurrentMenuPath",
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    //点击处理导航栏，传入当前的导航模块item
    clickMenu (item){
      //切换模块路由 根据数据的name值切换
        // console.log(item);
        this.$router.push({
            name:item.name, 
        });
        //管理header中显示的标签label名称
        // this.$store.commit('labelManage', item);
        this.$store.commit("handelTabsList", item);
    },
    //修改当前路径进行高亮显示
    changeCurrentMenuPath (){
      this.currentMenuPath = this.$route.path;
      //若果当前的路由为home页面，则放回根路由 “/”
      if(this.$route.path == "/home"){
        this.currentMenuPath = "/";
      }
    }
  },
  computed: {
    //过滤菜单项，选出有子菜单的和没有子菜单的菜单项
    noChildren (){
        return this.menu.filter(item => !item.children);
    },
    hasChildren (){
        return this.menu.filter(item => item.children);
    },
    //使用全局注册的$store.state拿到state属性，然后里面的子仓库tab的state的isCollapse值
    //现在isCollapse这个值是公共的 所有人都可以通过$store来拿到
    isCollapse (){
      return this.$store.state.tab.isCollapse;
    }
  },
  mounted (){
    // this.currentMenuPath();
  }
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu{
    height: 100%;
    border: none;
    .logoBox{
      display: flex;
      height: 50px;
      justify-content: center;
      align-items: center;
      .logo{
        height: 30px;
      }
    }
    .name{
        padding-left: 10px;
        font-weight: 700;
        font-size: 16px;
        color: #fff;
        text-align: center;
        line-height: 48px;
        box-sizing: border-box;
    }
}
</style>