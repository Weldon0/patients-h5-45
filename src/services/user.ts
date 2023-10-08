import { request } from '@/utils/request'
import type { TCodeType, TPatientList, TUser, TUserInfo } from '@/types/user'

export const loginApi = (mobile: string, password: string) => {
  return request<TUser>('/login/password', 'POST', { mobile, password })
}

// 获取短信验证码
export const getCodeApi = (mobile: string, type: TCodeType) => {
  return request('/code', 'GET', { mobile, type })
}

// 验证码登录的接口
export const loginByCodeApi = (mobile: string, code: string) => {
  return request<TUser>('/login', 'POST', { mobile, code })
}

export const getUserInfoApi = () => {
  return request<TUserInfo>('/patient/myUser')
}

export const getPatientListApi = () => {
  return request<TPatientList>('/patient/mylist')
}
