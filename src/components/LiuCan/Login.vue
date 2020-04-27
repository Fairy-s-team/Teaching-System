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
  },
  mounted(){
    // console.log("test store:", this.$store);
  }
};
</script>

<style scoped>
@import "../../assets/css/Login.css";
</style>