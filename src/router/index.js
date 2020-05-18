import Vue from 'vue'
import Router from 'vue-router'
import Management from '@/components/archivesManagement/Management'
import AddArchives from '@/components/archivesManagement/AddArchives'
import EditArchives from '@/components/archivesManagement/EditArchives'
import DelArchives from '@/components/archivesManagement/DelArchives'
import MContentAdd from '@/components/archivesManagement/MContentAdd'
import Login from '@/components/Login/Login'
import PasswordBack from '@/components/Login/PasswordBack'
import Evaluate from '@/components/EvaluateManagement/Evaluate'
import EvaluateDetail from '@/components/EvaluateManagement/EvaluateDetail'
import NormalTeacher from '@/components/NormalTeacher/NormalTeacher'
import NormalTeacherRank from '@/components/NormalTeacher/NormalTeacherRank'
import store from '../store'
// const loginpage = resolve => require(['@/components/Login'],resolve)

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      redirect: "/api/user"
    },
    {
      path: '/api/user',
      name: 'Login',
      component: Login
    },
    {
      path: '/passwordback',
      name: 'PasswordBack',
      component: PasswordBack
    },
    {
      path: '/api/document',
      name: 'Management',
      component: Management,
      meta: {
        // 路由拦截
        requireAuth: true,
      },
    },
    {
      path: '/api/document/add',
      name: 'AddArchives',
      component: AddArchives,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/api/document/edit',
      name: 'EditArchives',
      component: EditArchives,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/api/document/del',
      name: 'DelArchives',
      component: DelArchives,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/api/rank',
      name: 'Rank',
      component: Evaluate,
      meta: {
        requireAuth: false,
      },
    },
    {
      path: '/rank/detail',
      name: 'RankDetail',
      component: EvaluateDetail,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/api/normalteacher',
      name: 'NormalTeacher',
      component: NormalTeacher,
      meta: {
        requireAuth: false,
      },
    },
    {
      path: '/api/myRank',
      name: 'NormalTeacherRank',
      component: NormalTeacherRank,
      meta: {
        requireAuth: false,
      },
    }
  ]
})

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 路由拦截：对每次访问之前都要先看是否已经登录
router.beforeEach((to, from, next) => {
  // 判断该路由是否需要登录权限
  if (to.meta.requireAuth) {
    // 查询本地存储信息是否已经登录
    if (store.state.loginData.token === true) {
      next();
    }
    else {
      // 未登录跳转至登录页面
      next({
        path: '/api/user'
      })
    }
  } else {
    next();
  }
})

export default router
