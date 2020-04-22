<template>
  <div id="detail">
    <EvaluateHeader />
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="1.讲课思路和概念清楚，容易听懂">
        <el-radio-group v-model="form.resource1">
          <el-radio label="A"></el-radio>
          <el-radio label="B"></el-radio>
          <el-radio label="C"></el-radio>
          <el-radio label="D"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="2.教师上课认真，课堂纪律好">
        <el-radio-group v-model="form.resource2">
          <el-radio label="A"></el-radio>
          <el-radio label="B"></el-radio>
          <el-radio label="C"></el-radio>
          <el-radio label="D"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="3.使用现代化教学手段">
        <el-radio-group v-model="form.resource3">
          <el-radio label="A"></el-radio>
          <el-radio label="B"></el-radio>
          <el-radio label="C"></el-radio>
          <el-radio label="D"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="4.批改作业认真，辅导答疑热情">
        <el-radio-group v-model="form.resource4">
          <el-radio label="A"></el-radio>
          <el-radio label="B"></el-radio>
          <el-radio label="C"></el-radio>
          <el-radio label="D"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="5.上课不迟到，不提前下课，不随便停课">
        <el-radio-group v-model="form.resource5">
          <el-radio label="A"></el-radio>
          <el-radio label="B"></el-radio>
          <el-radio label="C"></el-radio>
          <el-radio label="D"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="6.教材和辅导资料适用">
        <el-radio-group v-model="form.resource6">
          <el-radio label="A"></el-radio>
          <el-radio label="B"></el-radio>
          <el-radio label="C"></el-radio>
          <el-radio label="D"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form>
    <EavluateFooter />
  </div>
</template>

<script>
import EvaluateHeader from "./EvaluateHeader";
import EvaluateFooter from "./EvaluateFooter";
export default {
  data() {
    return {
      /*以下方法就是接收父页面传参
        获取id:this.$route.params.id
        获取title:this.$route.params.title,
      */
      teaName: this.$route.params.teaName,
      couName: this.$route.params.couName,
      form: {
        resource1: "",
        resource2: "",
        resource3: "",
        resource4: "",
        resource5: "",
        resource6: ""
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    getName() {
      var teaName = this.data.teaName;
      var couName = this.data.couName;
      var name = teaName + ":" + couName;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "//src/assets/css/Evaluate.css";
</style>