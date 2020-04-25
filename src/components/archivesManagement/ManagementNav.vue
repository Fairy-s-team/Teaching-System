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
      router
      :default-active="$route.path">
      <el-menu-item index="/api/document/" class="navList">
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
export default {
  name: 'ManagementNav',
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../assets/css/archivesManagement.css";
</style>