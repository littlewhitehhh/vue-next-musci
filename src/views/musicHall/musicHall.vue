<template>
  <div class="musicHall">
    <h2 class="title">音乐馆</h2>

    <!-- tabs    每个模块的tabs不一样哦-->
    <tabs
      :tabsList="tabList"
      @changeTabComponent="changeTabComponent"
      :currentIndex="currentIndex"
    ></tabs>

    <!-- 动态组件  显示tabs标题的详情 -->
    <component :is="currentComponent" @changeTabComponent="changeTabComponent"></component>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import tabs from '@/components/common/Tabs/tabs.vue'
import Featured from './cpns/Featured.vue'
import NewSong from './cpns/NewSong.vue'
import PrivateContent from './cpns/PrivateContent.vue'
import PlayList from './cpns/PlayList.vue'
import Leaderboard from './cpns/Leaderboard.vue'
import Artist from './cpns/Artist.vue'
// import { testApi } from '@/network/api/login'
export default defineComponent({
  name: 'musicHall',
  components: {
    tabs,
    Featured,
    NewSong,
    PrivateContent,
    PlayList,
    Leaderboard,
    Artist
  },
  props: {},
  setup() {
    const tabList = [
      { title: '精选推荐', name: 'Featured' },
      { title: '歌单', name: 'PlayList' },
      { title: '独家放送', name: 'PrivateContent' },
      { title: '排行榜', name: 'Leaderboard' },
      { title: '歌手', name: 'Artist' },
      { title: '新歌速递', name: 'NewSong' }
    ]

    // 动态组件
    const currentIndex = ref(0)
    const currentComponent = ref('Featured')
    const changeTabComponent = (index: number) => {
      currentIndex.value = index
      currentComponent.value = tabList[index].name
      // console.log(index)
    }

    return { tabList, currentComponent, currentIndex, changeTabComponent }
  }
})
</script>

<style lang="less" scoped>
.musicHall {
  h2 {
    font-size: 30px;
  }
}
</style>
