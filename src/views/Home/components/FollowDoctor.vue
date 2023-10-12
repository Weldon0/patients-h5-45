<script setup lang="ts">
import DoctorCard from '@/views/Home/components/DoctorCard.vue'
import { useWindowSize } from '@vueuse/core'
import { getConsultListApi } from '@/services/consult'
import { ref } from 'vue'
import type { DoctorList } from '@/types/consult'
const { width } = useWindowSize()

const list = ref<DoctorList>([])

// 请求接口渲染数据
const getDoctorList = async () => {
  const res = await getConsultListApi({ pageSize: 5, current: 1 })
  list.value = res.data.rows
}
getDoctorList()
</script>

<template>
  <div class="follow-doctor">
    <div class="head">
      <p>推荐关注</p>
      <a href="javascript:"> 查看更多<i class="van-icon van-icon-arrow" /></a>
    </div>
    <div class="body">
      <!-- swipe 组件 -->
      <van-swipe :show-indicators="false" :width="(150 / 375) * width">
        <van-swipe-item v-for="item in list" :key="item.id">
          <DoctorCard :item="item" />
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.follow-doctor {
  background-color: var(--cp-bg);
  height: 250px;
  .head {
    display: flex;
    justify-content: space-between;
    height: 45px;
    align-items: center;
    padding: 0 15px;
    font-size: 13px;
    > a {
      color: var(--cp-tip);
    }
  }
  .body {
    width: 100%;
    overflow: hidden;
  }
}
</style>
