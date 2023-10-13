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

// 如果不写值，默认的值是从0开始递增，如果你写了值，就需要每个字段都进行赋值
// 声明一些常量
// 他会编译成js代码，和其他的ts类型不一样

// 后端给你的四个字段分别是 0123
// enum ConsultType {
//   UP = 0,
//   DOWN,
//   LEFT,
//   RIGHT
// }
//
// console.log(ConsultType) // 0
// // console.log(ConsultType[0]) // UP
//
// function changeDirection(direciton: ConsultType) {
//   console.log(direciton)
// }
//
// changeDirection(0) // 不够语义化，如果常量比较复杂，容易写错
