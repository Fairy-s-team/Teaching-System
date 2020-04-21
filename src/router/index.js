import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/LiuCan/Login'
import PasswordBack from '@/components/LiuCan/PasswordBack'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/passwordback',
      name: 'PasswordBack',
      component: PasswordBack
    }
  ]
})


