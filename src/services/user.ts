import { request } from '@/utils/request'
import type { TCodeType, TUser } from '@/types/user'

export const loginApi = (mobile: string, password: string) => {
  return request<TUser>('/login/password', 'POST', { mobile, password })
}

// 获取短信验证码
export const getCodeApi = (mobile: string, type: TCodeType) => {
  return request('/code', 'GET', { mobile, type })
}
