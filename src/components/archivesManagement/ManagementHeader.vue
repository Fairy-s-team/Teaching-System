<template>
  <div id="header">
    <div class="FormBlock">
      <el-form
        :inline="true"
        :model="form"
        label-width="80px"
        class="demo-form-inline"
        v-if="searchable"
      >
        <el-form-item label="职     称" class="selectBlock">
          <el-select v-model="form.title" placeholder="请选择职称" @change="selectTitleGet">
            <el-option v-for="item in titleOptions" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学     历" class="selectBlock">
          <el-select v-model="form.degree" placeholder="请选择学历" @change="selectDegreeGet">
            <el-option v-for="item in degreesOptions" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="selectBlock">
          <el-tooltip class="item" effect="dark" content="搜索" placement="bottom">
            <el-button type="primary" @click="onSubmit" id="search">
              <i class="fa fa-search"></i>
            </el-button>
          </el-tooltip>
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
import store from "@/store";
import axios from "axios";
import Vue from "vue";
export default {
  name: "ManagementHeader",

  data() {
    return {
      form: {
        title: "",
        degree: ""
      },
      searchgetdata: [], //筛选后的data
      titleOptions: ["教授", "副教授", "助教", "讲师", "其他"],
      degreesOptions: ["博士", "研究生", "本科生", "其他"],
      titleSelect: "", // 当前选中的职称
      degreeSelect: "" // 当前选中的学历
    };
  },
  props: {
    searchable: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    onSubmit() {
      console.log("开始查找...");
      let titleSelect = this.titleSelect;
      let degreeSelect = this.degreeSelect;
      console.log("title：" + this.form.title);
      console.log("degree：" + this.form.degree);

      axios
        .get("http://localhost:8090//queryByOther", {
          params: {
            title: this.form.title,
            education: this.form.degree
          }
        })
        //then获取成功；response成功后的返回值（对象）
        .then(response => {
          // var arr = [];
          // arr.push(response.data);
          console.log(response.data);

          this.searchgetdata = response.data;
          // this.searchgetdata = arr;
          this.$emit("getdata", this.searchgetdata);
          Vue.prototype.$message({
            type: "success",
            message: "找到了"
          });
          console.log("查询到的数据" + this.searchgetdata);
          console.log("查询到的数据长度" + this.searchgetdata.length);
        })
        //获取失败
        .catch(error => {
          if (this.searchgetdata.length == 0) {
            Vue.prototype.$message({
              type: "error",
              message: "没有你想要查的数据哦"
            });
          }
          console.log(error);
        });

      console.log("header里面:");
      console.log(this.searchgetdata);
      // this.$emit("getdata", this.searchgetdata);
      console.log("header已执行emit");
    },
    selectTitleGet(val) {
      this.titleSelect = val;
      console.log("当前选中职称：" + this.titleSelect);
    },
    selectDegreeGet(val) {
      this.degreeSelect = val;
      console.log("当前选中学历：" + this.degreeSelect);
    },
    signOutEvent() {
      // 退出登录
      (store.state.loginData[1].userNum = "未登录"),
        (store.state.loginData[1].token = false),
        this.$router.replace("/api/user");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../assets/css/archivesManagement.css";
</style>
