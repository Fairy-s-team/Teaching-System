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
                v-model="userName"
                type="text"
                placeholder="请输入用户名"
              />
            </div>
            <!-- 密码 -->
            <div>
              <input
                class="inputStyle setWidth setHeight"
                v-model="password"
                type="text"
                placeholder="请输入密码"
              />
            </div>
            <div>
              <!-- 验证码 -->
              <input
                type="input"
                class="inputStyle setHeight"
                placeholder="请输入验证码"
                v-model="mycode"
                style="width：170px"
              />
              <s-identify class="code" @click="refreshCode" :fresh="flag" @makedCode="getMakedCode"></s-identify>
            </div>
            <!-- 单选框 -->
            <div id="chooseIdentify">
              <input type="radio" name="identity" value="教师" style="zoom:120%;margin-left:30px;" />教师
              <input
                type="radio"
                name="identity"
                value="学生"
                checked="checked"
                style="zoom:120%;margin-left:85px;"
              />学生
            </div>
            <!-- 登录按钮 -->
            <div>
              <button type="submit" class="auth_login_btn" @click="login()">登录</button>
            </div>
            <!-- 忘记密码 -->
            <small @click="gotolink" style="float:right;color:#169BD5;margin-top:5px;">忘记密码</small>
          </form>
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
      userName: "",
      password: "",
      identity: "", //获取到的用户身份
      flag: true, //该值变化，就会触发验证码刷新
      code: "", //刷新后的验证码
      mycode: "" //用户输入的验证码
    };
  },
  mounted() {
    this.flag = !this.flag;
  },
  methods: {
    //忘记密码去到忘记密码页面
    gotolink() {
      this.$router.replace("/passwordback");
    },
    //登录
    login() {},
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



<style>
#loginContent {
  width: 100%;
  height: 500px;
  margin-top: 0px;
}

#bottom_color {
  background-color: #8ba1b2;
  background: rbga(138, 161, 178, 1);
  filter: "progid:DXImageTransform.Microsoft.gradient(startcolorstr=#7F000000,endcolorstr=#7F000000)";
  width: 1200px;
  height: 450px;
  padding: 0px;
  margin: 135px auto;
}

#book {
  height: 270px;
  width: 180px;
  opacity: 1;
  margin-top: 95px;
  margin-left: 180px;
  float: left;
  border-radius: 5px;
}
#information {
  width: 480px;
  height: 350px;
  background-color: white;
  margin-top: 50px;
  margin-left: 150px;
  position: relative;
  float: left;
  border-radius: 5px;
  box-shadow: 5px 5px 5px 0 #8ba1b2;
}

#inputForm {
  position: relative;
  width: 300px;
  height: 270px;
  margin-left: 90px;
  /* background-color: red; */
}

#logLabel {
  font-size: 20px;
  text-align: center;
}

.inputStyle {
  border-radius: 10px;
  border-style: solid;
  border-width: 1px;
  border-color: #ccc;
  margin-top: 10px;
  position: relative;
}

.setWidth {
  width: 300px;
}

.setHeight {
  height: 30px;
}
#chooseIdentify {
  width: 300px;
  height: 30px;
  margin-top: 10px;
}

.setVertify {
  position: absolute;
  top: 90px;
  left: 200px;
  width: 100px;
  border-style: solid;
  border-width: 1px;
  border-color: #ccc;
  margin-top: 10px;
}

.auth_login_btn {
  color: black;
  font-size: 20px;
  border-radius: 3px;
  border: 1px solid;
  width: 300px;
  border-color: #ccc;
  border-radius: 10px;
  background-color: transparent;
}

.code {
  float: right;
  margin-right: 70px;
  margin-top: 10px;
  width: 60px;
  height: 30px;
}
</style>