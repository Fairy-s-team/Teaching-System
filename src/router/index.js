import Vue from 'vue'
import Router from 'vue-router'
import Management from '@/components/archivesManagement/Management'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Management',
      component: Management
    }
  ]
})
