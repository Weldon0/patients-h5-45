<template>
  <svg aria-hidden="true" class="cp-icon">
    <!-- #icon-文件夹名称-图片名称 -->
    <use :href="`#icon-${name}`" />
  </svg>
</template>

<script setup lang="ts">
// 图标的名字从父组件动态传入
defineProps<{
  name: string
}>()
</script>

<style scoped lang="scss">
.cp-icon {
  width: 1em; // 相对于父节点
  height: 1em;
}
</style>
