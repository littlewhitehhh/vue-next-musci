<template>
  <div class="artist">
    <!-- 头部 -->
    <div class="header">
      <div class="cover">
        <img :src="artist.cover" alt="" />
      </div>
      <div class="content">
        <div class="info">
          <span class="h1" style="margin-bottom: 0px">{{ artist.name }}</span>
        </div>
        <div>
          <span class="works"
            >{{ artist.musicSize }}首歌 • {{ artist.albumSize }}张专辑 •
            {{ artist.mvSize }}支MV</span
          >
        </div>
        <div>
          <span class="description">{{ artist.briefDesc }}</span>
        </div>
      </div>
    </div>

    <!-- tabs -->
    <div class="tabs">
      <tabs :tabsList="tabList" @changeTabComponent="changeTab" :currentIndex="currentIndex"></tabs>
    </div>

    <!-- 动态组件 -->
    <keep-alive>
      <component :is="currentTabComponent" :artist-id="route.params.id"></component>
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import { getArtistsById } from '@/network/api/musicHall'

import tabs from '@/components/common/Tabs/tabs.vue'
import AlbumList from './cpns/album.vue'
import MvList from './cpns/mvList.vue'
import Hot from './cpns/hot.vue'
import MusicList from './cpns/musicList.vue'

export default defineComponent({
  components: {
    tabs,
    AlbumList,
    MvList,
    Hot,
    MusicList
  },
  setup() {
    const route = useRoute()
    const artist = ref({})
    const getSingerDetail = async () => {
      let res = await getArtistsById(route.params.id)
      // console.log(res)
      artist.value = res.data.artist
    }
    // 获取歌手信息
    getSingerDetail()

    //歌手标签
    const tabList = [
      { title: '精选', name: 'Hot' },
      { title: '歌曲', name: 'MusicList' },
      { title: '专辑', name: 'AlbumList' },
      { title: 'MV', name: 'MvList' }
    ]
    const currentTabComponent = ref('Hot')
    const currentIndex = ref(0)
    const changeTab = (index: number) => {
      currentIndex.value = index
      currentTabComponent.value = tabList[index].name
    }

    //一旦route.params.id变化 重新获取数据
    watch(
      () => route.params.id,
      () => {
        getSingerDetail()
      }
    )
    return { route, artist, tabList, currentTabComponent, currentIndex, changeTab }
  }
})
</script>

<style lang="less" scoped>
.artist {
  .header {
    display: flex;
    justify-content: space-between;
    .cover {
      width: 230px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        border-radius: 15px;
      }
    }
    .content {
      width: calc(100% - 300px);
      height: 200px;
      padding-top: 10px;
      display: flex;
      flex-direction: column;
      // justify-content: space-between;
      .info {
        margin-top: 20px;
        .h1 {
          font-size: 32px;
          font-weight: 700;
        }
      }
      .works {
        display: block;
        color: #5a5a5a;
        margin: 15px 0;
        font-weight: bolder;
        font-size: 14px;
      }
      .description {
        width: 85%;
        font-size: 13px;
        color: #929292;
        padding-right: 40px;
        user-select: none;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5;
        overflow: hidden;
      }
    }
  }
  .tabs {
    margin-top: 30px;
  }
}
</style>
