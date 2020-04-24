<template>
  <div id="content">
    <EvaluateHeader />
    <el-table :data="tableData" id="evaluateTable">
      <el-table-column prop="teacherNum" label="教师姓名" width="120" align="center"></el-table-column>
      <el-table-column prop="classNum" label="课程名" width="120" align="center"></el-table-column>
      <el-table-column prop="evaluate" label="去评价" width="110" align="center">
        <template slot-scope="scope">
          <el-popconfirm
            confirmButtonText="去评价"
            cancelButtonText="取消"
            icon="el-icon-info"
            iconColor="yellow"
            title="确定评价吗？"
            @onConfirm="jumpToEvaluate(scope.$index, tableData)"
          >
            <!-- @onConfirm="jumpToEvaluate(scope.$index, tableData)" -->
            <!--  @onConfirm="jumpToEvaluate()"-->

            <el-button slot="reference" type="warning" size="mini" plain id="del">
              <i id="evaluateBtn">评价</i>
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div id="page">
      <el-pagination background layout="prev, pager, next" :total="50"></el-pagination>
    </div>
    <EvaluateFooter />
  </div>
</template>

<script>
import EvaluateHeader from "./EvaluateHeader";
import EvaluateFooter from "./EvaluateFooter";

export default {
  name: "EvaluateContent",
  components: {
    EvaluateHeader,
    EvaluateFooter
  },
  data() {
    return {
      tableData: [],
      isDel: false
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    jumpToEvaluate: function(index, rows) {
      console.log("跳转到对目标教师及其课程进行评价的页面！");
      this.$router.push("/EvaluateDetail");
      //1
      // var teacherName = rows[0];
      // var className = rows[1];
      // this.$router.push("/EvaluateDetail" + teacherName + "/" + className);
      // console.log("跳转成功！");
      //2
      // this.$router.push({ name: "/EvaluateDetail", params: { id: "1" } });
    },
    // jumpToEvaluate: function(index, rows) {
    //   console.log("跳转到对目标教师及其课程进行评价的页面！");
    //   this.$router.push("/EvaluateDetail");
    //   var teacherName = rows[0];
    //   var className = rows[1];
    //   this.$router.push({
    //     path: "/EvaluateDetail",
    //     query: {
    //       teacherName: this.teaName,
    //       className: this.couName
    //     }
    //   });
    // },
    getData() {
      console.log("要开始获取数据了哦");
      this.$http
        .get("../../static/EvaluateTest.json")
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