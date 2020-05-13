import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    // 用于存放公共数据
    loginData: [
      {
        // 学生
        userNum: '未登录',
        token: false //用于存储用户的登录状态，true表示登录成功
      },
      {
        // 教师
        userNum: '未登录',
        token: false
      }
    ]
  }
});
export default store;
