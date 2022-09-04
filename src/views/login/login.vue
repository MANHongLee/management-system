<template>
  <el-card class="login-container">
    <div slot="header" class="login-title">登陆</div>
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="账号" prop="username" style="width: 400px">
        <el-input
          type="input"
          v-model="form.username"
          placeholder="请输入账号"
          :clearable="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" style="width: 400px">
        <el-input
          type="password"
          v-model="form.password"
          placeholder="请输入密码"
          :clearable="true"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item class="login-submit">
        <el-button
          type="primary"
          size="small"
          @click="login"
          class="login-submit"
          @keyup.enter="keyDown(e)"
          >登陆</el-button
        >
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
// import Mock from "mockjs";
import { getMenu } from "../../api/data";
export default {
  name: "login",
  data() {
    return {
      form: {},
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    login() {
      getMenu(this.form).then((res) => {
        console.log(res);
        const { code, data } = res.data;
        if (code === 20000) {
          this.$store.commit("setToken", data.token);
          this.$store.commit("setMenu", data.menu);
          //   console.log(this.$store.state.user.menu);
          this.$router.push({ name: "home" });
        } else {
          this.$message({
            message: data.message,
            type: "warning",
          });
        }
      });

      // console.log(token);
      // this.$store.commit('setToken', token);
      // this.$router.push({ name: 'home'});
    },
    keyDown(e) {
      // 回车则执行登录方法 enter键的ASCII是13
      if (e.keyCode == 13 || e.keyCode == 100) {
        this.login(); // 定义的登录方法
      }
    },
  },
  mounted() {
    // 绑定监听事件
    window.addEventListener("keydown", this.keyDown);
  },
  destroyed() {
    // 销毁事件
    window.removeEventListener("keydown", this.keyDown, false);
  },
};
</script>

<style lang="less" scoped>
.login-container {
  // margin: 100px auto;
  position: relative;
  left: 50%;
  top: 50%;
  margin-left: -250px;
  margin-top: -143px;
  width: 500px;
  .login-title {
    // weight: bold;
    font-size: 19px;
    color: rgb(65, 66, 61);
    text-align: center;
  }
}
.login-submit {
  margin: 0px 60px 0px 60px;
  // text-align: center;
  // margin-left: -16px;
}
</style>