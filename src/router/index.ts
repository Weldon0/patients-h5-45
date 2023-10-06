import { createRouter, createWebHistory } from 'vue-router'

console.log(import.meta.env.BASE_URL) // 从vite.config.ts文件当中获取的base属性

const router = createRouter({
  // mode: 'hash|history|abstract'
  // 配置不同的路由模式
  history: createWebHistory(import.meta.env.BASE_URL), // 配置history路由
  // history: createWebHashHistory('/h5'), // 配置hash模式的路由，可以传入一个基地址
  routes: [
    {
      path: '/login',
      component: () => import('@/views/Login/index.vue')
    }
  ]
})

export default router
