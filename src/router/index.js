import Vue from 'vue'
import Router from 'vue-router'
import Evaluate from '@/components/EvaluateManagement/Evaluate'
import EvaluateDetail from '@/components/EvaluateManagement/EvaluateDetail'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      redirect: "/api/rank"
    },
    {
      path: '/api/rank',
      name: 'Rank',
      component: Evaluate
    },
    {
      path: '/rank/detail',
      name: 'RankDetail',
      component: EvaluateDetail
    }
  ]
})

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
