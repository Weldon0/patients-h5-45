// 使用场景很多，医生、文章。。。
import type { FollowType } from '@/types/consult'
import { ref } from 'vue'
import { followDoctor } from '@/services/consult'

export const useFollow = (type: FollowType) => {
  const loading = ref(false)

  // 点击关注触发的方法
  const follow = async (obj: { id: string; likeFlag: 0 | 1 }) => {
    loading.value = true
    try {
      await followDoctor(obj.id, type)
      // 修改成功之后，当前数据里面的关注状态需要手动修改一下
      obj.likeFlag = obj.likeFlag === 1 ? 0 : 1
    } finally {
      loading.value = false
    }
  }
  return {
    loading,
    follow
  }
}
