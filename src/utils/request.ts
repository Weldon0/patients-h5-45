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
    console.log(userStore)
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
      showToast(response.data.message || '请求失败')
      return Promise.reject(response.data)
    }
    return response.data // 数据直接返回
  },
  (err) => {
    console.log(err)
    // 判断是不是401
    if (err.response.status === 401) {
      // 退出登录，清空用户信息，跳转登录
      const userStore = useUserStore() // 如果放到外面去，可能会在createPinia之前，调用defineStore
      userStore.delUser()
      showToast('登录过期，请重新登录')
      router.push('/login')
    }
  }
)

type Data<T> = {
  code: number
  message: string
  data: T
}
/**
 * 请求方法统一封装
 * @param {string} url - api的地址
 * @param {string} method - 请求方法
 * @param {object} submitData - 请求接口的入参
 * @example
 *  request('/api/list', 'get', { pageSize: 10 })
 */
const request = <T>(
  url: string,
  method: string = 'get',
  submitData?: object
) => {
  // 第二个类型表示的是接口返回的数据类型
  return instance.request<T, Data<T>>({
    url,
    method,
    // 如果是get请求key是params，如果是post请求，key是data
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}

export { baseURL, instance, request }

// 八点半到十点半
// 九点左右
// 优先投递在线的
// 上次活跃时间【半年以前活跃以上的不用投了】
// 如果在线的都投递完了，搜索栏里面重新搜索一下，搜索前端或者vue或者小程序，重新出现一些在线的，再投递一下
// boss里面的在线简历，里面的信息必须要完善，学历信息，项目介绍和经验【和你的简历一样】
// 所有学生面完试，给我录音。

// 1、每次面试之后更新面试题表格。
// 2、每天的考勤自己进行更新【】。
// 3、每天的投递数量，当天5 - 6点进行更新【每天上课第一件事情，看投递量】。
// 4、面试的录音，面完之后直接发给我。
// 5、面试请假的问题：上午面试就上午请假，下午面试就下午请假。
// 6、去外地面试，多约几家一起去面，面完回教室。
// 7、找不到工作一直来教室。
// 8、自己面完试的问题，自己记录一个文档，网上搜索出答案，自己总结一下。
// 9、电话或者视频面试，一定要来学校，去会议室，找一两个学生辅助你。
