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

<style>
#passwordback {
  width: 100%;
  height: 100%;
  background-color: cadetblue;
  background: -webkit-linear-gradient(top, #ffffff, #76a3c7) no-repeat;
  position: absolute;
}
</style>