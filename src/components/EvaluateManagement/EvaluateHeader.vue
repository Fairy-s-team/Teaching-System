<template>
  <div id="header">
    <div class="FormBlock">
      <el-form :inline="true" :model="form" label-width="80px" class="demo-form-inline">
        <el-form-item label="任课老师" class="selectBlock">
          <el-autocomplete
            class="inline-input"
            v-model="form.teacherName"
            :fetch-suggestions="querySearch"
            placeholder="请输入教师姓名"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="课程名" class="selectBlock">
          <el-select v-model="form.courseName" placeholder="请选择课程名">
            <el-option
              v-for="item in classNameOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" id="search">搜索</el-button>
        </el-form-item>
      </el-form>
      <div id="signOut">
        <el-popconfirm title="确定要退出吗？" @onConfirm="signOutEvent">
          <el-button slot="reference" type="text" id="signOutBtn">
            <i class="fa fa-sign-out"></i>
          </el-button>
        </el-popconfirm>
      </div>
    </div>
  </div>
</template>

<script>
  import store from '@/store';

  export default {
    name: "EvaluateHeader",
    data() {
      return {
        form: {
          teacherName: "",
          courseName: ""
        },
        classNameOptions: [
          {value: '0', label: 'C'},
          {value: '1', label: '数据结构'},
          {value: '2', label: 'C++'},
          {value: '3', label: 'Java'}
        ]
      };
    },
    methods: {
      querySearch(queryString, cb) {
        // this.$http({
        //   url: this.$http.adornUrl("#"),
        //   method: "post",
        //   params: this.$http.adornParams({
        //     companyName:queryString 
        //   })
        // }).then(({ data }) => {
        //   for(var i=0;i<data.data.length;i++){
        //     // 需要筛选的数据字段名并不是value,所以现在需要遍历数组把筛选字段换成value
        //     data.data[i].value = data.data[i].companyName;   
        //   }
        //   //最后将数据 cb() 回去  返回到 autocomplete 组件中
        //   cb(data.data);
        // });
      },
      onSubmit() {
        console.log("开始查找..");
        console.log(this.form);
      },
      signOutEvent() {
        // 退出登录
        store.state.loginData.userId = '未登录',
          store.state.loginData.token = false,
          this.$router.replace("/api/user");
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../../assets/css/Evaluate.css";
</style>
