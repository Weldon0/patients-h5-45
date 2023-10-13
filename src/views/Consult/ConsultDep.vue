<script setup lang="ts">
import { computed, ref } from 'vue'
import { getAllDepApi } from '@/services/consult'
import type { TopDep } from '@/types/consult'
import { useConsultStore } from '@/stores'

const active = ref(0)
const list = ref<TopDep[]>([])
const consultStore = useConsultStore()
const getAllDep = async () => {
  const res = await getAllDepApi()
  list.value = res.data
}

getAllDep()

// 通过计算属性获取二级分类数据
const subDep = computed(() => {
  // active.value当前选中的一级分类的索引
  return list.value[active.value]?.child
})
</script>

<template>
  <div class="consult-dep-page">
    <cp-nav-bar title="选择科室" />
    <div class="wrapper">
      <van-sidebar v-model="active">
        <van-sidebar-item
          :title="item.name"
          v-for="item in list"
          :key="item.id"
        />
      </van-sidebar>
      <div class="sub-dep">
        <router-link
          @click="consultStore.setDepId(sub.id)"
          to="/consult/illness"
          v-for="sub in subDep"
          :key="sub.id"
          >{{ sub.name }}</router-link
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.van-sidebar {
  width: 114px;
  &-item {
    padding: 14px;
    color: var(--cp-tag);
    &--select {
      color: var(--cp-main);
      font-weight: normal;
      &::before {
        display: none;
      }
    }
  }
}
.consult-dep-page {
  //padding-top: 46px;
}
.wrapper {
  height: calc(100vh - 46px);
  overflow: hidden;
  display: flex;
  .sub-dep {
    flex: 1;
    height: 100%;
    overflow-y: auto;
    > a {
      display: block;
      padding: 14px 30px;
      color: var(--cp-dark);
    }
  }
}
</style>
