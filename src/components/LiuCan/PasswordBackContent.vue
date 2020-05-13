<template>
  <div id="passbackContent">
    <div id="passbackInformation">
      <el-form ref="formRef" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="学/职工号：" prop="userId">
          <el-input v-model="form.userId" maxlength="10"></el-input>
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
          <div id="codeBlock" @click="refreshCode()">
            <s-identify :fresh="flag" @makedCode="getMakedCode"></s-identify>
          </div>
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
      var checkUserId = (rule, value, callback) => {
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
        userData: [], //用户信息
        isUser: false,//是否为用户
        //输入检查规则
        rules: {
          userId: [
            { required: true, message: "请输入学号或职工号", trigger: "blur" },
            { max: 10, min: 5, message: "学号或教职工号最少5位" },
            { validator: checkUserId, trigger: "blur" }
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
            {
              required: true,
              message: "请输入验证码",
              trigger: "blur"
            },
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
      getData() {
        console.log("要开始获取数据了哦");
        this.$http
          .get("../../static/user.json")
          .then(res => {
            console.log(res.data);
            this.userData = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      },

      //验证是否为用户
      vertify() {
        for (var i = 0; i < this.userData.length; i++) {
          console.log(this.userData[i].userId);
          console.log(this.form.userId);
          if (
            this.form.userId == this.userData[i].userId &&
            this.form.idCard == this.userData[i].identity
          ) {
            this.isUser = true;
            break;
          }
        }
      },

      //登录失败返回信息并且清空表单
      failLogin(mes) {
        this.$message({
          message: mes,
          type: "warning"
        });
        this.$refs.formRef.resetFields();
        this.refreshCode();
      },

      //保存
      save() {
        this.$refs.formRef.validate(valid => {
          if (valid) {
            if (this.form.mycode == this.code) {
              this.vertify();
              if (this.isUser) {
                // 提交修改后的表单然后显示修改成功

                //  axios
                // .post(url, this.editObj)
                // .then(function(response) {
                //   console.log(response);
                //   alert(msg);
                //   this.getData();
                // })
                // .catch(function(error) {
                //   console.log(error);
                // });
                this.$message({
                  message: "修改成功！",
                  type: "success"
                });
                this.isUser = false;

                // 跳回登录界面
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
        console.log("code" + code);
        console.log("getMakedCode:", this.code);
      }
    }
  };
</script>

<style scoped>
  @import "../../assets/css/Login.css";
</style>
