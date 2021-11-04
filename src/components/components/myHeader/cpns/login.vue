<template>
  <div class="login">
    <div class="avater">
      <!-- 头像 -->
      <el-avatar
        :size="30"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></el-avatar>
    </div>
    <!-- 未登录按钮 -->
    <div class="loginBtn" @click="LoginDialogShow">
      未登录<i class="icon el-icon-arrow-down"></i>
    </div>

    <!-- 登录弹出框 -->
    <el-dialog
      title="登录网易云账号"
      v-model="loginDialogVisible"
      width="460px"
      center
      @closed="closeHandle"
    >
      <!-- 账号密码登录 -->
      <!-- 表单 -->
      <el-form :model="loginForm" v-if="isAccountLogin">
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="loginForm.phone" placeholder="请输入账号/邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="loginForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>

      <!-- 二维码登录 -->
      <div v-else class="qrimg">
        <img :src="qrimg" alt="二维码" />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="success" @click="loginAction" v-show="isAccountLogin">登 录</el-button>
          <a @click="changLoginAction" v-if="isAccountLogin" class="aBtn"> 二维码登录></a>
          <a @click="changLoginAction" v-else class="aBtn"> 账号登陆></a>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'

import { getQrKey, getQr, qrCheck } from '@/network/api/login'
export default defineComponent({
  name: 'Login',
  props: {
    isLogin: {
      type: Boolean,
      required: true
    }
  },
  emits: ['changeIsLoginState'],
  setup() {
    const isAccountLogin = ref(true) //true是账号登录  false为二维码登录

    const state = reactive({
      loginForm: {
        phone: '18854890529',
        password: 'Web159753'
      },
      formLabelWidth: '60px',
      // 二维码的base64编码
      qrimg: '',
      //二维码状态码
      qrCode: 801
    })

    const store = useStore()
    const loginDialogVisible = ref(false)
    // 登录对话框显示
    const LoginDialogShow = () => {
      console.log('开始登录')
      loginDialogVisible.value = true
    }
    //登陆操作
    const loginAction = () => {
      loginDialogVisible.value = false
      store.dispatch('login/accountLoginAction', state.loginForm)
    }

    // 改变登录方式 二维码登录或者账号密码登录
    const changLoginAction = async () => {
      isAccountLogin.value = !isAccountLogin.value
      if (!isAccountLogin.value) {
        // console.log('请求二维码')
        //1、获取二维码key
        const result = await getQrKey({ timerstamp: new Date().getTime() })
        const { unikey: key } = result.data
        // console.log(key)

        //2、根据key 获取 二维码base64编码
        const QrResult = await getQr({ key, qrimg: true, timerstamp: new Date().getTime() })
        // console.log(QrResult)
        state.qrimg = QrResult.data.qrimg

        //3、查询二维码状态

        // if (state.qrCode === 801) {
        // }
        const checkResult = await qrCheck({ key, timerStamp: new Date().getTime() })
        // console.log(checkResult)
        state.qrCode = checkResult.code
        let timer = setInterval(() => {
          if (state.qrCode === 803) {
            // 登录成功
            console.log('登陆成功')
            // 清除计时器
            clearInterval(timer)
          } else {
            console.log('登陆失败')
          }
        }, 60000)
      }
    }

    //关闭登录dialog
    const closeHandle = () => {
      isAccountLogin.value = true
      loginDialogVisible.value = false
    }
    return {
      loginDialogVisible,
      ...toRefs(state),
      isAccountLogin,
      LoginDialogShow,
      loginAction,
      changLoginAction,
      closeHandle
    }
  }
})
</script>

<style lang="less" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  // margin-left: 50%;
  .loginBtn {
    margin-left: 10px;
    min-width: 70px;
    cursor: pointer;
    .icon {
      margin-left: 5px;
      font-weight: 700;
    }
  }
  .loginBtn:hover {
    color: red;
  }

  .aBtn:hover {
    color: #1dcf9f;
  }
  .qrimg img {
    display: block;
    width: 200px;
    height: 200px;
    margin: 0 auto !important;
  }
}
</style>
