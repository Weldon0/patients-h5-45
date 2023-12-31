import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
nprogress.configure({
  showSpinner: false
})

console.log(import.meta.env.BASE_URL) // 从vite.config.ts文件当中获取的base属性

const router = createRouter({
  // mode: 'hash|history|abstract'
  // 配置不同的路由模式
  history: createWebHistory(import.meta.env.BASE_URL), // 配置history路由
  // history: createWebHashHistory('/h5'), // 配置hash模式的路由，可以传入一个基地址
  routes: [
    {
      path: '/login',
      component: () => import('@/views/Login/index.vue'),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/consult/illness',
      component: () => import('@/views/Consult/ConsultIllness.vue'),
      meta: { title: '病情描述' }
    },
    {
      path: '/consult/dep',
      component: () => import('@/views/Consult/ConsultDep.vue'),
      meta: { title: '选择科室' }
    },

    {
      path: '/consult/fast',
      component: () => import('@/views/Consult/ConsultFast.vue'),
      meta: { title: '极速问诊' }
    },
    {
      path: '/',
      component: () => import('@/views/Layout/index.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: () => import('@/views/Home/index.vue'),
          meta: {
            title: '首页'
          }
        },
        {
          path: '/article',
          component: () => import('@/views/Article/index.vue'),
          meta: {
            title: '健康百科'
          }
        },
        {
          path: '/notify',
          component: () => import('@/views/Notify/index.vue'),
          meta: {
            title: '消息中心'
          }
        },
        {
          path: '/user',
          component: () => import('@/views/User/index.vue'),
          meta: {
            title: '我的'
          }
        }
      ]
    },
    {
      path: '/user/patient',
      component: () => import('@/views/User/PatientPage.vue'),
      meta: {
        title: '家庭档案'
      }
    }
  ]
})

// 权限拦截
const whiteList = ['/login']
router.beforeEach((to) => {
  document.title = `优医问诊-${to.meta.title}`
  nprogress.start()
  // 开启进度条效果
  const userStore = useUserStore()
  // 没有token，还去了需要权限的页面，重定向到login
  if (!userStore.user?.token && !whiteList.includes(to.path)) {
    return '/login'
  }
  // 不做任何处理表示放行
})
router.afterEach(() => {
  nprogress.done()
})

export default router
