import Vue from 'vue'
import Router from 'vue-router'
import Management from '@/components/archivesManagement/Management'
import AddArchives from '@/components/archivesManagement/AddArchives'
import EditArchives from '@/components/archivesManagement/EditArchives'
import DelArchives from '@/components/archivesManagement/DelArchives'
import MContentAdd from '@/components/archivesManagement/MContentAdd'

// const loginpage = resolve => require(['@/components/Login'],resolve)

Vue.use(Router)

let router =  new Router({
  routes: [
    {
      path: '/',
      redirect: "/api/document"
    },
    {
      path: '/api/document',
      name: 'Management',
      component: Management
    },
    {
      path: '/api/document/add',
      name: 'AddArchives',
      component: AddArchives
    },
    {
      path: '/api/document/edit',
      name: 'EditArchives',
      component: EditArchives
    },
    {
      path: '/api/document/del',
      name: 'DelArchives',
      component: DelArchives
    }
  ]
})

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

//对每次访问之前都要先看是否已经登录
// router.beforeEach((to,from,next)=>{
//     if(to.path.startsWith('/login')){
//         window.sessionStorage.removeItem('access-token');
//         next();
//     }else{
//         let token = window.sessionStorage.getItem('access-token');
//         if(!token){
//             //未登录  跳回主页面
//             next({path:'/login'});
//         }else{
//             next();
//         }
//     }
// });

export default router
