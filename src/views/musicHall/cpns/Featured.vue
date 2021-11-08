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
        <template v-for="item in recommendPlaylist" :key="item.id">
          <div class="recommend-playlst-item">
            <img :src="item.picUrl" alt="" />
            <span class="title">{{ item.name }}</span>
          </div>
        </template>
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
      <!-- <div class="private-content-list">
        <div
          v-for="item of privateContentList"
          :key="item.id"
          class="private-content-list-item"
          @click="openMv(item.id)"
        >
          <Image
            :src="item.sPicUrl"
            :type="0"
            :play-icon="true"
            :animation="2"
            class="image"
            style="border-radius: 8px"
            @play="openMv(item.id)"
          />
          <span class="title">{{ item.name }}</span>
        </div>
      </div> -->
    </div>
    <!--最新鲜听 -->
    <div>
      <span class="h2" style="margin-right: 10px"
        >最新先听
        <!-- <a><svg-icon class="play-all" name="playAll" @click="playAll" /></a> -->
      </span>
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
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'

import banners from '@/components/common/banners/banners.vue'

export default defineComponent({
  components: { banners },
  emits: ['changeTabComponent'],
  setup(props, { emit }) {
    const store = useStore()

    //获取featuredData数据
    store.dispatch('music/getFeaturedData')
    //获取banners数据
    const banners = computed(() => {
      return store.state.music.banners
    })
    const recommendPlaylist = computed(() => {
      return store.state.music.recommendPlaylist
    })
    const changeTabsClick = (index: number) => {
      emit('changeTabComponent', index)

      console.log('11')
    }
    return { banners, recommendPlaylist, changeTabsClick }
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

  .recommend-playlst {
    display: grid;
    grid-template-columns: repeat(5, 19%);
    grid-gap: 20px 20px;
    margin: 20px 0;
    cursor: pointer;
    .recommend-playlst-item {
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
    .recommend-playlst-item:hover img {
      transform: scale(1.1);
    }
  }
}
</style>
