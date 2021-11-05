<template>
  <div class="my-aside">
    <!-- logo -->
    <div class="logo">
      <img class="image" src="@/assets/img/logo.png" alt="" />
      <span class="title">音乐demo</span>
    </div>

    <el-menu
      :default-active="activePath"
      background-color="#ececec"
      active-text-color="#fff"
      router
    >
      <!-- 在线音乐 -->
      <common-menu
        :menuList="!isLogin ? onLineMenuList : onLineMenuListLogin"
        title="在线音乐"
        @changeActivePath="changeActivePath"
      ></common-menu>

      <template v-if="isLogin">
        <!-- 我的音乐 -->
        <common-menu
          :menuList="myMusicMenuList"
          title="我的音乐"
          @changeActivePath="changeActivePath"
        ></common-menu>
        <!-- 创建的歌单 -->
        <user-menu
          :menuList="createdPlayList"
          title="创建的歌单"
          @changeActivePath="changeActivePath"
        ></user-menu>
        <!-- 收藏的歌单 -->

        <user-menu
          :menuList="collectionPlayList"
          title="收藏的歌单"
          @changeActivePath="changeActivePath"
        ></user-menu>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, toRefs } from 'vue'
import { useStore } from 'vuex'

import commonMenu from './cpns/commonMenu.vue'
import userMenu from './cpns/userMenu.vue'

export default defineComponent({
  name: 'myAside',
  components: {
    commonMenu,
    userMenu
  },
  setup() {
    const store = useStore()
    const state = reactive({
      isLogin: computed(() => {
        return store.state.login.isLogin
      }),
      collectionPlayList: computed(() => {
        return store.state.login.collectionPlayList
      }),
      createdPlayList: computed(() => {
        return store.state.login.createdPlayList
      }),
      activePath: window.sessionStorage.getItem('activePath') || '/musicHall'
    })
    const onLineMenuList = [
      { name: '音乐馆', path: '/musicHall', icon: 'icon-erji' },
      { name: '视频', path: '/video', icon: 'icon-video' },
      { name: '私人FM', path: '/personalFM', icon: 'icon-vip' }
    ]
    const onLineMenuListLogin = [
      { name: '推荐', path: '/recommend', icon: 'icon-recommend' },
      { name: '音乐馆', path: '/musicHall', icon: 'icon-erji' },
      { name: '视频', path: '/video', icon: 'icon-video' },
      { name: '私人FM', path: '/personalFM', icon: 'icon-vip' }
    ]
    const myMusicMenuList = [
      { name: '我喜欢', path: '/myLike', icon: 'icon-like' },
      { name: '本地音乐', path: '/localMusic', icon: 'icon-computer' },
      { name: '音乐云盘', path: '/musicCloud', icon: 'icon-cloud-download' },
      { name: '最近播放', path: '/currentPlay', icon: 'icon-zuijinliulan' }
    ]
    const changeActivePath = (path: string) => {
      window.sessionStorage.setItem('activePath', path)
      state.activePath = path
    }
    return {
      onLineMenuList,
      onLineMenuListLogin,
      myMusicMenuList,
      ...toRefs(state),
      changeActivePath
    }
  }
})
</script>

<style lang="less" scoped>
.my-aside {
  .logo {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;

    .image {
      border-radius: 50%;
      width: 40px;
      margin: 10px;
    }
    .title {
      color: red;
      font-size: 20px;
    }
  }
  // .music-menu {
  //   margin: 20px 10px 0 10px;
  //   .title {
  //     font-size: 12px;
  //     color: #ccc;
  //   }
  //   .el-menu {
  //     margin-top: 10px;
  //   }
  //   .el-menu-item {
  //     margin-top: 10px;
  //     height: 50px;
  //     line-height: 50px;
  //     border-radius: 10px;
  //     .iconfont {
  //       margin-right: 10px;
  //       font-size: 18px;
  //     }
  //   }
  //   .el-menu-item:hover {
  //     background-color: #1dcf9f;
  //   }
  //   .el-menu-item.is-active {
  //     background-color: #1dcf9f;
  //   }
  // }
}
</style>
