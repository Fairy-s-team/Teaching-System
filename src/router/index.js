import Vue from 'vue'
import Router from 'vue-router'
import Evaluate from '@/components/Evaluate/Evaluate'
import EvaluateDetail from '@/components/Evaluate/EvaluateDetail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Evaluate',
      component: Evaluate
    },
    // 路由信息
    {
      path: '/EvaluateDetail/:teaName/:couName',
      name: 'EvaluateDetail',
      component: EvaluateDetail
    }
  ]
})
