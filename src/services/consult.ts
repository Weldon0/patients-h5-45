import type {
  DoctorPage,
  FollowType,
  KnowledgePage,
  KnowledgeParams,
  PageParams
} from '@/types/consult'
import { request } from '@/utils/request'

// 获取文章列表
export const getKnowledgePage = (params: KnowledgeParams) =>
  request<KnowledgePage>('/patient/home/knowledge', 'GET', params)

// 获取医生列表数据
export const getConsultListApi = (params: PageParams) =>
  request<DoctorPage>('/home/page/doc', 'GET', params)

// 关注接口
export const followDoctor = (id: string, type: FollowType = 'doc') =>
  request('/like', 'POST', { id, type })
