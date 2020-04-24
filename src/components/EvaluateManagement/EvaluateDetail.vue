<template>
  <div id="detail">
    <EvaluateNav />
    <div id="detail-right-content">
      <!-- 用于显示标题信息 -->
      <div id="header">
        <div class="FormBlock">
          <p>请对老师进行评价：</p>
        </div>
      </div>
      <!-- 用于显示详细评价的6个标准 -->
      <div id="detial-right-content-main">
        <el-form
          ref="form"
          :model="form"
          label-width="500px"
          :data="tableData"
          id="evaluateDetailTable"
        >
          <!-- <el-form-item>{{ item.qus }}</el-form-item>
          <el-radio-group v-model="form.resource1">
            <el-radio label="A"></el-radio>
            <el-radio label="B"></el-radio>
            <el-radio label="C"></el-radio>
            <el-radio label="D"></el-radio>
          </el-radio-group>-->

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

          <el-button id="subAndreturnBtn" type="primary" @click="onSubmit()">提交</el-button>
        </el-form>
      </div>
      <EavluateFooter />
    </div>
  </div>
</template>

<script>
import EvaluateNav from "./EvaluateNav";
import EvaluateFooter from "./EvaluateFooter";
export default {
  name: "EvaluateDetail",
  components: {
    EvaluateNav,
    EvaluateFooter
  },
  data() {
    return {
      tableData: [],
      isDel: false,
      /*以下方法就是接收父页面传参
        获取id:this.$route.params.id
        获取title:this.$route.params.title,
      */
      teacherNum: this.$route.params.teacherNum,
      classNum: this.$route.params.classNum,
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
  // created() {
  //   var teaName = this.$route.query.teaName;
  //   var couName = this.$route.query.couName;
  // },
  mounted() {
    this.getData();
  },
  methods: {
    onSubmit() {
      console.log("submit!");
      // tableData.teacherNum = teacherNum;
      // tableData.classNum = classNum;
      // tableData.rankQ1 = rankQ1;
      // tableData.rankQ2 = rankQ2;
      // tableData.rankQ3 = rankQ3;
      // tableData.rankQ4 = rankQ4;
      // tableData.rankQ5 = rankQ5;
      // tableData.rankQ6 = rankQ6;
      this.$router.push("/");
    },
    getName() {
      var teacherNum = this.data.teacherNum;
      var classNum = this.data.classNum;
      var name = teacherNum + ":" + classNum;
    },
    getData() {
      console.log("EvaluateDetail要开始获取数据了哦");
      this.$http
        .get("../../static/EvaluateAnswer.json")
        .then(res => {
          console.log(res.data);
          this.tableData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../assets/css/Evaluate.css";
</style>

