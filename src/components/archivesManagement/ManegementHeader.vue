<template>
  <div id="header">
    <div class="FormBlock">
        <el-form :inline="true" :model="form" label-width="80px"  class="demo-form-inline">
            <el-form-item label="职称" class="selectBlock">
                <el-select v-model="form.title" placeholder="请选择职称">
                    <el-option label="教授" value="0"></el-option>
                    <el-option label="副教授" value="1"></el-option>
                    <el-option label="院长" value="2"></el-option>
                    <el-option label="副院长" value="3"></el-option>
                    <el-option label="辅导员" value="4"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="学历" class="selectBlock">
                <el-select v-model="form.degree" placeholder="请选择学历">
                    <el-option label="博士" value="0"></el-option>
                    <el-option label="研究生" value="1"></el-option>
                    <el-option label="本科" value="2"></el-option>
                    <el-option label="专科" value="3"></el-option>
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
        }
    }
  },
  methods: {
      onSubmit() {
          console.log("submit");
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#header {
    user-select: none;
    width: 100%;
    height: 80px;
    background-color: #79a8a9;
    overflow: hidden;
}
.FormBlock {
    padding-top: 20px;
    padding-left: 40px;
}
.demo-form-inline {
    width: 90%;
    float: left;
}
.selectBlock {
    float: left;
    margin-left: 80px;
}
#search {
    box-shadow: 1px 1px 10px#545c64;
    background-color: #ffd04b;
    border: 0;
    margin-left: 50px;
    color: #545c64;
}
#search:hover {
    color: #fff;
}
#search:active {
    color: #fff;
    box-shadow: 0 0 0#545c64;
}
#signOut {
    float: right;
    margin-right: 4%;
}
#signOutBtn {
    color: #fff;
    text-align: center;
    font-size: 30px;
    margin-top: -6px;
}
#signOutBtn:hover {
    color: #545c64;
}
</style>