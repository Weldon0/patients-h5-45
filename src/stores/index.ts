// 配置pinia的初始化

import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
// 配置持久化
pinia.use(persist)

// 把user模块，导入到当前文件，其他组件使用的时候，直接从当前文件引入即可

// 配置好的pina导出
export default pinia

export * from './modules/user' // 把user模块里面的东西全部导入之后直接导出
