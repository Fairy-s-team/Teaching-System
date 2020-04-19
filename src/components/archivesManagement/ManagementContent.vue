<template>
  <div id="content">
    <ManagementHeader />
    <el-table
      :data="tableData"
      id="archivesTable">
      <el-table-column
        prop="name"
        label="姓名"
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="birth"
        label="出生日期"
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="degree"
        label="学历"
        width="110"
        align="center">
      </el-table-column>
      <el-table-column
        prop="wTime"
        label="工作时间"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="gSchool"
        label="毕业学校"
        width="140"
        align="center">
      </el-table-column>
      <el-table-column
        prop="pStatus"
        label="政治面貌"
        width="110"
        align="center">
      </el-table-column>
      <el-table-column
        prop="title"
        label="职称"
        width="110"
        align="center">
      </el-table-column>
      <el-table-column
        prop="tAwardTime"
        label="职称授予时间"
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="teachTime"
        label="累积上课学时"
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        fixed="right"
        label=""
        width="52"
        align="center">
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
              id="del"
              >
              <i class="fa fa-close" id="delBtn"></i>
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div id="page">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="50">
      </el-pagination>
    </div>
    
    <ManagementFooter />
  </div>
</template>

<script>
import ManagementHeader from './ManegementHeader';
import ManagementFooter from './ManagementFooter'
export default {
  name: 'ManagementContent',
  components: {
    ManagementHeader,
    ManagementFooter
  },
  data () {
    return {
      tableData: [],
      isDel: false
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
    getData() {
      console.log("要开始获取数据了哦");
      this.$http.get('../../static/archivesTest.json')
      .then(res => {
        console.log(res.data);
        this.tableData = res.data;
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#content {
    width: 85%;
    float: left;
    height: 100vh;
    position: relative;
}
#archivesTable {
  width: 88%;
  margin-left: 6%;
  margin-top: 50px;
}
#del {
  position: relative;
}
#page {
  float: right;
  margin-right: 12%;
  margin-top: 40px;
}
</style>