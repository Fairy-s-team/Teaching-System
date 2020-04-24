<template>
  <div id="passbackContent">
    <div id="passbackInformation">
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="用户名：" prop="userName">
          <el-input v-model="form.userName" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="身份证号：" prop="idCard">
          <el-input v-model="form.idCard" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="newPassword">
          <el-input v-model="form.newPassword" width="200px" show-password maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="vertifyPass">
          <el-input v-model="form.vertifyPass" show-password maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="验证码：" prop="mycode">
          <s-identify
            @click="refreshCode"
            :fresh="flag"
            @makedCode="getMakedCode"
            style="display:inline;"
          ></s-identify>
          <el-input
            v-model="form.mycode"
            maxlength="4"
            style="width:200px;padding-left:50px;float:right;"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="margin-left:50px;" @click="save()">保存</el-button>
          <el-button type="primary" style="margin-left:70px;" @click="gotolink">返回首页</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Code from "./Code";

export default {
  components: {
    "s-identify": Code
  },
  data() {
    return {
      form: {
        userName: "", //用户名
        idCard: "", //身份证号
        newPassword: "", //新密码
        vertifyPass: "", //确认密码
        mycode: "" //用户输入的验证码
      },
      flag: true, //该值变化，就会触发验证码刷新
      code: "", //刷新后的验证码的值
      passData: [],
      isUser: false,
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        idCard: [
          {
            required: true,
            message: "请输入身份证号",
            trigger: "blur"
          }
        ],
        newPassword: [
          {
            required: true,
            message: "请输入新密码",
            trigger: "blur"
          }
        ],
        vertifyPass: [
          {
            required: true,
            message: "请输入确认密码",
            trigger: "blur"
          }
        ],
        mycode: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    this.flag = !this.flag;
    this.getData();
  },
  methods: {
    getData() {
      console.log("要开始获取数据了哦");
      this.$http
        .get("../../static/passback.json")
        .then(res => {
          console.log(res.data);
          this.passData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },

    vertify() {
      for (var i = 0; i < this.passData.length; i++) {
        console.log(this.passData[i].name);
        console.log(this.form.userName);
        if (
          this.form.userName == this.passData[i].name &&
          this.form.idCard == this.passData[i].idCard
        ) {
          this.isUser = true;
          break;
        }
      }
    },
    //清空输入框
    clearAll() {
      this.form.userName = "";
      this.form.idCard = "";
      this.form.newPassword = "";
      this.form.vertifyPass = "";
      this.form.mycode = "";
      this.refreshCode();
    },
    //检查密码格式
    isPassword() {
      var reg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)\S{6,10}$/; //密码由字母和数字组成且长度不小于6,不大于10
      var result = reg.test(this.form.newPassword);
      console.log(result);
      return result;
    },

    //保存
    save() {
      this.vertify();
      if (!this.isUser) {
        this.$message({
          message: "修改失败！用户名或身份证错误！",
          type: "warning"
        });
        this.clearAll();
      } else {
        if (!this.isPassword()) {
          this.clearAll();
          this.$message({
            message: "修改失败！密码必须6-10位，且由数字和字母构成！",
            type: "warning"
          });

          this.isUser = false;
        } else if (this.form.newPassword != this.form.vertifyPass) {
          this.$message({
            message: "修改失败！密码和确认密码必须一样！",
            type: "warning"
          });

          this.clearAll();
          this.isUser = false;
        } else if (this.form.mycode != this.code) {
          this.$message({
            message: "验证码错误！",
            type: "warning"
          });
          alert("验证码错误！");
          this.form.mycode = "";
          this.refreshCode();
        } else {
          this.$message({
            message: "密码修改成功！",
            type: "success"
          });
          this.gotolink();
        }
      }
    },
    // 返回登录界面
    gotolink() {
      this.$router.replace("/api/user");
    },
    //刷新验证码
    refreshCode() {
      this.flag = !this.flag;
    },
    //得到验证码的值并赋给this.code
    getMakedCode(code) {
      this.code = code;
      console.log("getMakedCode:", this.code);
    }
  }
};
</script>

<style scoped>
@import "../../assets/css/Login.css";
</style>