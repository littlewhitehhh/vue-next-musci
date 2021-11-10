<template>
  <div class="playlist">
    <!-- <el-button class="text" @click="clickHandle">测试</el-button> -->

    <!-- 精品歌单还是网友热碟 -->
    <div class="switch-mode" @click="mode = !mode">
      <img :src="modeContent ? modeContent.coverImgUrl : ''" alt="" />
      <div class="info">
        <span class="tab"
          ><i class="iconfont" :class="mode ? 'icon-crown' : 'icon-diepian'"></i>
          {{ mode ? '精选歌单' : '网友热碟' }}</span
        >
        <span class="title">{{ modeContent?.name }}</span>
        <div>
          <span class="sub-title">{{ modeContent?.description }}</span>
        </div>
      </div>
    </div>
    <!-- 歌单列表展示 -->
    <div class="screen">
      <!-- 热门标签 -->
      <div class="tags">
        <template v-for="(item, index) in hotTags" :key="item.id">
          <div
            class="tags-item"
            @click="changeTag(index, item.name)"
            :class="currentIndex === index ? 'active' : ''"
          >
            {{ item.name }}
          </div>
        </template>
      </div>

      <!--歌单展示 -->
      <!-- 热门歌单 -->
      <div v-if="!mode" class="hot-play-list">
        <template v-for="item in hotPlaylist" :key="item.id">
          <div class="playlsit-item">
            <img :src="item.coverImgUrl" alt="" />
            <span class="title">{{ item.name }}</span>
          </div>
        </template>
      </div>

      <!-- 精品歌单 -->
      <div v-else class="highquality-play-list">
        <template v-for="item in highqualityPlaylist" :key="item.id">
          <div class="playlsit-item">
            <img :src="item.coverImgUrl" alt="" />
            <span class="title">{{ item.name }}</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
// import { getTopPlaylist } from '@/network/api/musicHall'
export default defineComponent({
  setup() {
    const store = useStore()
    //获取playlist页面数据
    store.dispatch('music/getPlayListData')

    const state = reactive({
      //热门标签
      hotTags: computed(() => {
        return store.state.music.hotTags
      }),
      // 热门歌曲
      hotPlaylist: computed(() => {
        return store.state.music.hotPlaylist
      }),
      // 精品歌曲
      highqualityPlaylist: computed(() => {
        return store.state.music.highqualityPlaylist
      }),
      //提取第一个
      modeContent: computed(() => {
        return mode.value
          ? store.state.music.highqualityPlaylist[0]
          : store.state.music.hotPlaylist[0]
      })
    })

    const mode = ref(false) //false为网友热碟  true为精选歌单
    const currentIndex = ref(0)
    // watch(
    //   mode,
    //   () => {
    //     if (!mode.value) {
    //       state.modeContent = state.hotPlaylist[0]
    //     } else {
    //       state.modeContent = state.highqualityPlaylist[0]
    //     }
    //   },
    //   { immediate: true, deep: true }
    // )

    const changeTag = (index: number, name: string) => {
      console.log(index, name)
      currentIndex.value = index
      store.dispatch('music/getPlayListData', { cat: name })
    }
    return {
      ...toRefs(state),
      mode,
      currentIndex,
      // modeContent
      changeTag
    }
  }
})
</script>

<style lang="less" scoped>
.playlist {
  width: 100%;
  margin-top: 20px;
  .switch-mode {
    border-radius: 20px;
    // width: 100%;
    height: 144px;
    padding: 20px;
    display: flex;
    align-items: center;
    // position: relative;
    overflow: hidden;
    cursor: pointer;
    border: 1.5px solid #e7aa5a;
    background: #000000;
    img {
      height: 142px;
      border-radius: 15px;
    }
    .info {
      height: 100%;
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      .tab {
        width: 100px;
        border: 1px solid #e7aa5a;
        border-radius: 15px;
        color: #e7aa5a;
        text-align: center;
        padding: 3px 0px;
        background: #3f3f3f;
      }
      .title {
        color: #ffffff;
        font-size: 16px;
        font-weight: bold;
        margin: 20px 0 10px 0;
      }
      .sub-title {
        color: #cfd0d4;
        // max-width: calc(var(--page-width) - var(--block-size) - 60px);
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
    }
  }

  .tags {
    display: flex;
    margin-top: 20px;
    width: 70%;
    .tags-item {
      // margin-left: 20px;
      flex: 1;
      text-align: center;
      cursor: pointer;
    }
  }
  .hot-play-list,
  .highquality-play-list {
    display: grid;
    grid-template-columns: repeat(6, 16%);
    grid-gap: 20px 20px;
    margin: 20px 0;
    .playlsit-item {
      img {
        border-radius: 15px;
        width: 100%;
      }
      .title {
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: block;
      }
    }
  }

  .active {
    color: #1dcf9f;
  }
}
</style>
