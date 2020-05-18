// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'font-awesome/css/font-awesome.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import store from './store/index';
import echarts from "echarts"

Vue.prototype.$echarts = echarts
Vue.prototype.$http = axios

// 设置反向代理，前端请求默认发送到 http://localhost:8081/
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8081/'

Vue.use(ElementUI)
Vue.use(store)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
