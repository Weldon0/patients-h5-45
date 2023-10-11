<script setup lang="ts">
import KnowledgeCard from './KnowledgeCard.vue'
import { ref } from 'vue'
import type {
  KnowledgeList,
  KnowledgeParams,
  KnowledgeType
} from '@/types/consult'
import { getKnowledgePage } from '@/services/consult'

const loading = ref(false)
const finished = ref(false) // 表示是否加载完成
const list = ref<KnowledgeList>([]) // 存储的文章列表

// 接受父组件传递的文章类型参数
const props = defineProps<{
  type: KnowledgeType
}>()

// 构建一个请求参数
const params = ref<KnowledgeParams>({
  pageSize: 10,
  current: 1,
  type: props.type
})
const load = async () => {
  // load事件触发的时候，vant-list组件会自动把他改成true
  const res = await getKnowledgePage(params.value)
  list.value.push(...res.data.rows)

  // 如果没有更多数据，需要让finished变成true
  if (res.data.pageTotal <= params.value.current) {
    finished.value = true
  } else {
    params.value.current++
  }
  // 如果有更多数据，需要让页码自增

  loading.value = false // 表示加载结束了
}
</script>

<template>
  <div class="knowledge-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="load"
    >
      <knowledge-card
        :item="item"
        v-for="item in list"
        :key="item.id"
      ></knowledge-card>
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.knowledge-list {
  padding: 0 15px;
}
</style>
