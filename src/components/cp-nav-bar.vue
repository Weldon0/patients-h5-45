<template>
  <van-nav-bar
    @click-left="clickLeft"
    left-arrow
    placeholder
    fixed
  ></van-nav-bar>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

// 手动接收了标题，然后组件内部展示
defineProps<{
  title?: string
}>()

// vue3自定义组件的属性会默认透传组件的跟节点
// 自定义透传方式，你可以使用useAttrs，可以接收到父组件传递过来的所有的属性和方法
// 前提是这些属性没有被deinfeProps和defineEmits接收
// 可以用defineOptions关闭默认透传

// 使用vue3.3版本以上的写法
const clickLeft = () => {
  // 全局的路由对象在组件内部是通过userRouter获取，userRouter是通过vue-router里面导出
  if (history.state.back) {
    // 可以返回上一级 this.$router.back()
    router.back()
  } else {
    router.push('/')
  }
}
</script>

<style lang="scss" scoped>
::v-deep .van-nav-bar {
  &__arrow {
    font-size: 18px;
    color: var(--cp-text1);
  }

  &__text {
    font-size: 15px;
  }
}
</style>
