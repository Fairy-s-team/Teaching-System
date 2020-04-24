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
          <el-form-item label="用户名：" prop="userName" style="padding-top:0px;">
            <el-input
              v-model="form.userName"
              size="medium"
              placeholder="请输入用户名"
              style="width:300px;"
              prefix-icon="el-icon-user"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password" style="padding-top:0px;">
            <el-input
              v-model="form.password"
              size="medium"
              placeholder="请输入密码"
              prefix-icon="el-icon-key"
              style="width:300px;"
            ></el-input>
          </el-form-item>
          <el-form-item label="验证码：" prop="mycode" style="padding-top:0px;">
            <el-input v-model="form.mycode" size="medium" placeholder="请输入验证码" style="width:150px;"></el-input>
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
              style="margin-left:100px;"
            />教师
            <input
              type="radio"
              name="status"
              value="学生"
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
      isUser: false, //判断是否存在这个用户
      rules: {
        userName: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
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
      console.log("要开始获取数据了哦");
      this.$http
        .get("../../static/login.json")
        .then(res => {
          console.log(res.data);
          this.loginData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //验证
    vertify() {
      console.log(this.form.userName);
      for (var i = 0; i < this.loginData.length; i++) {
        console.log(this.loginData[i].name);
        if (this.form.userName == this.loginData[i].name) {
          if (
            this.form.password == this.loginData[i].password &&
            this.form.identity == this.loginData[i].identity
          ) {
            this.isUser = true;
            break;
          }
        }
      }
    },
    //检查输入框是否为空

    //登录
    login() {
      this.vertify();
      if (this.form.mycode == this.code && this.isUser) {
        this.$message({
          message: "登陆成功！",
          type: "success"
        });
        //alert("登陆成功！");
        this.currentUser = this.form.userName;
        // 跳到下一个界面
        if (this.form.identity == "学生") {
          //this.$router.replace("/stu");
        } else {
          //this.$router.replace("/tea");
        }
      } else {
        this.$message({
          message: "登录失败！",
          type: "warning"
        });
        //  alert("登录失败！");
        this.isUser = false;
        this.form.password = "";
        this.form.userName = "";
        this.form.mycode = "";
        this.refreshCode();
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