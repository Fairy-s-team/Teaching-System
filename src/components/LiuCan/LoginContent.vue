<template>
  <!-- 页面内容 -->
  <div id="loginContent">
    <!-- 遮罩层 -->
    <div id="bottom_color">
      <!-- 页面书图片 -->
      <div id="book">
        <img src="../../assets/book.png" />
      </div>
      <!-- 登录 -->
      <div id="information">
        <p id="logLabel">用户登录</p>

        <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
          <!-- 用户名 -->
          <el-form-item label="学号：" prop="userId" class="toTop">
            <el-input
              v-model="form.userId"
              size="medium"
              placeholder="请输入职工号/学号"
              style="width:300px;"
              prefix-icon="el-icon-user"
              maxlength="10"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password" class="toTop">
            <el-input
              v-model="form.password"
              size="medium"
              placeholder="请输入密码"
              prefix-icon="el-icon-key"
              style="width:300px;"
              maxlength="10"
            ></el-input>
          </el-form-item>
          <el-form-item label="验证码：" prop="mycode" class="toTop">
            <el-input
              v-model="form.mycode"
              size="medium"
              maxlength="4"
              placeholder="请输入验证码"
              style="width:150px;"
            ></el-input>
            <div class="code" @click="refreshCode()">
              <s-identify
                :fresh="flag"
                @makedCode="getMakedCode"
                style="margin-right:132px;float:right;margin-top:2px"
              ></s-identify>
            </div>

            <el-button type="submit" size="small" class="auth_login_btn" @click="login()">登录</el-button>
          </el-form-item>
        </el-form>
        <label @click="gotolink" id="forgetPassLabel">
          <small>忘记密码</small>
        </label>
      </div>
    </div>
  </div>
</template>


<script>
  import Code from "./Code";
  import store from '@/store';

  export default {
    name: "LoginContent",
    components: {
      "s-identify": Code
    },
    data() {
      var checkUserId = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("请输入学号/教职工号"));
        } else {
          var numberReg = /^[0-9]*$/;
          if (!numberReg.test(value)) {
            callback(new Error("学号或职工号只能为数字！"));
          } else {
            callback();
          }
        }
      };

      var checkPassword = (rule, value, callback) => {
        var noChangeReg = /^[0-9]*$/;
        var hasChangeReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/;
        if (!noChangeReg.test(value) && !hasChangeReg.test(value)) {
          callback(new Error("密码输入格式有误"));
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
          userId: "", //学号或教职工号
          password: "", //密码
          mycode: "" //用户输入的验证码
        },
        flag: true, //该值变化，就会触发验证码刷新
        code: "", //刷新后生成的验证码

        userData: [], //获取到的json数据
        isUser: false, //判断是否存在这个用户

        //输入规则
        rules: {
          userId: [
            { required: true, validator: checkUserId, trigger: "blur" },
            { max: 10, min: 5, message: "学号或教职工号最少5位" }
          ],
          password: [
            { required: true, message: "请输入密码！", trigger: "blur" },
            { max: 10, message: "密码长度不超过10位！" },
            { validator: checkPassword, trigger: "blur" }
          ],
          mycode: [
            { required: true, message: "请输入验证码!", trigger: "blur" },
            { validator: checkVertify, trigger: "blur" }
          ]
        },

        //如果登陆成功了，获取当前的用户，用于判断
        currentUser: {
          userId: "",
          status: ""
        }
      };
    },
    mounted() {
      this.flag = !this.flag;
      this.getData();
    },
    methods: {
      //忘记密码去到忘记密码页面
      gotolink() {
        this.$router.replace("/passwordback");
      },
      //获取json数据
      getData() {
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

      //登录失败返回信息并且清空表单
      failLogin(mes) {
        this.$message({
          message: mes,
          type: "warning"
        });
        this.$refs.formRef.resetFields();
        this.refreshCode();
      },

      //登录
      login() {
        this.$refs.formRef.validate(valid => {
          if (valid) {
            if (this.form.mycode == this.code) {
              for (var i = 0; i < this.userData.length; i++) {
                if (
                  this.form.userId == this.userData[i].userId &&
                  this.form.password == this.userData[i].password
                ) {
                  this.currentUser.userId = this.userData[i].userId;
                  this.currentUser.status = this.userData[i].status;
                  this.isUser = true; //如果信息匹配那么设置isUser为真
                  break;
                }
              }
            } else {
              this.failLogin("验证码错误！");
            }
          } else {
            this.failLogin("请检查输入格式是否正确！");
          }
        });

        //是用户就跳到下一界面
        if (this.isUser) {
          this.$message({
            message: "登录成功！",
            type: "success"
          });
          //重置isUser
          this.isUser = false;

          // 更新store存储用户的登录信息和状态
          store.state.loginData.userId = this.currentUser.userId;
          store.state.loginData.token = true;

          // 跳到下一个界面，老师到老师，学生到学生，管理员。。。。
          if (this.currentUser.status == "教师") {
            console.log("即将跳到教师界面");
            this.$router.push("/api/document");
          } else if (this.currentUser.status == "学生") {
            console.log("即将跳到学生界面");
            this.$router.push("/api/rank");
          } else {
            console.log("即将跳到管理员界面");
            // ------------------ 这里需要补充跳转 -------------------

          }
        } else {
          this.failLogin("登录失败！");
        }
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
