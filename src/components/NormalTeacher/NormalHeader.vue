<template>
  <div id="header">
    <div class="FormBlock">
      <div id="signOut">
        <el-popconfirm title="确定要退出吗？" @onConfirm="signOutEvent">
          <el-button slot="reference" type="text" id="signOutBtn">
            <i class="fa fa-sign-out"></i>
          </el-button>
        </el-popconfirm>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from '@/store';

export default {
  name: "NormalHeader",

  data() {
    return {};
  },

  methods: {
    signOutEvent() {
      // 退出登录
      store.state.loginData.userId = '未登录',
      store.state.loginData.token = false,
      this.$router.replace("/api/user");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../assets/css/normalteacher.css";
</style>
