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
      <el-menu-item index="/api/document" class="navList">
        <i class="el-icon-folder-opened"></i>
        <span slot="title">全部档案</span>
      </el-menu-item>
      <el-menu-item index="/api/document/add/" class="navList">
        <i class="el-icon-plus"></i>
        <span slot="title">添加档案</span>
      </el-menu-item>
      <el-menu-item index="/api/document/edit/" class="navList">
        <i class="el-icon-edit"></i>
        <span slot="title">编辑档案</span>
      </el-menu-item>
      <el-menu-item index="/api/document/del/" class="navList">
        <i class="el-icon-delete"></i>
        <span slot="title">删除档案</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import store from '@/store';
export default {
  name: 'ManagementNav',
  data () {
    return {
      // store存储当前登录的用户
      currentUser: store.state.loginData[1].userNum
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../assets/css/archivesManagement.css";
</style>