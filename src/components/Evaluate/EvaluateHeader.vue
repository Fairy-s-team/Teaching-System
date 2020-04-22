<template>
  <div id="header">
    <div class="FormBlock">
      <el-form :inline="true" :model="form" label-width="80px" class="demo-form-inline">
        <el-form-item label="任课老师" class="selectBlock">
          <el-select v-model="form.title" placeholder="请选择职称">
            <el-option label="张三" value="0"></el-option>
            <el-option label="李四" value="1"></el-option>
            <el-option label="王五" value="2"></el-option>
            <el-option label="赵二" value="3"></el-option>
            <el-option label="孙五" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程名" class="selectBlock">
          <el-select v-model="form.degree" placeholder="请选择学历">
            <el-option label="C" value="0"></el-option>
            <el-option label="数据结构" value="1"></el-option>
            <el-option label="C++" value="2"></el-option>
            <el-option label="Java" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-tooltip class="item" effect="dark" content="搜索" placement="bottom">
            <el-button type="primary" @click="onSubmit" id="search">
              <i class="fa fa-search"></i>
            </el-button>
          </el-tooltip>
        </el-form-item>
      </el-form>
      <div id="signOut">
        <el-popconfirm title="确定要退出吗？">
          <el-button slot="reference" type="text" id="signOutBtn">
            <i class="fa fa-sign-out"></i>
          </el-button>
        </el-popconfirm>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EvaluateHeader",
  data() {
    return {
      form: {
        title: "",
        degree: ""
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "//src/assets/css/Evaluate.css";
</style>