<template>
  <div class="mySearch">
    <el-popover
      placement="bottom"
      :width="400"
      trigger="click"
      popper-class="hotSearch"
      @show="showHandle"
      v-model:visible="isPopoverShow"
    >
      <template #reference>
        <div class="search-input">
          <el-input
            placeholder="音乐/电台/用户"
            prefix-icon="el-icon-search"
            width="300px"
            v-model="keyword"
            @input="changeHandle"
          ></el-input>
        </div>
      </template>
      <!-- 热搜列表 -->
      <div v-if="!keyword">
        <span class="title">热门搜索</span>
        <!-- 热搜列表 -->
        <div
          v-for="(item, index) in hotSearchList"
          :key="item.first"
          class="listItem"
          @click="goSearch(item.searchWord)"
        >
          <!-- 索引 -->
          <div class="index" :class="index < 3 ? 'red' : ''">{{ index }}</div>
          <!-- 内容 -->
          <div class="itemContent">
            <div class="top">
              <span class="keywords">{{ item.searchWord }}</span>
              <span class="iconfont" :class="index < 3 ? 'icon-fire red' : ''"></span>
              <span class="socre">{{ item.score }}</span>
            </div>

            <div class="bottom">
              {{ item.content }}
            </div>
          </div>
        </div>
      </div>

      <!-- 根据关键字推荐搜索列表 -->
      <div v-else class="search-suggest">
        <span style="padding: 5px; color: #000000; font-weight: 500">猜您想找：</span>
        <div v-if="suggestList?.songs?.length > 0" class="search-suggest-item">
          <span class="title">歌曲</span>
          <div
            v-for="item of suggestList.songs"
            :key="item.id"
            class="content"
            @click="playMusic(item.id)"
          >
            {{ item.name }}-
            <span v-for="(item2, index2) of item.artists" :key="item2.id">
              {{ item2.name }}{{ index2 === item.artists.length - 1 ? '' : '/' }}
            </span>
          </div>
        </div>

        <div v-if="suggestList?.artists?.length > 0" class="search-suggest-item">
          <span class="title">歌手</span>
          <div
            v-for="item of suggestList.artists"
            :key="item.id"
            class="content"
            @click="goToArtist(item.id)"
          >
            {{ item.name }}
          </div>
        </div>

        <div v-if="suggestList?.albums?.length > 0" class="search-suggest-item">
          <span class="title">专辑</span>
          <div
            v-for="item of suggestList.albums"
            :key="item.id"
            class="content"
            @click="goToAlbum(item.id)"
          >
            {{ item.name }}-{{ item.artist.name }}
          </div>
        </div>

        <div v-if="suggestList?.playlists?.length > 0" class="search-suggest-item">
          <span class="title">歌单</span>
          <div
            v-for="item of suggestList.playlists"
            :key="item.id"
            class="content"
            @click="goToPlaylist(item.id)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ref, computed, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import { searchSuggest } from '@/network/api/search'
export default defineComponent({
  name: 'mySearch',

  setup() {
    const store = useStore()
    const router = useRouter()
    const state = reactive({
      suggestList: {}
    })
    const isPopoverShow = ref(false)
    const keyword = ref('')
    // 根据关键词搜索
    const changeHandle = async () => {
      if (keyword.value) {
        let res = await searchSuggest(keyword.value)
        // console.log(res.result)
        state.suggestList = res.result
      }
    }

    const showHandle = () => {
      store.dispatch('gethotSearchList')
    }
    //热搜列表
    const hotSearchList = computed(() => {
      return store.state.hotSearchList
    })

    // 选中热搜item  获取该item的具体信息
    const goSearch = async (keywords: string) => {
      // console.log('111')
      keyword.value = keywords
      //在获取一遍搜索推荐
      changeHandle()
      isPopoverShow.value = false
      // 路由跳转到详情页面
      router.push(`/search/${keywords}`)
    }
    const playMusic = (id: number) => {
      isPopoverShow.value = false
      console.log('听歌喽', id)
    }
    const goToArtist = (id: number) => {
      isPopoverShow.value = false
      console.log('去看作者喽', id)
      router.push(`/artist/${id}`)
    }
    const goToAlbum = (id: number) => {
      isPopoverShow.value = false
      console.log('去看专辑喽', id)
      router.push(`/album/${id}`)
    }
    const goToPlaylist = (id: number) => {
      isPopoverShow.value = false
      console.log('去看歌单喽', id)
      router.push(`/playlist/${id}`)
    }
    return {
      keyword,
      changeHandle,
      showHandle,
      hotSearchList,
      ...toRefs(state),
      goSearch,
      isPopoverShow,
      playMusic,
      goToArtist,
      goToAlbum,
      goToPlaylist
    }
  }
})
</script>

<style lang="less" scoped>
.mySearch {
  margin-left: 40px;
  line-height: 60px;
  .search-input:deep(.el-input__inner) {
    width: 300px;
    border-radius: 25px;
  }
  .search-input :deep(.el-input__inner):focus {
    border-color: rgba(238, 60, 104, 0.5);
  }
}
</style>
