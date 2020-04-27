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

        <el-form :model="form" :rules="rules" ref="form" label-width="100px">
          <!-- 用户名 -->
          <el-form-item label="学号：" prop="userName" style="padding-top:0px;">
            <el-input
              v-model="form.userName"
              size="medium"
              placeholder="请输入用户名"
              style="width:300px;"
              prefix-icon="el-icon-user"
              maxlength="10"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password" style="padding-top:0px;">
            <el-input
              v-model="form.password"
              size="medium"
              placeholder="请输入密码"
              prefix-icon="el-icon-key"
              style="width:300px;"
              maxlength="10"
            ></el-input>
          </el-form-item>
          <el-form-item label="验证码：" prop="mycode" style="padding-top:0px;">
            <el-input
              v-model="form.mycode"
              size="medium"
              maxlength="4"
              placeholder="请输入验证码"
              style="width:150px;"
            ></el-input>
            <s-identify
              class="code"
              @click="refreshCode()"
              :fresh="flag"
              @makedCode="getMakedCode"
              style="margin-right:132px;float:right;margin-top:2px"
            ></s-identify>
          </el-form-item>
          <!-- 单选框 -->
          <div id="chooseIdentify">
            <input
              type="radio"
              name="status"
              value="教师"
              v-model="form.identity"
              checked="checked"
              @select="getdata()"
              style="margin-left:100px;"
            />教师
            <input
              type="radio"
              name="status"
              value="学生"
              @select="getdata()"
              v-model="form.identity"
              style="margin-left:85px;"
            />学生
          </div>
          <el-form-item style="padding-top:0px;height:30px">
            <el-button type="submit" size="small" class="auth_login_btn" @click="login()">登录</el-button>
          </el-form-item>
        </el-form>

        <label @click="gotolink" style="color:#169BD5;margin-top:0px;padding-left:350px;">
          <small>忘记密码</small>
        </label>
      </div>
    </div>
  </div>
</template>


<script>
import Code from "./Code";

export default {
  name: "LoginContent",
  components: {
    "s-identify": Code
  },
  data() {
    var checkUserName = (rule, value, callback) => {
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
        userName: "", //用户名
        password: "", //密码
        identity: "", //获取到的用户身份
        mycode: "" //用户输入的验证码
      },

      flag: true, //该值变化，就会触发验证码刷新
      code: "", //刷新后生成的验证码
      loginData: [], //获取到的json数据
      teaData: [], //老师信息
      stuData: [], //学生信息
      isUser: false, //判断是否存在这个用户
      isTeacher: false, //判断是否为老师
      //输入规则
      rules: {
        userName: [
          { required: true, validator: checkUserName, trigger: "blur" },
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

      //如果登陆成功了，记录当前的用户
      currentUser: ""
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

    //登录失败返回信息并且清空表单
    failLogin(mes) {
      this.$message({
        message: mes,
        type: "warning"
      });
      this.$refs.form.resetFields();
      this.refreshCode();
    },

    //登录
    login() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.form.mycode == this.code) {
            if (this.form.identity == "教师") {
              this.teacherLogin();
            } else if (this.form.identity == "学生") {
              this.studentLogin();
            } else {
              this.failLogin("未选择身份！");
            }
          } else {
            this.failLogin("验证码错误！");
          }
        } else {
          this.failLogin("请检查输入格式是否正确！");
        }
      });

      if (this.isUser) {
        this.$message({
          message: "登陆成功！",
          type: "success"
        });
        this.isUser = false;

        //alert("登陆成功！");
        this.currentUser = this.form.userName;
        // 跳到下一个界面
        if (this.isTeacher) {
          //跳到老师

          this.isTeacher = false;
        } else {
          //跳到学生
        }
      } else {
        console.log("llll");
        console.log(this.loginData);
        this.failLogin("登录失败！");
      }
    },
    //获取老师的数据并判断是否一致
    teacherLogin() {
      for (var i = 0; i < this.teaData.length; i++) {
        console.log(this.teaData[i].teacherId);
        if (this.form.userName == this.teaData[i].teacherId) {
          if (this.form.password == this.teaData[i].password) {
            this.isUser = true; //如果信息匹配那么设置isUser为真
            this.isTeacher = true;
            break;
          }
        }
      }
    },
    //获取学生的数据并判断是否一致
    studentLogin() {
      for (var i = 0; i < this.stuData.length; i++) {
        if (this.form.userName == this.stuData[i].stuId) {
          if (this.form.password == this.stuData[i].password) {
            this.isUser = true; //如果信息匹配那么设置isUser为真
            break;
          }
        }
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