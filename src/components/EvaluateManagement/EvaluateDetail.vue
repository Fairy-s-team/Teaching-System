<template>
  <div id="detail">
    <EvaluateNav />
    <div id="detail-right-content">
      <!-- 用于显示标题信息 -->
      <div id="header">
        <div class="FormBlock">
          <p>请对老师进行评价(等级A:5分,B:4分,C:3分,D:2分)：</p>
        </div>
      </div>
      <!-- 用于显示详细评价的6个标准 -->
      <div id="detial-right-content-main">
        <el-form ref="form" :model="form" label-width="500px">
          <el-form-item
            v-for="item in evaluateQuestions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
            <el-radio-group v-model="form[item.value]" @change="labelOfOption(item.label)">
              <el-radio
                v-for="item in chooseOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                @change="valueOfOption(item.value)"
              ></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <el-form>
          <el-button id="subAndreturnBtn" type="primary" @click="onSubmit()">提交</el-button>
        </el-form>
      </div>
      <EvaluateFooter />
    </div>
  </div>
</template>

<script>
import EvaluateNav from "./EvaluateNav";
import EvaluateHeader from "./EvaluateHeader";
import EvaluateFooter from "./EvaluateFooter";
export default {
  name: "EvaluateDetail",
  components: {
    EvaluateNav,
    EvaluateHeader,
    EvaluateFooter
  },
  data() {
    return {
      tableData: [],
      isDel: false,
      form: {
        resource1: "1",
        resource2: "2",
        resource3: "3",
        resource4: "4",
        resource5: "5",
        resource6: "6"
      },
      //存放总评和各项评价
      result: 0,
      resultTemp1: -1,
      resultTemp2: -1,
      resultTemp3: -1,
      resultTemp4: -1,
      resultTemp5: -1,
      resultTemp6: -1,
      //存放现在的问题的label
      currentQues: "",
      index: 0,
      evaluateQuestions: [
        { value: 1, label: "1.讲课思路和概念清楚，容易听懂" },
        { value: 2, label: "2.教师上课认真，课堂纪律好" },
        { value: 3, label: "3.使用现代化教学手段" },
        { value: 4, label: "4.批改作业认真，辅导答疑热情" },
        { value: 5, label: "5.上课不迟到，不提前下课，不随便停课" },
        { value: 6, label: "6.教材和辅导资料适用" }
      ],
      chooseOptions: [
        { value: 5, label: "A", id: "chooseOption" },
        { value: 4, label: "B", id: "chooseOption" },
        { value: 3, label: "C", id: "chooseOption" },
        { value: 2, label: "D", id: "chooseOption" }
      ]
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    labelOfOption(label) {
      // console.log("label是" + label);
      this.currentQues = label;
    },
    valueOfOption(value) {
      // console.log("value是" + value);
      if (this.currentQues == "1.讲课思路和概念清楚，容易听懂") {
        this.resultTemp1 = parseInt(value);
      } else if (this.currentQues == "2.教师上课认真，课堂纪律好") {
        this.resultTemp2 = parseInt(value);
      } else if (this.currentQues == "3.使用现代化教学手段") {
        this.resultTemp3 = parseInt(value);
      } else if (this.currentQues == "4.批改作业认真，辅导答疑热情") {
        this.resultTemp4 = parseInt(value);
      } else if (this.currentQues == "5.上课不迟到，不提前下课，不随便停课") {
        this.resultTemp5 = parseInt(value);
      } else if (this.currentQues == "6.教材和辅导资料适用") {
        this.resultTemp6 = parseInt(value);
      }
    },
    onSubmit() {
      this.result =
        (parseInt(this.resultTemp1) +
          parseInt(this.resultTemp2) +
          parseInt(this.resultTemp3) +
          parseInt(this.resultTemp4) +
          parseInt(this.resultTemp5) +
          parseInt(this.resultTemp6)) /
        6;
      //输出总评成绩
      console.log("总评是" + this.result);
      this.$router.push("/");
      console.log("submit!");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../assets/css/Evaluate.css";
</style>

