<template>
  <!-- 找回密码界面 -->
  <div id="passwordback">
    <!-- 头部 -->
    <pass-header></pass-header>
    <!-- 内容 -->
    <passback-content></passback-content>
  </div>
</template>

<script>
  //引入组件
  import LoginHeader from "./LoginHeader";
  import passwordBackContent from "./PasswordBackContent";

  export default {
    name: "passwordBack",
    components: {
      "pass-header": LoginHeader,
      "passback-content": passwordBackContent
    }
  };
</script>

<style scoped>
  @import "../../assets/css/Login.css";
</style>
