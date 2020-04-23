<template>
  <div id="passbackContent">
    <div id="passbackInformation">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="用户名：">
          <el-input v-model="form.userName" maxlength="10"></el-input>
          <label style="color:red;" v-if="ifName">请输入用户名!</label>
        </el-form-item>
        <el-form-item label="身份证号：">
          <el-input v-model="form.idCard" maxlength="20"></el-input>
          <label style="color:red;" v-if="ifIdCard">请输入身份证号!</label>
        </el-form-item>
        <el-form-item label="新密码：">
          <el-input v-model="form.newPassword" width="200px" show-password maxlength="10"></el-input>
          <label style="color:red;" v-if="ifPass">请输入新密码!</label>
        </el-form-item>
        <el-form-item label="确认密码：">
          <el-input v-model="form.vertifyPass" show-password maxlength="10"></el-input>
          <label style="color:red;" v-if="ifvPass">请输入确认密码!</label>
        </el-form-item>
      </el-form>
      <div>
        <label style="float:left;margin-left:30px;margin-top:30px;">验证码：</label>
        <s-identify id="vertifyCode" @click="refreshCode" :fresh="flag" @makedCode="getMakedCode"></s-identify>
        <el-input class="vertifyInput" v-model="mycode" maxlength="4"></el-input>
      </div>
      <div style="height:40px;margin-top:30px;">
        <el-button type="primary" style="margin-left:140px;" @click="save()">保存</el-button>
        <el-button type="primary" style="margin-left:70px;" @click="gotolink">返回首页</el-button>
      </div>
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
        vertifyPass: "" //确认密码
      },
      mycode: "", //用户输入的验证码
      flag: true, //该值变化，就会触发验证码刷新
      code: "", //刷新后的验证码的值
      passData: [],
      isUser: false,
      ifName: false,
      ifIdCard: false,
      ifPass: false,
      ifvPass: false
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
      this.mycode = "";
      this.refreshCode();
    },
    //检查密码格式
    isPassword() {
      var reg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)\S{6,10}$/; //密码由字母和数字组成且长度不小于6,不大于10
      var result = reg.test(this.form.newPassword);
      console.log(result);
      return result;
    },
    //检查输入是否为空
    checkNull() {
      this.ifName = false;
      this.ifIdCard = false;
      this.ifPass = false;
      this.ifvPass;
      if (this.form.userName == "") {
        this.ifName = true;
        return flase;
      } else if (this.form.idCard == "") {
        this.ifIdCard = true;
        return flase;
      } else if (this.form.newPassword == "") {
        this.ifPass = true;
        return flase;
      } else if (this.form.vertifyPass == "") {
        this.ifvPass = true;
        return false;
      } else {
        return true;
      }
    },
    //保存
    save() {
      if (this.checkNull()) {
        this.vertify();
        if (!this.isUser) {
          alert("修改失败！用户名或身份证错误！");
          this.clearAll();
        } else {
          if (!this.isPassword()) {
            this.clearAll();
            alert("修改失败！密码必须6-10位，且由数字和字母构成！");
            this.isUser = false;
          } else if (this.form.newPassword != this.form.vertifyPass) {
            alert("修改失败！密码和确认密码必须一样！");
            this.clearAll();
            this.isUser = false;
          } else if (this.mycode != this.code) {
            alert("验证码错误！");
            this.mycode = "";
            this.refreshCode();
          } else {
            alert("修改成功！");
            this.gotolink();
          }
        }
      }
    },
    // 返回登录界面
    gotolink() {
      this.$router.replace("/");
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