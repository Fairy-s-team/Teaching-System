<template>
  <!-- 登录界面 -->
  <div id="login">
    <!--登录界面头部-->
    <login-header></login-header>
    <!-- 登录界面内容 -->
    <login-content></login-content>
    <!-- 登录界面尾部 -->
    <login-footer></login-footer>
  </div>
</template>

<script>
// 引入组件
import LoginHeader from "./LoginHeader";
import LoginContent from "./LoginContent";
import LoginFooter from "./LoginFooter";

export default {
  name: "Login",
  components: {
    "login-header": LoginHeader,
    "login-content": LoginContent,
    "login-footer": LoginFooter
  }
};
</script>

<style scoped>
#login {
  width: 100%;
  height: 100%;
  background-color: cadetblue;
  background: -webkit-linear-gradient(top, #ffffff, #76a3c7) no-repeat;
  position: absolute;
}
</style>