import Vue from 'vue'
import Router from 'vue-router'
import Evaluate from '@/components/EvaluateManagement/Evaluate'
import EvaluateDetail from '@/components/EvaluateManagement/EvaluateDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Evaluate',
      component: Evaluate
    },

    // 评价传参路由信息
    {
      path: '/EvaluateDetail/',
      name: 'EvaluateDetail',
      component: EvaluateDetail
    }
  ]
})
