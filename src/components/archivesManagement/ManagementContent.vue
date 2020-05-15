<template>
  <div id="content">
    <el-table
      :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      stripe
      id="archivesTable"
    >
      <el-table-column prop="teacherId" label="职工号" width="120" align="center"></el-table-column>
      <el-table-column prop="teacherName" label="姓名" width="120" align="center"></el-table-column>
      <el-table-column prop="birthday" label="出生日期" width="120" align="center"></el-table-column>
      <el-table-column prop="education" label="学历" width="110" align="center"></el-table-column>
      <el-table-column prop="workTime" label="工作时间" width="100" align="center"></el-table-column>
      <el-table-column prop="graduateSchool" label="毕业学校" width="140" align="center"></el-table-column>
      <el-table-column prop="politicalStatus" label="政治面貌" width="110" align="center"></el-table-column>
      <el-table-column prop="title" label="职称" width="110" align="center"></el-table-column>
      <el-table-column prop="titleGivenTime" label="职称授予时间" width="120" align="center"></el-table-column>
      <el-table-column prop="workingHours" label="累积上课学时" width="120" align="center"></el-table-column>
      <el-table-column v-if="!isEdit && isdel" fixed="right" label width="52" align="center">
        <template v-slot="scope">
          <el-popconfirm
            confirmButtonText="删除"
            cancelButtonText="取消"
            icon="el-icon-info"
            iconColor="red"
            title="确定删除吗？"
            @onConfirm="deleteRow(scope.$index, tableData,scope.row.teacherId)"
          >
            <el-button slot="reference" type="danger" size="mini" plain class="del">
              <i class="fa fa-close" id="delBtn"></i>
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
      <el-table-column v-if="!isdel && isEdit" fixed="right" label width="60" align="center">
        <template v-slot="scope">
          <el-button
            @click="editRow(scope.row)"
            slot="reference"
            type="primary"
            size="mini"
            plain
            class="edit"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div id="mOption">
      <el-popconfirm
        v-if="tableData.length != 0 && isdel"
        id="clear"
        confirmButtonText="清空"
        cancelButtonText="取消"
        icon="el-icon-info"
        iconColor="red"
        title="危险操作！确定清除所有档案数据吗？"
        @onConfirm="deleteAllRow(tableData)"
      >
        <el-button slot="reference" type="danger" size="mini" plain class="del">
          清空全部
          <i class="fa fa-close" id="delAllBtn"></i>
        </el-button>
      </el-popconfirm>
    </div>
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
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
export default {
  name: "ManagementContent",

  data() {
    return {
      tableData: [],
      totalNum: 10, // 数据总数
      pageSize: 8, // 每页的数据条数
      currentPage: 1, // 当前页
      paginationShow: true, // 用来强制刷新分页组件
      selectDataNum: "-1", // 当前选中需要编辑的教职工编号
      titles: ["教授", "副教授", "助教", "讲师", "其他"],
      degrees: ["博士", "研究生", "本科生", "其他"],
      pStatus: ["党员", "预备党员", "共青团员", "群众", "其他"],
      isdelAll: true
    };
  },
  props: {
    isdel: {
      type: Boolean,
      required: true
    },
    isEdit: {
      type: Boolean,
      required: true
    },
    searcheddata: {
      type: Array
    } //从父组件传来的data
  },
  mounted() {
    this.getData();
  },
  watch: {
    searcheddata() {
      console.log("content里面的searchdata变化了！");
      console.log("content里面的searchdata");
      console.log(this.searcheddata);
      this.tableData = this.searcheddata;
      this.totalNum = this.tableData.length;
      console.log("content里面的tabledata变了：");
      console.log(this.tableData);
    },
    //监听相同路由下参数变化的时候，从而实现异步刷新
    $route(to, from) {
      this.loadData();
    }
  },
  methods: {
    deleteRow(index, rows, id) {
      console.log("删除了一条数据！");
      console.log("你选中的id：" + id);
      const { data } = this.$http
        .delete(`http://localhost:8090//delete/${id}`)
        .then(function(response) {
          Vue.prototype.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() =>{
            Vue.prototype.$message({
              type: "error",
              message: "删除失败"
            })
        });
      console.log("index：" + index);
      // if (data.meta.status !== 200) {
      //   this.$message.error(data.meta.msg);
      // } else {
      //   this.$message({
      //     type: "success",
      //     message: "删除成功!"
      //   });
      //   rows.splice(index, 1);
      // }
      rows.splice(index, 1);
    },

    deleteAllRow(rows) {
      console.log("删除了所有数据！");
      for (var i = 0; i < rows.length; i++) {
        const { data } = this.$http.delete(
          `http://localhost:8090//delete/${rows[i].teacherId}`
        );
        console.log(rows[i]);
        if (data.meta.status !== 200) {
          isdelAll = false;
          break;
        }
      }
      if (!isdelAll) {
        this.$message({
          type: "warning",
          message: "失败!"
        });
      } else {
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        rows.splice(0, rows.length);
      }
    },
    editRow(row) {
      console.log("开始编辑...");
      this.selectDataNum = row.teacherNum;
      // 向父组件传值
      let editable = true;
      this.$emit("startEdit", editable, row);
      this.$router.push("./?id=" + this.selectDataNum);
    },
    getData() {
      console.log("要开始获取数据了哦");
      // ------------- 获取教师档案信息 --------------
      //http://localhost:8090//query
      this.$http
        .get("http://localhost:8090//query")
        .then(res => {
          console.log(res.data);
          this.tableData = res.data;
          this.totalNum = this.tableData.length;
          this.$emit("getDatas", this.tableData);
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
@import "../../assets/css/archivesManagement.css";
</style>
