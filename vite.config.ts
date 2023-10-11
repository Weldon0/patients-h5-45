import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path' // node自带的

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      //   开启defineModel
      script: {
        defineModel: true
      }
    }),
    // 可以自动导入src/components里面的组件
    Components({
      dts: false,
      // 原因：Toast Confirm 这类组件的样式还是需要单独引入，样式全局引入了，关闭自动引入
      // VantResolver帮我们自动导入vant组件
      // importStyle：表示是否引入样式
      // 如果让插件导入样式，vant组件内部的部分函数组件的样式没法使用这个插件导入
      // 导致的问题：使用这些函数组件的时候，还得单独引入样式，比较麻烦
      // 所以我们禁用插件的样式导入，自己在主入口一次性引入所有样式
      // 总结：这个插件只能导入部分样式，没法全部导入
      resolvers: [VantResolver({ importStyle: false })]
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/icons')] // 指定图标的路径
    })
  ],
  base: '/h5',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
