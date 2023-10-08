import CpNavBar from '@/components/cp-nav-bar.vue'
import CpSvgIcon from '@/components/cp-svg-icon.vue'
import { NavBar } from 'vant'
import CpRadioBtn from '@/components/CpRadioBtn.vue'
declare module 'vue' {
  // 重复定义会合并
  // 单独定义一个.d.ts文件，用于声明我们自己写的组件类型
  interface GlobalComponents {
    // 如果使用了属性的透传，支持navbar的所有属性
    CpNavBar: typeof CpNavBar & typeof NavBar // 获取到当前组件的类型
    CpSvgIcon: typeof CpSvgIcon
    CpRadioBtn: typeof CpRadioBtn
  }
}
