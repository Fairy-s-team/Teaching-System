<template>
  <div id="content">
    <div id="passbackInformation">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="用户名：">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="身份证号：">
          <el-input v-model="form.idCard"></el-input>
        </el-form-item>
        <el-form-item label="新密码：">
          <el-input v-model="form.newPassword" width="200px" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码：">
          <el-input v-model="form.vertifyPass" show-password></el-input>
        </el-form-item>
      </el-form>
      <div>
        <label style="float:left;margin-left:30px;margin-top:30px;">验证码：</label>
        <s-identify id="vertifyCode" @click="refreshCode" :fresh="flag" @makedCode="getMakedCode"></s-identify>
        <el-input class="vertifyInput" v-model="mycode"></el-input>
      </div>
      <div style="height:40px;margin-top:30px;">
        <el-button type="primary" style="margin-left:140px;" @click="save()">保存</el-button>
        <el-button type="primary" style="margin-left:70px;" @click="returnLogin()">返回首页</el-button>
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
      code: "" //刷新后的验证码的值
    };
  },
  mounted() {
    this.flag = !this.flag;
  },
  methods: {
    //保存
    save() {},
    // 返回登录界面
    returnLogin() {
      this.$router.go("/login");
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

<style >
#content {
  width: 600px;
  height: 500px;
  background-color: #edf6ff;
  box-shadow: 0 0 5 0 #84a5d0 inset;
  margin: 150px auto;
  border-radius: 10px;
}

#passbackInformation {
  width: 500px;
  height: 350px;
  margin-left: 50px;
  float: left;
}

.el-form-item {
  height: 30px;
  padding-top: 30px;
}

#vertifyCode {
  margin-left: 7px;
  width: 150px;
  height: 35px;
  border-style: solid transparent;
  border-width: 1px;
  border-color: #ccc;
  margin-top: 20px;
  float: left;
}

.vertifyInput {
  width: 200px;
  margin-left: 30px;
  margin-top: 20px;
}
</style>