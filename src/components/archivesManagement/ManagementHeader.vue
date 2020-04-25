<template>
  <div id="header">
    <div class="FormBlock">
        <el-form 
            :inline="true" 
            :model="form" 
            label-width="80px"  
            class="demo-form-inline"
            v-if="searchable">
            <el-form-item label="职称" class="selectBlock">
                <el-select 
                    v-model="form.title" 
                    placeholder="请选择职称"
                    @change="selectTitleGet">
                    <el-option 
                        v-for="item in titleOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="学历" class="selectBlock">
                <el-select 
                    v-model="form.degree" 
                    placeholder="请选择学历"
                    @change="selectDegreeGet">
                    <el-option 
                        v-for="item in degreeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-tooltip class="item" effect="dark" content="搜索" placement="bottom">
                    <el-button type="primary" @click="onSubmit" id="search">
                        <i class="fa fa-search"></i>
                    </el-button>
                </el-tooltip>
            </el-form-item>
        </el-form>
        <div id="signOut">
            <el-popconfirm title="确定要退出吗？">
                <el-button 
                    slot="reference"
                    type="text"
                    id="signOutBtn"
                    >
                    <i class="fa fa-sign-out"></i>
                </el-button>
            </el-popconfirm>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ManagementHeader',
  data () {
    return {
        form: {
            title: "",
            degree: ""
        },
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
        titleSelect: -1,     // 当前选中的职称
        degreeSelect: -1     // 当前选中的学历
    }
  },
  props: {
    searchable: {
      type: Boolean,
      required: true
    }
  },
  methods: {
      onSubmit() {
        console.log("开始查找...");
        console.log(this.titleSelect);
        console.log(this.degreeSelect);
        if(this.titleSelect==-1 && this.degreeSelect==-1) {
            this.$message.error('请选择查询条件后进行查询！');
        }
        else if(this.titleSelect!=-1 && this.degreeSelect==-1) {
            // 只选择职称查询
            this.$http.get('../../static/archivesTest.json')
            .then(res => {
                console.log(res.data);
                this.tableData = res.data;
            })
            .catch(err => {
                console.log(err);
            });
        }
        else if(this.titleSelect==-1 && this.degreeSelect!=-1) {
            // 只选择学历查询
        }
        else {
            // 都选
        }
      },
      selectTitleGet(val) {
          this.titleSelect = val;
          console.log("当前选中职称："+this.titleSelect);
      },
      selectDegreeGet(val) {
          this.degreeSelect = val;
          console.log("当前选中学历："+this.degreeSelect);
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../assets/css/archivesManagement.css";
</style>