<template>
  <div id="content">
    <EvaluateHeader :info = "tableData" />
    <el-table
      :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      stripe
      id="evaluateTable"
    >
      <el-table-column prop="teacherName" label="教师姓名" width="320" align="center"></el-table-column>
      <el-table-column prop="courseName" label="课程名" width="320" align="center"></el-table-column>
      <el-table-column prop="evaluate" label="去评价" width="320" align="center">
        <template slot-scope="scope">
          <el-button
            @click="evaluateRow(scope.row)"
            slot="reference"
            type="primary"
            size="mini"
            plain
            class="evaluate"
          >去评价
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div id="page" v-if="tableData.length != 0">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalNum"
        :page-size="pageSize"
        :current-page.sync="currentPage"
        @current-change="currentChange"
        v-if="paginationShow"
      ></el-pagination>
    </div>

    <EvaluateFooter/>
  </div>
</template>

<script>
  import EvaluateHeader from "./EvaluateHeader";
  import EvaluateFooter from "./EvaluateFooter";
  import EvaluateDetail from "./EvaluateDetail";
  import store from '@/store';

  export default {
    name: "EvaluateContent",
    components: {
      EvaluateHeader,
      EvaluateFooter,
      EvaluateDetail
    },
    data() {
      return {
        tableData: [],
        isDel: false,
        totalNum: 16, // 数据总数
        pageSize: 7, // 每页的数据条数
        currentPage: 1, // 当前页
        paginationShow: true, // 用来强制刷新分页组件
        selectDataId: "-1" ,// 当前选中需要编辑的教职工编号
        currentUser: store.state.loginData.userId
      };
    },
    mounted() {
      this.getData();
    },
    methods: {
      evaluateRow(row) {
        console.log("跳转到对目标教师及其课程进行评价的页面！");
        this.selectDataId = row.teacherId;
        // 打开评价页的时候传值
        this.$router.push({
          path: "/rank/detail",
          query: {
            teacherId: row.teacherId,
            teacherName: row.teacherName,
            courseId: row.courseId,
            courseName: row.courseName,
          }
        });
      },
      getData() {
        this.$http
          .get("http://localhost:8080/api/class/"+this.currentUser)
          .then(res => {
            console.log(res.data);
            this.tableData = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      },
      currentChange(val) {
        this.currentPage = val;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../../assets/css/Evaluate.css";
</style>
