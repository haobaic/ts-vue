import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout/index.vue'

Vue.use(VueRouter)

/**
* hidden: true                   如果hidden为true则在左侧菜单栏展示，否则不显示
* name:'router-name'             路由名称，必须填写
* meta : {
    title: 'title'               对应路由在左侧菜单栏的标题名称
    icon: 'icon-class'           对应路由在左侧菜单栏的图标样式，样式使用element图标库
  }
**/
export const asyncRouterMap=[
  {
    path: '/',
    name: 'dashboard',
    component: Layout,
    hidden:true,
    redirect:"/home",
    children: [
      {
        path: '/home',
        name: 'home',
        meta: { title: '首页', icon: 'el-icon-s-home' },
        component: () => import('@/views/Home.vue')
      }
    ]
  }, {
    path: '/dataManage',
    name: 'dataManage',
    component: Layout,
    hidden: true,
    meta: { title: '数据管理', icon: 'el-icon-coin' },
    redirect: '/tableData',
    children: [
      {
        path: '/tableData',
        name: 'tableData',
        meta: { title: '表格管理', icon: 'el-icon-s-grid' },
        component: () => import('@/views/DataManage/TableData.vue')
      },{
        path: '/chartsData',
        name: 'chartsData',
        meta: { title: '图表管理', icon: 'el-icon-picture-outline' },
        component: () => import('@/views/DataManage/ChartsData.vue')
      },{
        path: '/formData',
        name: 'formData',
        meta: { title: '表单管理', icon: 'el-icon-document' },
        component: () => import('@/views/DataManage/FormData.vue')
      }
    ]
  },{
    path: '/userManage',
    name: 'userManage',
    component: Layout,
    hidden: true,
    redirect: '/accountData',
    children: [
      {
        path: '/accountData',
        name: 'accountData',
        meta: { title: '账户管理', icon: 'el-icon-notebook-1' },
        component: () => import('@/views/UserManage/AccountData.vue')
      }
    ]
  },{
    path: '/user',
    component: Layout,
    hidden: false,
    redirect: '/userInfo',
    children: [
      {
        path: '/userInfo',
        name: 'userInfo',
        meta: { title: '个人中心' },
        component: () => import('@/views/UserManage/UserInfo.vue')
      }
    ]
  },{
    path: '/404',
    name: '404',
    hidden: false,
    meta: { title: '404' },
    component: () => import('@/views/404.vue')
  },{
    path: '*',
    redirect: '/404'
  },{
    path: '/login',
    name: 'login',
    hidden: false,
    meta: { title: '系统登录' },
    component:  () => import(/* webpackChunkName: "Login" */ '@/views/Login/Login.vue')
  },
  {
    path: '/password',
    name: 'password',
    hidden: false,
    meta: { title: '找回密码' },
    component:  () => import(/* webpackChunkName: "Login" */ '@/views/Login/Password.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:asyncRouterMap
})
router.beforeEach((to:any,form:any,next:any)=>{
  const isLogin=localStorage.tsToken?true:false;
  if(to.path=="/login"||to.path=="/password"){
    next()
  }else{
    isLogin?next():next("/login")
  }
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location:any){
	return originalPush.call(this, location).catch(err => err);
}
export default router
