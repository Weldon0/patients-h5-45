import { ref } from 'vue'

export const getApi = <T>(Api: () => Promise<{ data: T }>) => {
  const data = ref<T>()
  Api().then((res) => {
    data.value = res.data
  })
  return {
    data
  }
}
