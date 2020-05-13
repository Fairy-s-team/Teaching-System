<template>
  <!-- 页面内容 -->
  <div id="loginContent">
    <!-- 遮罩层 -->
    <div id="bottom_color">
      <!-- 页面书图片 -->
      <div id="book">
        <img src="../../assets/book.png"/>
      </div>
      <!-- 登录 -->
      <div id="information">
        <p id="logLabel">用户登录</p>

        <el-form :model="form" :rules="rules" ref="form" label-width="100px" id="form">
          <!-- 用户名 -->
          <el-row>
            <el-col :span="20" :offset="1">
              <el-form-item label="用户名：" prop="idNum">
                <el-input
                  v-model="form.idNum"
                  size="medium"
                  placeholder="请输入学号/教职工号"
                  prefix-icon="el-icon-user"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 密码 -->
          <el-row>
            <el-col :span="20" :offset="1">
              <el-form-item label="密码：" prop="password">
                <el-input
                  v-model="form.password"
                  size="medium"
                  placeholder="请输入密码"
                  prefix-icon="el-icon-key"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 验证码 -->
          <el-row>
            <el-col :span="20" :offset="1">
              <el-form-item label="验证码：" prop="mycode">
                <el-col :span="12">
                  <el-input v-model="form.mycode" size="medium" placeholder="请输入验证码"></el-input>
                </el-col>
                <el-col :span="10" :offset="2">
                  <div @click="refreshCode()">
                    <s-identify
                      class="code"
                      :fresh="flag"
                      @makedCode="getMakedCode"
                    ></s-identify>
                  </div>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 单选框 -->
          <el-row class="radioRow">
            <el-col :span="20" :offset="1">
              <el-form-item prop="identity">
                <el-col :span="12">
                  <el-radio
                    label="0"
                    v-model="form.identity"
                  >教师
                  </el-radio>
                </el-col>
                <el-col :span="12">
                  <el-radio
                    label="1"
                    v-model="form.identity"
                  >学生
                  </el-radio>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="btnRow">
            <el-col :span="20" :offset="1">
              <el-form-item>
                <el-button plain class="auth_login_btn" @click="login()">登录</el-button>
              </el-form-item>
              <label @click="gotolink" id="forgetBtn">
                <small>忘记密码</small>
              </label>
            </el-col>
          </el-row>
        </el-form>
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
      return {
        form: {
          idNum: "", //学号或教职工号
          password: "", //密码
          identity: "", //获取到的用户身份  【教师0  学生1】
          mycode: "" //用户输入的验证码
        },
        flag: true, //该值变化，就会触发验证码刷新
        code: "", //刷新后生成的验证码
        loginData: [], //获取到的json数据
        isUser: false, //判断是否存在这个用户
        rules: {
          idNum: [
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
        console.log(this.form.idNum);
        for (var i = 0; i < this.loginData.length; ++i) {
          console.log(this.loginData[i].idNum);
          if (this.form.idNum == this.loginData[i].idNum) {
            let pwd = this.loginData[i].password;
            let loginPwd = this.form.password
            let idRank = this.form.identity;
            let loginIdRank = this.loginData[i].identity;
            if (pwd == loginPwd && idRank == loginIdRank) {
              this.isUser = true;
            } else {
              this.isUser = false;
            }
            break;
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
          if (this.form.identity == "1") {
            // 学生---更新store存储用户的登录信息和状态
            store.state.loginData[0].userNum = this.form.idNum;
            store.state.loginData[0].token = true;
            this.$router.replace("/api/rank");
          } else if (this.form.identity == "0") {
            // 教师---更新store存储用户的登录信息和状态
            store.state.loginData[1].userNum = this.form.idNum;
            store.state.loginData[1].token = true;
            this.$router.replace("/api/document");
          }
        } else if (this.form.mycode != this.code) {
          this.$message({
            message: "验证码错误，请重新登录！",
            type: "warning"
          });
          this.form.mycode = "";
          this.refreshCode();
        } else {
          this.$message({
            message: "密码错误或没有该用户，请重新登录！",
            type: "warning"
          });
          this.isUser = false;
          this.form.password = "";
          this.form.idNum = "";
          this.form.identity = "";
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
