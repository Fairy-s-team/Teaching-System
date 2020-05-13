<template>
  <div id="detail">
    <div id="detail-header">
      <div id="detail-title">
        <em>教学质量评估管理系统</em>
      </div>
      <div class="detail-info">
        <i class="fa fa-address-card-o detail-infoIcon"></i>
        <span>{{currentUser}}</span>
      </div>
      <div id="signOut" class="detail-signOut">
        <el-popconfirm title="确定要退出吗？" @onConfirm="signOutEvent">
          <el-button slot="reference" type="text" id="signOutBtn">
            <i class="fa fa-sign-out detail-signOutIcon"></i>
          </el-button>
        </el-popconfirm>
      </div>
    </div>
    <div id="detail-right-content">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item 
          :to="{ path: '/api/rank?id='+this.currentUser }"
           class="detail-nav"
        >首页
        </el-breadcrumb-item>
        <el-breadcrumb-item class="detail-nav">
          学生评价
        </el-breadcrumb-item>
      </el-breadcrumb>
      <span id="detail-tip">从以下六个方面对任课教师进行客观评价（ A：5分 B：4分 C：3分 D：2分）</span>
      <!-- 用于显示详细评价的6个标准 -->
      <div id="detail-right-content-main">
        <div id="detail-rankInfo">
          <div class="detail-rankInfo">
            <span class="rankInfoLabel">任课教师:</span>
            <span>{{rankTeacherInfo.teacherName}}</span>
          </div>
          <div class="detail-rankInfo">
            <span class="rankInfoLabel">课程:</span>
            <span>{{rankTeacherInfo.courseName}}</span>
          </div>
        </div>
        <div id="detail-rank">
          <el-form ref="form" id="rankForm" label-width="50%" label-position="left">
            <el-form-item
              v-for="item in evaluateQuestions"
              :key="item.question_id"
              :label="(item.question_id+1)+'. '+item.question"
              :value="item.question_id"
              class="detail-rankItem"
            >
              <el-radio-group v-model="rankAnswer[item.question_id]">
                <el-radio
                  v-for="option in chooseOptions"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                ></el-radio>
              </el-radio-group>
            </el-form-item>
           
            <el-button id="subAndreturnBtn" type="primary" @click="onSubmit()">提交</el-button>
            <!-- this.resultTemp1,this.resultTemp2,this.resultTemp3,this.resultTemp4,this.resultTemp5,this.resultTemp6 -->
          </el-form>
        </div>
      </div>
      <EvaluateFooter/>
    </div>
    
  </div>
</template>

<script>
  import EvaluateNav from "./EvaluateNav";
  import EvaluateHeader from "./EvaluateHeader";
  import EvaluateFooter from "./EvaluateFooter";
  import store from '@/store';

  export default {
    name: "EvaluateDetail",
    components: {
      EvaluateNav,
      EvaluateHeader,
      EvaluateFooter
    },
    data() {
      return {
        // store存储当前登录的用户
        currentUser: store.state.loginData[0].userNum,
        // 路由传值传过来的评价的信息
        rankTeacherInfo: this.$route.query,
        // 记录最后的结果
        avgResult: 0,
        rankAnswer: [],
        evaluateQuestions: [],
        chooseOptions: [
          { value: 5, label: "A", id: "chooseOption" },
          { value: 4, label: "B", id: "chooseOption" },
          { value: 3, label: "C", id: "chooseOption" },
          { value: 2, label: "D", id: "chooseOption" }
        ]
      };
    },
    mounted() {
      this.getQuestionsData();
    },
    methods: {
      signOutEvent() {
        // 退出登录
        store.state.loginData[0].userNum = '未登录',
        store.state.loginData[0].token = false,
        this.$router.replace("/api/user");
      },
      getQuestionsData() {
        console.log("EvaluateDetail要开始获取数据了哦");
        this.$http
          .get("../../static/EvaluateQuestion.json")
          .then(res => {
            console.log(res.data);
            this.evaluateQuestions = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      },
      rankToScore(rank) {
        for(var i = 0; i<this.chooseOptions.length; i++) {
          if (this.chooseOptions[i].label == rank) {
            return this.chooseOptions[i].value;
          }
        }
      },
      onSubmit() {
        var isRight = false;
        let rankAns = this.rankAnswer;
        console.log(rankAns);
        if(rankAns.length == this.evaluateQuestions.length) {
          for(var i = 0; i<this.evaluateQuestions.length; i++) {
            if(rankAns[i] == 'A' || rankAns[i] == 'B' || rankAns[i] == 'C' || rankAns[i] == 'D') {
              // 全答了
              isRight = true;
            }
            else {
              // 没答全
              isRight = false;
              this.$message({
                type: "warning",
                message: "您有未选选项，无法进行评价!"
              });
              break;
            }
          }
        } else {
          // 没答全
          isRight = false;
          this.$message({
            type: "warning",
            message: "您有未选选项，无法进行评价!"
          });
        }

        if (isRight) {
          // 计算分值并上传数据
          var res = 0;
          for(var i = 0; i<this.evaluateQuestions.length; i++) {
            let score = this.rankToScore(rankAns[i]);
            res += parseInt(score);
            console.log(res);
          }
          this.avgResult = res / this.evaluateQuestions.length;
          console.log("总评是："+this.avgResult);

          // 上传总评

          this.$router.push({
            path: "/api/rank",
            query: {
              id: this.currentUser
            }
          });
        }
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../../assets/css/Evaluate.css";
</style>

