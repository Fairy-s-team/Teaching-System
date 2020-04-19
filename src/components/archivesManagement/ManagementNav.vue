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
      default-active="0">
      <el-menu-item index="0" class="navList">
        <i class="el-icon-folder-opened"></i>
        <span slot="title">全部档案</span>
      </el-menu-item>
      <el-menu-item index="1" class="navList">
        <i class="el-icon-plus"></i>
        <span slot="title">添加档案</span>
      </el-menu-item>
      <el-menu-item index="2" class="navList">
        <i class="el-icon-edit"></i>
        <span slot="title">编辑档案</span>
      </el-menu-item>
      <el-menu-item index="3" class="navList">
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
#nav {
  user-select: none;
  width: 15%;
  height: 100vh;
  float: left;
  background-color: #545c64;
  overflow: hidden;
}
.info {
  text-align: center;
  padding: 30px 0 25px 0;
  color: #fff;
  font-size: 20px;
}
.info>i {
  padding-right: 15px;
  transform: scale(1.4);
}
.navList {
  width: 100%;
  text-align: center;
}
.el-menu-vertical-demo {
  margin-right: -1px;
}
</style>