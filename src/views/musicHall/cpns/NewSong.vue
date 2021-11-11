<template>
  <div class="new-song">
    <!-- tags栏 -->
    <div class="tabs">
      <template v-for="(item, index) in types" :key="item.value">
        <div
          class="list-item"
          :class="currentTypeIndex === index ? 'active' : ''"
          @click="changeType(index, item.value)"
        >
          {{ item.name }}
        </div>
      </template>
    </div>

    <div class="newSongs-list">
      <template v-for="item in newSongsList" :key="item.id">
        <div class="newSongs-list-item">
          <!-- 歌曲信息 -->
          <div class="content">
            <img :src="item.album?.picUrl" alt="" />
            <div class="title">
              <span class="name">{{ item.name }}</span>
              <span class="singer" v-for="artist in item.artists" :key="artist.id">{{
                artist.name
              }}</span>
            </div>
          </div>
          <!-- 专辑名字 -->
          <span class="album">
            {{ item.album.name }}
          </span>

          <!--时间  -->
          <span class="time">{{ timeFormat(item.duration) }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, ref } from 'vue'
import { useStore } from 'vuex'

import timeFormat from '@/utils/timeFormat'
export default defineComponent({
  setup() {
    const store = useStore()
    const types = [
      { name: '全部', value: '0' },
      { name: '华语', value: '7' },
      { name: '欧美', value: '96' },
      { name: '日本', value: '8' },
      { name: '韩国', value: '16' }
    ]
    const currentTypeIndex = ref(0)
    const params = reactive({
      type: '0'
    })
    // 获取数据
    store.dispatch('music/getNewSongsData', params)

    const newSongsList = computed(() => {
      return store.state.music.newSongsList
    })

    const changeType = (index: number, value: string) => {
      currentTypeIndex.value = index
      params.type = value
      store.dispatch('music/getNewSongsData', params)
    }
    return {
      types,
      currentTypeIndex,
      newSongsList,
      changeType,
      timeFormat
    }
  }
})
</script>

<style lang="less" scoped>
.new-song {
  margin-top: 20px;
  .tabs {
    display: flex;
    .list-item {
      margin-right: 20px;
      cursor: pointer;
    }
  }
  .active {
    color: #1dcf9f;
  }

  .newSongs-list {
    .newSongs-list-item {
      margin-top: 20px;
      display: flex;
      height: 50px;
      justify-content: space-between;
      .content {
        // flex: 1;
        display: flex;
        img {
          height: 100%;
          border-radius: 5px;
          cursor: pointer;
        }
        .title {
          margin-left: 20px;
          .name {
            display: block;
            font-weight: 700;
            font-size: 18px;
            margin-bottom: 5px;
          }
          .singer {
            color: #666;
            cursor: pointer;
            font-size: 14px;
          }
          .singer:hover {
            color: #1dcf9f;
          }
        }
      }
      .album {
        // flex: 1;
        line-height: 50px;
        color: #666;
        cursor: pointer;
        font-size: 14px;
      }
      .album:hover {
        color: #1dcf9f;
      }
      .time {
        // flex: 1;
        color: #666;
        font-size: 14px;
        line-height: 50px;
        margin-right: 10px;
      }
    }
    .newSongs-list-item:hover {
      background-color: rgb(243, 241, 241);
      border-radius: 10px;
    }
  }
}
</style>
