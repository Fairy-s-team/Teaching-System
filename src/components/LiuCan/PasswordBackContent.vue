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
    var checkUserName = (rule, value, callback) => {
      var numberReg = /^[0-9]*$/;
      if (!numberReg.test(value)) {
        callback(new Error("学号或职工号只能为数字！"));
      } else {
        callback();
      }
    };

    var checkIdCard = (rule, value, callback) => {
      var idcard1Reg = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$/; //第一代15位身份证
      var idcard2Reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/; //第二代18位身份证
      console.log("idcard被调用");
      if (!idcard1Reg.test(value) && !idcard2Reg.test(value)) {
        callback("身份证无效！");
      } else {
        callback();
      }
    };

    var checkPass = (rule, value, callback) => {
      var passReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/;
      if (!passReg.test(value)) {
        callback("新密码至少六位且必须由字母和数字组成！");
      } else {
        callback();
      }
    };

    var vertifyPass = (rule, value, callback) => {
      if (value !== this.form.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    var checkVertify = (rule, value, callback) => {
      var vertifyCodeReg = /^[0-9]*$/;
      if (!vertifyCodeReg.test(value)) {
        callback(new Error("验证码只能为数字！"));
      } else {
        callback();
      }
    };

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
      stuData: [], //学生信息
      teaData: [], //老师信息
      isUser: false, //是否为用户
      //输入检查规则
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { max: 10, min: 5, message: "学号或教职工号最少5位" },
          { validator: checkUserName, trigger: "blur" }
        ],
        idCard: [
          {
            required: true,
            message: "请输入身份证号",
            trigger: "blur"
          },
          { validator: checkIdCard, trigger: "blur" }
        ],
        newPassword: [
          {
            required: true,
            message: "请输入新密码",
            trigger: "blur"
          },
          { validator: checkPass, trigger: "blur" }
        ],
        vertifyPass: [
          {
            required: true,
            message: "请输入确认密码",
            trigger: "blur"
          },
          { validator: vertifyPass, trigger: "blur" }
        ],
        mycode: [
          { required: true, message: "请输入验证码!", trigger: "blur" },
          { validator: checkVertify, trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.flag = !this.flag;
    this.getData();
  },

  methods: {
    //获取信息
    getData() {
      this.$http
        .get("../../static/teacher.json")
        .then(res => {
          console.log(res.data);
          this.teaData = res.data;
        })
        .catch(err => {
          console.log(err);
        });

      this.$http
        .get("../../static/student.json")
        .then(res => {
          console.log(res.data);
          this.stuData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
      console.log(this.loginData);
      console.log("getdata函数");
    },
    //验证是否为用户
    vertify() {
      for (var i = 0; i < this.stuData.length; i++) {
        console.log(this.stuData[i].name);
        console.log(this.form.userName);
        if (
          this.form.userName == this.stuData[i].stuId &&
          this.form.idCard == this.stuData[i].identity
        ) {
          this.isUser = true;
          break;
        }
      }
      if (!this.isUser) {
        for (var i = 0; i < this.teaData.length; i++) {
          console.log(this.teaData[i].name);
          console.log(this.form.userName);
          if (
            this.form.userName == this.teaData[i].teacherId &&
            this.form.idCard == this.teaData[i].identity
          ) {
            this.isUser = true;
            break;
          }
        }
      }
    },

    //登录失败返回信息并且清空表单
    failLogin(mes) {
      this.$message({
        message: mes,
        type: "warning"
      });
      this.$refs.form.resetFields();
      this.refreshCode();
    },

    //保存
    save() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.form.mycode == this.code) {
            this.vertify();
            if (this.isUser) {
              //提交修改后的表单然后显示修改成功
              // var obj = {
              //   username = this.form.userName;
              //   password = this.form.newPassword;
              // };
              // console.log(obj);
              // postData("接口",obj).then(response => {
              //   if(response.status == 200) {
              //     this.$message({
              //       message: "修改成功！",
              //       type: "success"
              //     })
              //   }else {
              //     this.$message({
              //       message: "修改失败！",
              //       type: "error"
              //     })
              //   }
              // })
              this.$message({
                message: "修改成功！",
                type: "success"
              });
              this.isUser = false;

              // 跳到下一个界面
              this.gotolink();
            } else {
              this.failLogin("用户不存在或身份证号错误！");
            }
          } else {
            this.failLogin("验证码错误！");
          }
        } else {
          this.failLogin("请检查您的输入！");
        }
      });
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