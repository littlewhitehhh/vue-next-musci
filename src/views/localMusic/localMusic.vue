<template>
  <div class="localMusic">localMusic的界面</div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, toRefs } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
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
      })
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
    return {
      onLineMenuList,
      onLineMenuListLogin,
      myMusicMenuList,
      ...toRefs(state)
    }
  }
})
</script>

<style lang="less" scoped></style>
