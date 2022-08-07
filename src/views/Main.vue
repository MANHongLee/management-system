<template>
  <el-container style="height: 100%">
    <el-aside width="auto">
      <common-aside></common-aside>
    </el-aside>
    <el-container>
      <el-header height="50px">
        <common-header></common-header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
//导入公共组件 CommonAside
import CommonAside from "@/components/CommonAside";
import CommonHeader from '@/components/CommonHeader'
export default {
  name: "mainPage",
  components: { CommonAside, CommonHeader},
  data() {
    return {
      // message: "hello managementSystem!",
      // dialogVisible: false,
    };
  },
  methods: {},
};
</script>
<style lang='less' scoped>
.el-header {
  background-color: #333;
}
.el-main {
  padding-top: 0;
}
</style>
