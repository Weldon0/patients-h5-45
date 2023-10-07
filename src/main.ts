import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from '@/stores' // 导入自己配置好的pinia
import 'virtual:svg-icons-register' // vite里面的虚拟模块

// 引入vant的样式
import 'vant/lib/index.css'
import '@/styles/main.scss'

const app = createApp(App)

app.use(pinia) // 注册配置好的pinia

app.use(router)

app.mount('#app')
