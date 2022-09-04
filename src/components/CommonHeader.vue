<template>
  <header>
    <div class="l-part">
      <el-button
        @click="handleMenu()"
        icon="el-icon-menu"
        size="mini"
      ></el-button>
      <!-- <h3 style="color: #fff">{{menuLabel}}</h3>  -->
      <el-breadcrumb separator-class="el-icon-arrow-right" style="color: #fff">
        <el-breadcrumb-item
          v-for="(item, index) in tabs"
          :key="item.name"
          :index="index"
          :to="{ path: item.path }"
          @click.native="clickTabMenu(item)"
          >{{ item.label }}</el-breadcrumb-item
        >
        <!-- <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
      </el-breadcrumb>
    </div>
    <div class="r-part">
      <el-dropdown trigger="hover" size="medium" @command="handleCommand">
        <span>
          <img class="userImage" :src="userImgUrl" />
        </span>
        <el-dropdown-menu>
          <el-dropdown-item >个人中心</el-dropdown-item>
          <el-dropdown-item command="signOut" @click="signOut()">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      userImgUrl: require("../assets/images/user.png"),
    };
  },
  methods: {
    handleCommand(command) {
      if (command == 'signOut') {
        this.signOut();
      }
    },
    handleMenu() {
      this.$store.commit("collapseManage");
    },
    clickTabMenu(item) {
      console.log(item);
      this.$store.commit("handelTabsList", item);
    },
    signOut() {
      // console.log("signOut successful!");
      //触发方法移除 token
      this.$store.commit("removeToken");
      // console.log(this.$store.state.user.token);
      //判断如果token为空，则说明已退出，回到login页
      if (!this.$store.state.user.token) {
        this.$router.push({ name: 'login'});
      }
    }
  },
  computed: {
    menuLabel() {
      return this.$store.state.head.menuLabel;
    },
    ...mapState({
      tabs: (state) => state.tab.tabsList,
    }),
  },
};
</script>

<style lang="less" scoped>
header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}
// .el-breadcrumb  /deep/  .el-breadcrumb__inner
//       {
//         color: #ccc !important;				//你想要设置的字体颜色
//     }

.l-part {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
  .el-breadcrumb {
    /deep/ .el-breadcrumb__item {
      .el-breadcrumb__inner {
        color: #ccc;
      }
      &:not(:last-child) .el-breadcrumb__inner:hover {
        color: #ffd04b !important;
      }
    }
  }
}
.r-part {
  .userImage {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>