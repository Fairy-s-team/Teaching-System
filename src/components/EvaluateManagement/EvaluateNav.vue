<template>
  <div id="nav">
    <h2 id="title">教学质量评估系统</h2>
    <div class="info">
      <i class="el-icon-user"></i>
      <span>{{currentUser}}</span>
    </div>
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      default-active="0"
    >
      <el-menu-item index="0" class="navList">
        <i class="el-icon-s-data"></i>
        <span slot="title">学生评价</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import store from '@/store';
export default {
  name: "EvaluateNav",
  data() {
    return {
      // store存储当前登录的用户
      currentUser: store.state.loginData[0].userNum
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../assets/css/Evaluate.css";
</style>