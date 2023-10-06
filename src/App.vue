<script setup lang="ts">
//导入user仓库
import { useUserStore } from '@/stores'
// 导入vant组件然后直接使用即可，按需引入组件
import { Button as VanButton } from 'vant'

const userStore = useUserStore()
const login = () => {
  userStore.setUser({
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE5OSIsImlhdCI6MTY5NjU1OTM4MSwiZXhwIjoxNjk2NzMyMTgxfQ.NS6pLVS-XP1ZxV87xhYygnsJoqw-kISDKUgPhcQDG4s',
    id: '199',
    account: '用户199',
    mobile: '132****0100',
    avatar:
      'https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/consult/avatar3.png'
  })
}
</script>
<template>
  <div @click="login">登录</div>
  <VanButton>我是登录按钮</VanButton>
</template>

<style scoped></style>
