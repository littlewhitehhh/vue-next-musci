<template>
  <div class="mySearch">
    <el-popover
      placement="bottom"
      :width="400"
      trigger="click"
      popper-class="hotSearch"
      @show="showHandle"
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
        <div v-for="(item, index) in hotSearchList" :key="item.first" class="listItem">
          <div class="index" :class="index < 3 ? 'red' : ''">{{ index }}</div>
          <div class="itemContent">
            <div class="top">
              <span class="keywords">{{ item.searchWord }}</span>
              <span class="iconfont" :class="index < 3 ? 'icon-Fire red' : ''"></span>
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

import { searchSuggest } from '@/network/api/search'
export default defineComponent({
  name: 'mySearch',

  setup() {
    const state = reactive({
      suggestList: {}
    })
    const keyword = ref('')
    // 根据关键词搜索
    const changeHandle = async () => {
      if (keyword.value) {
        let res = await searchSuggest(keyword.value)
        console.log(res.result)
        state.suggestList = res.result
      }
    }

    const store = useStore()
    const showHandle = () => {
      store.dispatch('gethotSearchList')
    }

    const hotSearchList = computed(() => {
      return store.state.hotSearchList
    })
    return {
      keyword,
      changeHandle,
      showHandle,
      hotSearchList,
      ...toRefs(state)
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
