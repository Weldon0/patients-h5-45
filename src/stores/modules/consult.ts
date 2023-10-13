// 记录极速问诊过程中的所有用户选择的数据

import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ConsultIllness, PartialConsult } from '@/types/consult'
import type { ConsultType } from '@/enums'

export const useConsultStore = defineStore(
  'cp-consult',
  () => {
    //  组合是的pinia写法
    //  1、定义一个问诊的数据对象
    const consult = ref<PartialConsult>({})

    // 2、设置第一步的问医生/极速问诊/开药门诊
    const setType = (type: ConsultType) => (consult.value.type = type)

    // 3、设置快速问诊类型
    const setIllnessType = (illnessType: 0 | 1) =>
      (consult.value.illnessType = illnessType)

    // 4、设置科室id
    const setDepId = (depId: string) => (consult.value.depId = depId)

    // 5、设置病情信息
    const setIllness = (illness: ConsultIllness) => {
      consult.value.illnessTime = illness.illnessTime
      consult.value.illnessDesc = illness.illnessDesc
      consult.value.consultFlag = illness.consultFlag
      consult.value.pictures = illness.pictures
    }
    // 6、设置患者id
    const setPatientId = (patientId: string) =>
      (consult.value.patientId = patientId)
    // 7、设置优惠券id
    const setCouponId = (couponId: string) =>
      (consult.value.couponId = couponId)
    // 8、支付完成之后需要清空数据
    const clear = () => {
      consult.value = {}
    }
    //   统一的导出
    return {
      consult,
      setType,
      setIllnessType,
      setDepId,
      setIllness,
      setPatientId,
      setCouponId,
      clear
    }
  },
  {
    persist: true // 表示开启问诊仓库的持久化功能
  }
)
