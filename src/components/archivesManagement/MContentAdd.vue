
<template>
  <div id="addContent">
    <div id="addBg">
      <el-form
        ref="form"
        :model="editObj"
        :rules="rules"
        label-width="100px"
        size="medium"
        id="addForm"
      >
        <el-row :gutter="80" class="row" v-if="!editStatus">
          <el-col :span="8">
            <el-form-item label="职工号" class="itemsName" prop="teacherId">
              <el-input v-model="editObj.teacherId" max-length="10"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="教师姓名" class="itemsName" prop="teacherName">
              <el-input v-model="editObj.teacherName" max-length="10"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出生日期" class="itemsName" prop="birthday">
              <el-date-picker
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择出生日期"
                v-model="editObj.birthday"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="80" class="row" v-if="editStatus">
          <el-col :span="12">
            <el-form-item label="教师姓名" class="itemsName" prop="teacherName">
              <el-input v-model="editObj.teacherName" max-length="10"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出生日期" class="itemsName" prop="birthday">
              <el-date-picker
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择出生日期"
                v-model="editObj.birthday"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="80" class="row">
          <el-col :span="12">
            <el-form-item label="毕业学校" class="itemsName" prop="graduateSchool">
              <el-input v-model="editObj.graduateSchool" max-length="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学历" class="itemsName" prop="education">
              <el-select v-model="editObj.education" placeholder="选择学历" class="selectItems">
                <el-option v-for="item in degreeOptions" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="80" class="row">
          <el-col :span="24">
            <el-form-item label="政治面貌" class="itemsName" prop="politicalStatus">
              <el-radio-group v-model="editObj.politicalStatus" size="medium" id="radioGroup">
                <el-radio
                  v-for="item in pStatusOptions"
                  :key="item"
                  :label="item"
                  border
                  class="radioItems"
                >{{item}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="80" class="row">
          <el-col :span="12">
            <el-form-item label="职称" class="itemsName" prop="title">
              <el-select v-model="editObj.title" placeholder="选择职称" class="selectItems">
                <el-option v-for="item in titleOptions" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="职称授予时间" class="itemsName" prop="titleGivenTime">
              <el-date-picker
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择授予职称的日期"
                v-model="editObj.titleGivenTime"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="80" class="row">
          <el-col :span="12">
            <el-form-item label="工作时间" class="itemsName" prop="workTime">
              <el-input v-model="editObj.workTime" max-length="2"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="累计授课学时" class="itemsName" prop="workingHours">
              <el-input v-model="editObj.workingHours" max-length="10"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="80" class="row">
          <el-col :span="2" :offset="7">
            <el-form-item>
              <el-button type="primary" @click="onSubmit()">提交</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue"
export default {
  name: "MContentAdd",
  data() {
    var checkNum = (rule, value, callback) => {
      var vertifyIdReg = /^[0-9]*$/;
      if (!vertifyIdReg.test(value)) {
        callback(new Error("职工号只能为数字"));
      } else {
        callback();
      }
    };
    return {
      titleOptions: ["教授", "副教授", "助教", "讲师", "其他"],
      degreeOptions: ["博士", "研究生", "本科生", "其他"],
      pStatusOptions: ["党员", "预备党员", "共青团员", "群众", "其他"],
      rules: {
        teacherId: [
          { required: true, message: "请输入职工号！", trigger: "blur" },
          { validator: checkNum, trigger: "blur" }
        ],
        teacherName: [
          { required: true, message: "请输入姓名！", trigger: "blur" }
        ],
        graduateSchool: [
          { required: true, message: "请输入学校！", trigger: "blur" }
        ],
        workTime: [
          { required: true, message: "请输入工作时间！", trigger: "blur" },
          { validator: checkNum, trigger: "blur" }
        ],
        workingHours: [
          { required: true, message: "请输入累计课时！", trigger: "blur" },
          { validator: checkNum, trigger: "blur" }
        ]
      }
    };
  },
  props: {
    editObj: {
      type: Object,
      required: true
    },
    editStatus: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    postData(url, msg) {
      console.log("提交档案信息!");
      console.log("现在提交的表中信息是：");
      console.log(this.editObj);
      this.$refs.form.validate(async valid => {
        if (!valid) {
          Vue.prototype.$message({
            message: "格式有误，提交失败！",
            type: "warning"
          });
        } else {
          console.log(this.editObj);
          // post 请求
          axios
            .post(url, this.editObj)
            .then(function(response) {
              console.log(response);
              // alert(msg);
              Vue.prototype.$message({
                message: "提交成功",
                type: "success"
              })
              // this.getData();
            })
            .catch(function(error) {
              Vue.prototype.$message({
                message: "提交失败",
                type: "error"
              })
              console.log(error);
            });
          if (this.editStatus) {
            // 编辑结束-向父组件传值并跳转到编辑列表
            let editable = false;
            this.$emit("editEnd", editable);
            this.$router.replace("./");
          }
        }
      });
    },

    onSubmit() {
      let addUrl = "http://localhost:8090//add"; //添加的路径
      let editUrl = "http://localhost:8090//update"; //编辑的路径
      let addMsg = "添加成功";
      let editMsg = "修改成功";

      if (!this.editStatus) {
        console.log("添加");
        this.postData(addUrl, addMsg);
      } else {
        this.postData(editUrl, editMsg);
        console.log("编辑");
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../assets/css/archivesManagement.css";
</style>