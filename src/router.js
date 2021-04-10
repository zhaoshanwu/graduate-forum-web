import Vue from 'vue'
import Router from 'vue-router'
import frontLogin from './views/front/Login.vue'
import frontHome from './views/front/Home.vue'
import frontUser from './views/front/User.vue'
import frontPost from './views/front/Post.vue'
import frontIssuePost from './views/front/IssuePost.vue'

import adminHome from './views/admin/Home.vue'
import adminLogin from './views/admin/Login.vue'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      redirect: '/front_login'
    },
    {
      path: '/front_login',
      name: 'front_login',
      component: frontLogin,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/front_home',
      name: 'front_home',
      component: frontHome,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/front_issuePost',
      name: 'front_issuePost',
      component: frontIssuePost,
      meta: {
        title: '发帖'
      }
    },
    {
      path: '/front_user',
      name: 'front_user',
      component: frontUser,
      meta: {
        title: '个人中心'
      }
    },
    {
      path: '/front_post',
      name: 'front_post',
      component: frontPost,
      meta: {
        title: '帖子'
      }
    },
    {
      path: '/admin_home',
      name: 'admin_home',
      component: adminHome,
      meta: {
        title: '诗词论坛后台登录'
      }
    },
    {
      path: '/admin_login',
      name: 'admin_login',
      component: adminLogin,
      meta: {
        title: '后台管理'
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
})

// 挂载路由导航守卫
// router.beforeEach((to, from, next) => {
//   // to 将要访问的路径
//   // from 从哪个路径访问而来
//   // next 是一个函数，表示放行
//   // next() 放行  next('/login') 强制跳转
//   if (to.path === '/login') return next()
//   // 获取用户ID
//   const userId = window.sessionStorage.getItem('userId')
//   if (!userId) {
//     return next('/login')
//   } else {
//     next()
//   }
// })

export default router