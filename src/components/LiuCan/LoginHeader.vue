<template>
  <!-- 页面头部 -->
  <div id="loginHeader">
    <!-- 学校的校名图片-->
    <div id="schoolLogo">
      <img src="../../assets/schoolLogo.png"/>
    </div>
    <!-- 文字 -->
    <span id="sysTitle">{{msg}}</span>
  </div>
</template>


<script>
  export default {
    name: "LoginHeader",
    data() {
      return {
        msg: "教学质量评估管理系统"
      };
    }
  };
</script>

<style scoped>
  @import "../../assets/css/Login.css";
</style>
