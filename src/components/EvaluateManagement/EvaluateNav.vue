<template>
  <div id="nav">
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
        <span slot="title">教学质量评估系统</span>
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
        currentUser: store.state.loginData.userId
      };
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../../assets/css/Evaluate.css";
</style>
