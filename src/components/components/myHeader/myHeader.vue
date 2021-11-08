<template>
  <div class="my-header">
    <div class="left">
      <div class="goBackBtns">
        <div class="back el-icon-arrow-left"></div>
        <div class="forward el-icon-arrow-right"></div>
      </div>
      <my-search></my-search>
    </div>
    <!-- tab- menu-->
    <div class="tab-menu">
      <!-- 登录组件 -->
      <template v-if="!isLogin">
        <login :isLogin="isLogin"></login>
      </template>

      <!-- 登录完成 显示用于信息组件 -->
      <template v-else>
        <user-info :isLogin="isLogin" :nickname="nickname" :avatarUrl="avatarUrl"></user-info>
      </template>
      <!-- 未完待续 -->
      <div class="continue">未完待续</div>
      <!-- github -->
      <a href="https://github.com/littlewhitehhh"><i class="iconfont icon-github"></i></a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from 'vue'
import { useStore } from 'vuex'

import mySearch from './cpns/mySerach.vue'
import Login from './cpns/login.vue'
import UserInfo from './cpns/userInfo.vue'

export default defineComponent({
  name: 'myHeader',
  components: {
    mySearch,
    Login,
    UserInfo
  },
  setup() {
    // 是否登录
    const store = useStore()
    // const nickname = ref('')
    const isLogin = computed(() => {
      return store.state.login.isLogin
    })

    const userInfo = reactive({
      nickname: computed((): any => {
        return store.state.login.profile.nickname
      }),
      avatarUrl: computed((): any => {
        return store.state.login.profile.avatarUrl
      })
    })
    // console.log(store.state.login)
    const changeIsLoginState = async () => {
      console.log('111')

      if (isLogin.value) {
        userInfo.nickname = computed<string>(() => {
          return store.state.login.profile.nickname
        })
        userInfo.avatarUrl = computed(() => {
          return store.state.login.profile.nickname
        })
      }
    }
    return { isLogin, changeIsLoginState, ...toRefs(userInfo) }
  }
})
</script>

<style lang="less" scoped>
.my-header {
  display: flex;
  align-content: center;
  justify-content: space-between;
  min-width: 700px;
  .left {
    display: flex;
  }
}
.goBackBtns {
  height: 100%;
  min-width: 100px;
  .back,
  .forward {
    height: 100%;
    line-height: 60px;
    margin-left: 20px;
    font-weight: 700;
    font-size: 28px;
    cursor: pointer;
  }
  .back:hover,
  .forward:hover {
    color: red;
  }
}
.tab-menu {
  display: flex;
  align-items: center;
  .continue {
    min-width: 60px;
    margin-left: 10px;
    font-size: 14px;
    color: rosybrown;
  }

  a {
    text-decoration: none;
    cursor: pointer;
    margin-left: 10px;
    i {
      font-size: 30px;
    }
  }
}
</style>
