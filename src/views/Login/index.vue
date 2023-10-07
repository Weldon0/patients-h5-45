<script setup lang="ts">
import { ref } from 'vue'
import { codeRules, mobileRules, passwordRules } from '@/utils/rules'
import { showToast } from 'vant'
import type { FormInstance } from 'vant'
import { loginApi } from '@/services/user'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'

const flag = ref(false)

const form = ref<FormInstance>()
// 1、定义数据手机号和密码
const mobile = ref<string>('13230000100')
const password = ref<string>('abc12345')
const code = ref('')
const isPass = ref(true) // 表示是否是密码登录模式

const show = ref(false)
const userStore = useUserStore()
const router = useRouter()

const login = async () => {
  // 判断是否同意用户协议
  if (!flag.value) {
    showToast({
      message: '请同意用户协议'
    })
    return
  }
  const res = await loginApi(mobile.value, password.value)
  // console.log(res)

  userStore.setUser(res.data)
  showToast('登录成功')
  // 跳转user页面
  //   存储到pinia
  router.push('/user')
}

const sendCode = async () => {
  // 1、校验手机号的表单
  await form.value?.validate('mobile')
}
</script>

<template>
  <div class="login-page">
    <cp-nav-bar
      right-text="注册"
      @click-right="$router.push('/register')"
    ></cp-nav-bar>
    <div class="login-head">
      <h3>{{ isPass ? '密码登录' : '验证码登录' }}</h3>
      <a href="javascript:;" @click="isPass = !isPass">
        <span>{{ !isPass ? '密码登录' : '验证码登录' }}</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>
    <!-- form 表单:点击了类型为submit的按钮的时候，先校验表单，通过之后触发submit事件 -->
    <van-form ref="form" @submit="login">
      <van-field
        :rules="mobileRules"
        v-model="mobile"
        placeholder="请输入手机号"
        name="mobile"
      ></van-field>
      <van-field
        v-if="isPass"
        :type="show ? 'text' : 'password'"
        v-model="password"
        placeholder="请输入密码"
        :rules="passwordRules"
      >
        <!--密码框添加右侧的小眼睛-->
        <template #button>
          <cp-svg-icon
            @click="show = !show"
            :name="`login-eye-${show ? 'on' : 'off'}`"
          ></cp-svg-icon>
        </template>
      </van-field>
      <van-field
        v-model="code"
        :rules="codeRules"
        v-else
        placeholder="请输入验证码"
      >
        <template #button>
          <span @click="sendCode" class="btn-send">发送验证🐴</span>
        </template>
      </van-field>
      <div class="cp-cell">
        <van-checkbox v-model="flag">
          我已同意
          <a>用户协议</a>
          及
          <a>隐私条款</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <!--native-type="submit"可以触发form的submit事件     -->
        <van-button type="primary" block round native-type="submit">
          登录
        </van-button>
      </div>
      <div class="cp-cell">
        <span>忘记密码？</span>
      </div>
    </van-form>
    <div class="login-other">
      <van-divider>第三方登录</van-divider>
      <div class="icon">
        <img src="@/assets/qq.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  &-page {
    //padding-top: 46px;
  }

  &-head {
    padding: 30px 30px 50px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 1;

    h3 {
      font-weight: normal;
      font-size: 24px;
    }

    a {
      font-size: 15px;
    }
  }

  &-other {
    margin-top: 60px;
    padding: 0 30px;

    .icon {
      display: flex;
      justify-content: center;

      img {
        width: 36px;
        height: 36px;
        padding: 4px;
      }
    }
  }
}

.van-form {
  padding: 0 14px;

  .cp-cell {
    height: 52px;
    line-height: 24px;
    padding: 14px 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;

    .van-checkbox {
      a {
        color: var(--cp-primary);
        padding: 0 5px;
      }
    }
  }
}

.btn-send {
  color: var(--cp-primary);

  &.active {
    color: rgba(22, 194, 163, 0.5);
  }
}
</style>
