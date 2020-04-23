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
        <div id="inputForm">
          <form>
            <!-- 用户名 -->
            <div>
              <input
                class="inputStyle setWidth setHeight"
                maxlength="10"
                v-model="userName"
                type="text"
                placeholder="请输入用户名"
              />
            </div>
            <label style="color:red;" v-if="ifName">请输入用户名!</label>
            <!-- 密码 -->
            <div>
              <input
                class="inputStyle setWidth setHeight"
                v-model="password"
                type="text"
                maxlength="10"
                placeholder="请输入密码"
              />
              <label style="color:red;" v-if="ifPass">请输入密码!</label>
            </div>
            <div>
              <!-- 验证码 -->
              <input
                type="input"
                class="inputStyle setHeight"
                placeholder="请输入验证码"
                maxlength="4"
                v-model="mycode"
                style="width：170px"
              />
              <s-identify
                class="code"
                @click="refreshCode()"
                :fresh="flag"
                @makedCode="getMakedCode"
              ></s-identify>
            </div>
            <!-- 单选框 -->
            <div id="chooseIdentify">
              <input type="radio" value="教师" v-model="identity" style="zoom:120%;margin-left:30px;" />教师
              <input
                type="radio"
                value="学生"
                v-model="identity"
                style="zoom:120%;margin-left:85px;"
              />学生
            </div>
            <label style="color:red;" v-if="ifIdentity">请选择身份!</label>

            <!-- 登录按钮 -->
          </form>
          <div>
            <button type="submit" class="auth_login_btn" @click="login()">登录</button>
          </div>
          <!-- 忘记密码 -->
          <label @click="gotolink" style="float:right;color:#169BD5;margin-top:5px;">
            <small>忘记密码</small>
          </label>
        </div>
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
      userName: "", //用户名
      password: "", //密码
      identity: "", //获取到的用户身份
      flag: true, //该值变化，就会触发验证码刷新
      code: "", //刷新后的验证码
      mycode: "", //用户输入的验证码
      loginData: [], //获取到的json数据
      isUser: false, //判断是否存在这个用户
      ifName: false,
      ifPass: false,
      ifIdentity: false
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

    vertify() {
      console.log(this.userName);
      for (var i = 0; i < this.loginData.length; i++) {
        console.log(this.loginData[i].name);
        if (this.userName == this.loginData[i].name) {
          if (
            this.password == this.loginData[i].password &&
            this.identity == this.loginData[i].identity
          ) {
            this.isUser = true;
            break;
          }
        }
      }
    },

    checkNull() {
      this.ifName = false;
      this.ifPass = false;
      this.ifIdentity = false;
      if (this.userName == "") {
        this.ifName = true;
        return flase;
      } else if (this.password == "") {
        this.ifPass = true;
        return flase;
      } else if (this.identity == "") {
        this.ifIdentity = true;
        return flase;
      } else {
        return true;
      }
    },
    //登录
    login() {
      if (this.checkNull()) {
        this.vertify();
        if (this.mycode == this.code && this.isUser) {
          alert("登陆成功！");
          // 跳到下一个界面
          if (this.identity == "学生") {
            //this.$router.replace("/stu");
          } else {
            //this.$router.replace("/tea");
          }
        } else {
          alert("登录失败！");
          this.isUser = false;
          this.password = "";
          this.userName = "";
          this.mycode = "";
          this.refreshCode();
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