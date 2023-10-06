// 构建一个用户新的pinia仓库

import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TUser } from '@/types/user'

export const useUserStore = defineStore(
  'cp-user',
  () => {
    // 1、定义用户的信息对象
    const user = ref<TUser>()

    // 2、设置用户信息的方法
    const setUser = (u: TUser) => {
      user.value = u
    }

    // 3、移除用户信息的方法
    const delUser = () => {
      user.value = undefined // 用户信息对象置空
    }

    return {
      user,
      setUser,
      delUser
    }
  },
  {
    persist: true // 表示当前仓库开启持久化的存储
  }
)
