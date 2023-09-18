import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import layout from '@/layout/index.vue'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    //hidden:true————不显示在侧边导航栏里
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    meta: { title: '我的主页', icon: 'el-icon-s-home' },
    redirect: '/dashboard',
    children: [
      {
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/admin/home/index.vue'),
      meta: { title: '仪表盘', icon: 'dashboard' }
    },
    {
      path: 'userInfo',
      name: 'UserInfo',
      component: () => import('@/views/admin/home/userInfo.vue'),
      meta: { title: '个人信息', icon: 'el-icon-user-solid' }
    }
    ]
  },

  {
    path: '/verify',
    component: Layout,
    redirect: '/overview',
    name: 'Verify',
    meta: { title: '内容审核', icon: 'el-icon-s-platform' },
    children: [
      {
        path: 'reportReview',
        name: 'ReportReview',
        component: () => import('@/views/admin/verify/reportReview.vue'),
        meta: { title: '举报信息审核', icon: 'el-icon-warning' }
      },
      {
        path: 'newsReview',
        name: 'NewsReview',
        component: () => import('@/views/admin/verify/newsReview.vue'),
        meta: { title: '公告信息审核', icon: 'el-icon-s-comment' }
      }
    ]
  },

  {
    path: '/manage',
    component:layout,
    redirect: '/manage/userManage',
    name:'Manage',
    meta: {title: '系统管理',icon: 'el-icon-s-cooperation'},
    children: [
      {
        path: 'userManage',
        name:'UserManage',
        component: () => import('@/views/admin/manage/user.vue'),
        meta: {title: '用户管理',icon: 'el-icon-user-solid'}
      },
      {
        path: 'orderManage',
        name:'OrderManage',
        component: () => import('@/views/admin/manage/order.vue'),
        meta: {title: '订单管理',icon: 'el-icon-s-order'}
      },
      {
        path: 'questionManage',
        name:'QuestionManage',
        component: () => import('@/views/admin/manage/question.vue'),
        meta: {title: '论坛管理',icon: 'el-icon-s-comment'}
      }

    ]
  },

  {
    path: 'https://www.google.com',
    component: Layout,
    meta: {title: 'Github仓库',icon: 'el-icon-coin'},

  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
