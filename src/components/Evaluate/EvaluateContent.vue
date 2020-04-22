<template>
  <div id="content">
    <EvaluateHeader />
    <el-table :data="tableData" id="evaluateTable">
      <el-table-column prop="teaName" label="教师姓名" width="120" align="center"></el-table-column>
      <el-table-column prop="couName" label="课程名" width="120" align="center"></el-table-column>
      <el-table-column prop="evaluate" label="去评价" width="110" align="center"></el-table-column>
      <el-table-column fixed="right" label width="52" align="center">
        <template slot-scope="scope">
          <el-popconfirm
            confirmButtonText="去评价"
            cancelButtonText="取消"
            icon="el-icon-info"
            iconColor="yellow"
            title="确定评价吗？"
            @onConfirm="jumpToEvaluate(scope.$index, tableData)"
          >
            <el-button slot="reference" type="danger" size="mini" plain id="del">
              <i class="fa fa-close" id="delBtn"></i>
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
    jump: function(index, rows) {
      console.log("跳转到对目标教师及其课程进行评价的页面！");
      var teaName = rows[0];
      var couName = rows[1];
      this.$router.push("/EvaluateDetail/" + teaName + "/" + couName);
    },
    getData() {
      console.log("要开始获取数据了哦");
      this.$http
        .get("../../static/evaluateTest.json")
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
@import "//src/assets/css/Evaluate.css";
</style>