<template>
  <div class="userInfo">
    <!-- 头像 -->
    <el-avatar :size="30" :src="avatarUrl"></el-avatar>
    <!-- 昵称 -->
    <!-- <span>{{ nickname }}<i class="icon el-icon-arrow-down"></i></span> -->

    <el-popover placement="bottom" :width="200" trigger="click" popper-class="layout">
      <template #reference>
        <span>{{ nickname }}<i class="icon el-icon-arrow-down"></i></span>
      </template>

      <el-button type="danger" class="layoutBtn" @click="logoutClick">退出登录</el-button>
    </el-popover>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { logoutAccount } from '@/network/api/login'
export default defineComponent({
  props: {
    avatarUrl: {
      type: String,
      requried: true
    },
    nickname: {
      type: String,
      requried: true
    }
  },
  setup() {
    const store = useStore()
    const logoutClick = async () => {
      console.log('退出弹出框？')
      const res = await logoutAccount()
      if (res.code == 200) {
        // 退出登录状态
        store.commit('login/changeLoginState', false)
        window.localStorage.clear()
      }
      console.log(res)
    }
    return {
      logoutClick
    }
  }
})
</script>

<style lang="less" scoped>
.userInfo {
  display: flex;
  align-items: center;
  min-width: 160px;
  cursor: pointer;
  span {
    margin-left: 5px;
    font-size: 14px;
  }
  span:hover {
    color: #1dcf9f;
  }
}
</style>
