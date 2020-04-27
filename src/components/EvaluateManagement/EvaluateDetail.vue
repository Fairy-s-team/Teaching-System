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
          <!-- v-for="(item,index) in tableData"
          :key="index" 
          <el-form-item>{{ tableData[index]}}</el-form-item>
          <el-form-item>
            <el-radio-group v-model="form.resource1">
              <el-radio label="A"></el-radio>
              <el-radio label="B"></el-radio>
              <el-radio label="C"></el-radio>
              <el-radio label="D"></el-radio>
            </el-radio-group>
          </el-form-item>-->

          <el-form-item label="1.讲课思路和概念清楚，容易听懂">
            <el-radio-group v-model="form.resource1">
              <el-radio
                v-for="item in chooseOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                @change="valueOfOption1(item.value)"
              ></el-radio>
            </el-radio-group>

            <!-- <el-radio-group v-model="form.resource1">
              <el-radio label="A" value="5"></el-radio>
              <el-radio label="B" value="4"></el-radio>
              <el-radio label="C" value="3"></el-radio>
              <el-radio label="D" value="2"></el-radio>
            </el-radio-group>-->
          </el-form-item>

          <el-form-item label="2.教师上课认真，课堂纪律好">
            <el-radio-group v-model="form.resource2">
              <el-radio
                v-for="item in chooseOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                @change="valueOfOption2(item.value)"
              ></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="3.使用现代化教学手段">
            <el-radio-group v-model="form.resource3">
              <el-radio
                v-for="item in chooseOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                @change="valueOfOption3(item.value)"
              ></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="4.批改作业认真，辅导答疑热情">
            <el-radio-group v-model="form.resource4">
              <el-radio
                v-for="item in chooseOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                @change="valueOfOption4(item.value)"
              ></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="5.上课不迟到，不提前下课，不随便停课">
            <el-radio-group v-model="form.resource5">
              <el-radio
                v-for="item in chooseOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                @change="valueOfOption5(item.value)"
              ></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="6.教材和辅导资料适用">
            <el-radio-group v-model="form.resource6">
              <el-radio
                v-for="item in chooseOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                @change="valueOfOption6(item.value)"
              ></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <el-form>
          <el-button id="subAndreturnBtn" type="primary" @click="onSubmit()">提交</el-button>
          <!-- this.resultTemp1,this.resultTemp2,this.resultTemp3,this.resultTemp4,this.resultTemp5,this.resultTemp6 -->
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
      tableData: [
        // "1.讲课思路和概念清楚，容易听懂",
        // "2.教师上课认真，课堂纪律好",
        // "3.使用现代化教学手段",
        // "4.批改作业认真，辅导答疑热情",
        // "5.上课不迟到，不提前下课，不随便停课",
        // "6.教材和辅导资料适用"
      ],
      isDel: false,
      form: {
        resource1: "",
        resource2: "",
        resource3: "",
        resource4: "",
        resource5: "",
        resource6: ""
      },
      result: 0,
      resultTemp1: -1,
      resultTemp2: -1,
      resultTemp3: -1,
      resultTemp4: -1,
      resultTemp5: -1,
      resultTemp6: -1,
      index: 0,
      chooseOptions: [
        { value: 5, label: "A" },
        { value: 4, label: "B" },
        { value: 3, label: "C" },
        { value: 2, label: "D" }
      ]
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    valueOfOption1(value) {
      this.resultTemp1 = parseInt(value);
      // console.log("第一个的值是：" + parseInt(value) + "类型" + typeof parseInt(value));
    },
    valueOfOption2(value) {
      this.resultTemp2 = parseInt(value);
    },
    valueOfOption3(value) {
      this.resultTemp3 = parseInt(value);
    },
    valueOfOption4(value) {
      this.resultTemp4 = parseInt(value);
    },
    valueOfOption5(value) {
      this.resultTemp5 = parseInt(value);
    },
    valueOfOption6(value) {
      this.resultTemp6 = parseInt(value);
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

