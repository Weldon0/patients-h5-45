import { ref } from 'vue'
import { showToast } from 'vant'

export const getApi = <T>(Api: () => Promise<{ data: T }>) => {
  const data = ref<T>()
  Api().then(
    (res) => {
      data.value = res.data
    },
    () => {
      showToast('网络错误')
    }
  )
  return {
    data
  }
}
