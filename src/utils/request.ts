import axios from 'axios'
import { useUserStore } from '@/stores'
import { showToast } from 'vant'
import router from '@/router'

const baseURL = 'https://consult-api.itheima.net/'

// 配置一个axios实例

const instance = axios.create({
  baseURL,
  timeout: 10000 // 超时时间
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 注入token
    // 获取到token,存储在pinia里面
    const userStore = useUserStore()
    // 先判断是否有token，如果有token再进行注入
    if (userStore.user?.token) {
      config.headers.Authorization = 'Bearer ' + userStore.user.token
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 判断后端返回的数据里面的code是不是10000，如果不是，进行错误提示，让当前请求失败
    if (response.data?.code !== 10000) {
      // 错误提示
      showToast('请求失败')
      return Promise.reject(response.data)
    }
    return response.data // 数据直接返回
  },
  (err) => {
    // 判断是不是401
    if (err.response.status === 401) {
      // 退出登录，清空用户信息，跳转登录
      const userStore = useUserStore() // 如果放到外面去，可能会在createPinia之前，调用defineStore
      userStore.delUser()
      router.push('/login')
    }
  }
)

/**
 * 请求方法统一封装
 * @param {string} url api的地址
 * @param {string} method 请求方法
 * @param {object} submitData 请求接口的入参
 * @example
 *  request('/api/list', 'get', { pageSize: 10 })
 */
const request = (url: string, method: string = 'get', submitData?: object) => {
  return instance.request({
    url,
    method,
    // 如果是get请求key是params，如果是post请求，key是data
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}

export { baseURL, instance, request }
