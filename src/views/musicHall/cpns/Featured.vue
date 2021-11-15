<template>
  <!-- <el-button @click="getBannerDate">点击</el-button> -->
  <div class="featured">
    <!-- banners组件 -->
    <banners :bannersList="banners"></banners>

    <!-- 推荐歌单 -->
    <div>
      <span class="h2" style="cursor: pointer" @click="changeTabsClick(1)"
        >推荐歌单<i style="font-size: 22px; text-align: center" class="icon el-icon-arrow-right"></i
      ></span>
      <div class="recommend-playlst">
        <!-- 推荐歌单组件 -->
        <playlist-item :playlist="recommendPlaylist" @open="openPlaylist"></playlist-item>
      </div>
    </div>

    <!-- 独家放送 -->
    <div>
      <span class="h2" style="cursor: pointer" @click="changeTabsClick(2)"
        >独家放送<i
          style="font-size: 22px; text-align: center"
          class="icon el-icon-arrow-right"
        ></i>
      </span>
      <div class="private-content-list">
        <!-- 独家放送组件 -->
        <private-content-item :privateContentList="privateContentList"></private-content-item>
      </div>
    </div>
    <!--最新鲜听 -->
    <div>
      <span class="h2" style="margin-right: 10px"
        >最新先听 <i class="el-icon-video-play"></i>
      </span>

      <music-block :musicList="rcmdNewPlaylsit"></music-block>
      <!-- <div v-if="rcmdNewSongList.length > 0">
        <div v-for="m of 3" :key="m" class="MusicBlock">
          <MusicBlock
            v-for="n of 4"
            :key="n"
            :music="rcmdNewSongList[n - 1 + (m - 1) * 3]"
            :index="n - 1 + (m - 1) * 3"
            @play="playSelect(rcmdNewSongList[n - 1 + (m - 1) * 3])"
          />
        </div> -->
    </div>
    <!-- 推荐MV -->
    <div>
      <span class="h2">推荐MV<i class="icon el-icon-arrow-right"></i></span>
      <div class="mv-lsit">
        <template v-for="item in rcmdMVlist" :key="item.id">
          <div class="mv-lsit-item">
            <img :src="item.picUrl" /> <span class="title">{{ item.name }}</span>
          </div>
        </template>
      </div>
      <!-- <div class="mv-list">
        <VideoCover
          v-for="item of rcmdMvList"
          :key="item.id"
          :image="item.picUrl"
          :text="item.name"
          :video-id="item?.id"
          type="mv"
        /> -->
      <!-- </div> -->
      <!--      <div class="mv-list">-->
      <!--        <div-->
      <!--          v-for="item of rcmdMvList"-->
      <!--          :key="item.id"-->
      <!--          class="mv-list-item"-->
      <!--          @click="openMv(item.id)"-->
      <!--        >-->
      <!--          <Image-->
      <!--            :src="item.picUrl+'?param=960y540'"-->
      <!--            :type="0"-->
      <!--            :play-icon="true"-->
      <!--            :animation="2"-->
      <!--            class="image"-->
      <!--            style="border-radius: 8px"-->
      <!--            @play="openMv(item.id)"-->
      <!--          />-->
      <!--          <span class="title">{{ item.name }}</span>-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import banners from '@/components/common/banners/banners.vue'
import playlistItem from '@/components/common/playlistItem/playlistItem.vue'
import privateContentItem from '@/components/common/privateContentItem/privateContentItem.vue'
import musicBlock from '@/components/common/musicBlock/musicBlock.vue'

export default defineComponent({
  components: { banners, playlistItem, privateContentItem, musicBlock },
  emits: ['changeTabComponent'],
  setup(props, { emit }) {
    const store = useStore()
    const router = useRouter()
    //获取featuredData数据
    store.dispatch('music/getFeaturedData')
    //获取banners数据
    const banners = computed(() => {
      return store.state.music.banners
    })
    // 获取推荐歌单
    const recommendPlaylist = computed(() => {
      return store.state.music.recommendPlaylist
    })
    // 获取独家放送
    const privateContentList = computed(() => {
      return store.state.music.privateContentList
    })
    //获取音乐先听（推荐信音乐）
    const rcmdNewPlaylsit = computed(() => {
      return store.state.music.rcmdNewPlaylsit
    })
    // 获取推荐mv
    const rcmdMVlist = computed(() => {
      return store.state.music.rcmdMVlist
    })
    //改变tabs
    const changeTabsClick = (index: number) => {
      emit('changeTabComponent', index)
      // console.log('11')
    }
    // 打开歌单页面
    const openPlaylist = (id: number) => {
      // console.log(id)
      router.push(`/playlist/${id}`)
    }
    return {
      banners,
      recommendPlaylist,
      privateContentList,
      rcmdNewPlaylsit,
      rcmdMVlist,
      changeTabsClick,
      openPlaylist
    }
  }
})
</script>

<style lang="less" scoped>
.featured {
  margin-top: 20px;
  .h2 {
    text-align: center;
    font-size: 22px;
    font-weight: 700;
    margin-right: 10px;
    cursor: pointer;
    i.icon {
      font-weight: 700;
    }
  }

  .mv-lsit {
    display: grid;
    grid-template-columns: repeat(4, 23.5%);
    grid-gap: 20px 20px;
    margin: 20px 0;
    cursor: pointer;
    .mv-lsit-item {
      img {
        width: 100%;
        border-radius: 15px;
      }
      .title {
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: block;
      }
    }
    .mv-lsit-item:hover img {
      transform: scale(1.1);
    }
  }
}
</style>
