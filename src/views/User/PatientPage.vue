<script setup lang="ts">
import { getPatientListApi } from '@/services/user'
import type { TPatientList } from '@/types/user'
import { ref } from 'vue'

const patientList = ref<TPatientList>([])

const getPatientList = async () => {
  const res = await getPatientListApi()
  patientList.value = res.data
}
getPatientList()
// 自动调用接口，自定赋值数据的逻辑如何在vue2中抽离
// mixmins

const options = [
  {
    label: '男',
    value: 1
  },
  {
    label: '女',
    value: 0
  }
]

// vue2和vue3的区别？
// 最大的区别，组合式的写法
// 组合式的写法优势在哪？ 逻辑复用
</script>

<template>
  <div class="patient-page">
    <cp-nav-bar title="家庭档案"></cp-nav-bar>
    <div class="patient-list">
      <CpRadioBtn :options="options" />
      <div class="patient-item" v-for="item in patientList" :key="item.id">
        <div class="info">
          <span class="name">{{ item.name }}</span>
          <span class="id">{{
            item.idCard.replace(/^(.{6})(?:\d+)(.{4})$/, '\$1******\$2')
          }}</span>
          <span>{{ item.gender === 1 ? '男' : '女' }}</span>
          <span>{{ item.age }}岁</span>
        </div>
        <div class="icon"><cp-svg-icon name="user-edit" /></div>
        <div class="tag" v-if="item.defaultFlag === 1">默认</div>
      </div>
      <!--      <div class="patient-item">-->
      <!--        <div class="info">-->
      <!--          <span class="name">李富贵</span>-->
      <!--          <span class="id">321***********6164</span>-->
      <!--          <span>男</span>-->
      <!--          <span>32岁</span>-->
      <!--        </div>-->
      <!--        <div class="icon"><cp-icon name="user-edit" /></div>-->
      <!--      </div>-->
      <div class="patient-add">
        <cp-icon name="user-add" />
        <p>添加患者</p>
      </div>
      <div class="patient-tip">最多可添加 6 人</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.patient-page {
  padding: 0 0 80px;
}
.patient-list {
  padding: 15px;
}
.patient-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: var(--cp-bg);
  border-radius: 8px;
  margin-bottom: 15px;
  position: relative;
  border: 1px solid var(--cp-bg);
  transition: all 0.3s;
  overflow: hidden;
  .info {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    span {
      color: var(--cp-tip);
      margin-right: 20px;
      line-height: 30px;
      &.name {
        font-size: 16px;
        color: var(--cp-text1);
        width: 80px;
        margin-right: 0;
      }
      &.id {
        color: var(--cp-text2);
        width: 180px;
      }
    }
  }
  .icon {
    color: var(--cp-tag);
    width: 20px;
    text-align: center;
  }
  .tag {
    position: absolute;
    right: 60px;
    top: 21px;
    width: 30px;
    height: 16px;
    font-size: 10px;
    color: #fff;
    background-color: var(--cp-primary);
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &.selected {
    border-color: var(--cp-primary);
    background-color: var(--cp-plain);
    .icon {
      color: var(--cp-primary);
    }
  }
}
.patient-add {
  background-color: var(--cp-bg);
  color: var(--cp-primary);
  text-align: center;
  padding: 15px 0;
  border-radius: 8px;
  .cp-icon {
    font-size: 24px;
  }
}
.patient-tip {
  color: var(--cp-tag);
  padding: 12px 0;
}
</style>
