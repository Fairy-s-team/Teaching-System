<template>
  <div id="nav">
    <div class="info">
      <i class="fa fa-address-book-o"></i>
      <span>{{currentUser}}</span>
    </div>
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      :default-active="$route.path">
      <el-menu-item index="/api/normalteacher" class="navList">
        <i class="el-icon-folder-opened"></i>
        <span slot="title">我的档案</span>
      </el-menu-item>
      <el-menu-item index="/api/myRank" class="navList">
        <i class="el-icon-plus"></i>
        <span slot="title">我的评价</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import store from '@/store';

export default {
  name: 'NormalNav',
  data() {
    return {
      // store存储当前登录的用户
      currentUser: store.state.loginData.userId
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../assets/css/normalteacher.css";
</style>
