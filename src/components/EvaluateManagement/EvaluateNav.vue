<template>
  <div id="nav">
    <div class="info">
      <i class="fa fa-address-book-o"></i>
      <span>201711303</span>
    </div>
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      default-active="0"
    >
      <el-menu-item index="0" class="navList">
        <i class="el-icon-folder-opened"></i>
        <span slot="title">教学质量评估系统</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "EvaluateNav",
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../assets/css/Evaluate.css";
</style>