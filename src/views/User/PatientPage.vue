<script setup lang="ts">
import {
  addPatientApi,
  delPatientApi,
  getPatientListApi,
  updatePatientApi
} from '@/services/user'
import type { TPatient, TPatientList } from '@/types/user'
import { computed, ref } from 'vue'
import { showConfirmDialog, showToast } from 'vant'
import Validator from 'id-validator'

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

// 父组件定义一个选中的标识，传递给子组件，子组件需要默认选中，子组件可以切换选项，切换完毕之后，修改父组件的值
const gender = ref(1)
const show = ref(false)

// 打开弹层的方法用于新增和编辑，新增的时候是没有数据对象的
const handleShowPopup = (item?: TPatient) => {
  if (item) {
    //   传递过来的数据做回显
    const { id, name, gender, idCard, defaultFlag } = item // 把表单需要的数据以及id从item里面解构出来之后赋值
    patient.value = { id, name, gender, idCard, defaultFlag }
  } else {
    // 当弹层打开的时候，进行数据的重置
    patient.value = {
      ...initPatientData
    }
  }

  show.value = true
}
const initPatientData: TPatient = {
  defaultFlag: 0, // 后端接口需要的数据是0或者1，但是我们自己的组件得到的是true或者false
  idCard: '',
  name: '',
  gender: 1
}

const patient = ref<TPatient>({ ...initPatientData }) // 为什么需要解构：因为initPatientData是一个对象

const defaultFlag = computed({
  get() {
    return patient.value.defaultFlag === 1
  },
  set(checked) {
    // 这里的checked事true或者false，因为是表单获取到的数据
    patient.value.defaultFlag = checked ? 1 : 0
  }
})

const submit = async () => {
  //   先判断是否填写身份证号和姓名
  if (!patient.value.name) return showToast('请填写姓名')
  if (!patient.value.idCard) return showToast('请填写身份证号')
  //   校验身份证号是否符合规则
  const validator = new Validator()

  if (!validator.isValid(patient.value.idCard))
    return showToast('身份证号不符合规则')
  const { sex } = validator.getInfo(patient.value.idCard)

  if (sex !== patient.value.gender) return showToast('性别和身份证不符')

  //   ---校验通过之后开始提交----
  // 如果id存在，证明是编辑，编辑的时候调用编辑接口
  patient.value.id
    ? await updatePatientApi(patient.value)
    : await addPatientApi(patient.value)
  //   重新获取列表数据
  getPatientList()
  //   关闭新增弹层
  show.value = false
  //   成功的提示
  showToast(patient.value.id ? '编辑患者信息成功' : '新增患者信息成功')
}

const delPatient = async () => {
  // 因为id是一个可选参数，所以我们添加一个判断，确定id存在之后再调用删除接口
  if (patient.value.id) {
    // 进行一个确认的弹层提示
    await showConfirmDialog({
      title: '温馨提示',
      message: '是否确认删除当前患者信息？'
    })
    await delPatientApi(patient.value.id)
    getPatientList()
    show.value = false
    showToast('删除成功')
  }
}
</script>

<template>
  <div class="patient-page">
    <cp-nav-bar title="家庭档案"></cp-nav-bar>
    <div class="patient-list">
      <CpRadioBtn v-model="gender" :options="options" />
      <div class="patient-item" v-for="item in patientList" :key="item.id">
        <div class="info">
          <span class="name">{{ item.name }}</span>
          <span class="id">{{
            item.idCard.replace(/^(.{6})(?:\d+)(.{4})$/, '\$1******\$2')
          }}</span>
          <span>{{ item.gender === 1 ? '男' : '女' }}</span>
          <span>{{ item.age }}岁</span>
        </div>
        <div class="icon" @click="handleShowPopup(item)">
          <cp-svg-icon name="user-edit" />
        </div>
        <div class="tag" v-if="item.defaultFlag === 1">默认</div>
      </div>
      <div class="patient-add" @click="handleShowPopup()">
        <cp-svg-icon name="user-add" />
        <p>添加患者</p>
      </div>
      <div class="patient-tip">最多可添加 6 人</div>
    </div>

    <van-popup v-model:show="show" position="right">
      <cp-nav-bar
        :back="() => (show = false)"
        :title="patient.id ? '编辑患者' : '新增患者'"
        right-text="保存"
        @click-right="submit"
      ></cp-nav-bar>
      <van-form>
        <van-field
          v-model="patient.name"
          label="真实姓名"
          placeholder="请输入真实姓名"
        ></van-field>
        <van-field
          v-model="patient.idCard"
          label="身份证号"
          placeholder="请输入身份证号"
        ></van-field>
        <van-field label="性别">
          <template #input>
            <cp-radio-btn
              :options="options"
              v-model="patient.gender"
            ></cp-radio-btn>
          </template>
        </van-field>
        <van-field label="默认就诊人">
          <template #input>
            <van-checkbox v-model="defaultFlag"></van-checkbox>
          </template>
        </van-field>
      </van-form>
      <van-action-bar v-if="patient.id">
        <van-action-bar-button @click="delPatient">删除</van-action-bar-button>
      </van-action-bar>
    </van-popup>
  </div>
</template>

<style lang="scss" scoped>
.patient-page {
  padding: 0 0 80px;

  ::v-deep .van-popup {
    width: 100%;
    height: 100%;
  }
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
// 底部操作栏
.van-action-bar {
  padding: 0 10px;
  margin-bottom: 10px;
  .van-button {
    color: var(--cp-price);
    background-color: var(--cp-bg);
  }
}
</style>
