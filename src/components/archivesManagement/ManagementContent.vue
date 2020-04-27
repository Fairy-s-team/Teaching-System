<template>
  <div id="content">
    <el-table
      :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      stripe
      id="archivesTable">
      <el-table-column
        prop="teacherName"
        label="姓名"
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="birthday"
        label="出生日期"
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="education"
        label="学历"
        width="110"
        align="center"
        :formatter="eduFormatter">
      </el-table-column>
      <el-table-column
        prop="worktime"
        label="工作时间"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="graduateSchool"
        label="毕业学校"
        width="140"
        align="center">
      </el-table-column>
      <el-table-column
        prop="politicalStatus"
        label="政治面貌"
        width="110"
        align="center"
        :formatter="pStatusFormatter">
      </el-table-column>
      <el-table-column
        prop="title"
        label="职称"
        width="110"
        align="center"
        :formatter="titleFormatter">
      </el-table-column>
      <el-table-column
        prop="titleGivenTime"
        label="职称授予时间"
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="workingHours"
        label="累积上课学时"
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        v-if="!isEdit && isdel"
        fixed="right"
        label=""
        width="52"
        align="center"
        >
        <template slot-scope="scope">
          <el-popconfirm
            confirmButtonText='删除'
            cancelButtonText='取消'
            icon="el-icon-info"
            iconColor="red"
            title="确定删除吗？"
            @onConfirm="deleteRow(scope.$index, tableData)"
          >
            <el-button
              slot="reference"
              type="danger"
              size="mini"
              plain
              class="del"
              >
              <i class="fa fa-close" id="delBtn"></i>
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
      <el-table-column
        v-if="!isdel && isEdit"
        fixed="right"
        label=""
        width="60"
        align="center"
        >
        <template slot-scope="scope">
          <el-button
            @click="editRow(scope.row)"
            slot="reference"
            type="primary"
            size="mini"
            plain
            class="edit"
            >
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div id="mOption">
      <el-popconfirm
        v-if="tableData.length != 0 && isdel"
        id="clear"
        confirmButtonText='清空'
        cancelButtonText='取消'
        icon="el-icon-info"
        iconColor="red"
        title="危险操作！确定清除所有档案数据吗？"
        @onConfirm="deleteAllRow(tableData)"
      >
        <el-button
          slot="reference"
          type="danger"
          size="mini"
          plain
          class="del"
          >清空全部 
          <i class="fa fa-close" id="delAllBtn"></i>
        </el-button>
      </el-popconfirm>
      <div 
        id="page"
        v-if="tableData.length != 0">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalNum"
          :page-size="pageSize"
          :current-page.sync="currentPage"
          @current-change="currentChange"
          v-if="paginationShow">
        </el-pagination>
      </div>
    </div>
  </div>
  
</template>

<script>
export default {
  name: 'ManagementContent',
  data () {
    return {
      tableData: [],
      totalNum: 10,       // 数据总数
      pageSize: 8,        // 每页的数据条数
      currentPage: 1,     // 当前页
      paginationShow: true,       // 用来强制刷新分页组件
      selectDataNum: '-1',  // 当前选中需要编辑的教职工编号
      titleOptions: [
        { value: '0', label: '教授' },
        { value: '1', label: '副教授' },
        { value: '2', label: '讲师' },
        { value: '3', label: '助教' },
        { value: '4', label: '其他' }
      ],
      degreeOptions: [
        { value: '0', label: '研究生' },
        { value: '1', label: '本科' },
        { value: '2', label: '大专' },
        { value: '3', label: '中专' },
        { value: '4', label: '其他' }
      ],
      pStatusOptions: [
        { value: '0', label: '党员' },
        { value: '1', label: '团员' },
        { value: '2', label: '群众' },
        { value: '3', label: '其他' }
      ],
    }
  },
  props: {
    isdel: {
      type: Boolean,
      required: true
    },
    isEdit: {
      type: Boolean,
      required: true
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    deleteRow(index, rows) {
      console.log("删除了一条数据！");
      rows.splice(index, 1);
    },
    deleteAllRow(rows) {
      console.log("删除了所有数据！");
      rows.splice(0, rows.length);
    },
    editRow(row) {
      console.log("开始编辑...");
      this.selectDataNum = row.teacherNum;
      // 向父组件传值
      let editable = true;
      this.$emit('startEdit', editable, row);
      this.$router.push('./?id='+this.selectDataNum);
    },
    getData() {
      console.log("要开始获取数据了哦");
      // ------------- 获取教师档案信息 --------------
      this.$http.get('../../static/archivesTest.json')
      .then(res => {
        console.log(res.data);
        this.tableData = res.data;
        this.totalNum = this.tableData.length;
        this.$emit('getDatas', this.tableData);
      })
      .catch(err => {
        console.log(err);
      });
    },
    eduFormatter(row, column) {
      // 数据转汉字
      let education = row.education;
      for(var i in this.degreeOptions) {
        if(education == Object.values(this.degreeOptions[i])[0]) {
          return Object.values(this.degreeOptions[i])[1];
        }
      }
    },
    pStatusFormatter(row, column) {
      // 数据转汉字
      let politicalStatus = row.politicalStatus;
      for(var i in this.pStatusOptions) {
        if(politicalStatus == Object.values(this.pStatusOptions[i])[0]) {
          return Object.values(this.pStatusOptions[i])[1];
        }
      }
    },
    titleFormatter(row, column) {
      // 数据转汉字
      let title = row.title;
      for(var i in this.titleOptions) {
        if(title == Object.values(this.titleOptions[i])[0]) {
          return Object.values(this.titleOptions[i])[1];
        }
      }
    },
    currentChange(val) {
      this.currentPage = val;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../assets/css/archivesManagement.css";
</style>