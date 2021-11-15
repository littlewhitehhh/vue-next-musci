<template>
  <div class="music-item" v-for="item in musicList" :key="item.id">
    <div class="content">
      <!-- 头像 -->
      <div class="image">
        <img :src="item.album.picUrl" />
      </div>
      <!--歌名 作者 -->
      <div class="detial">
        <div class="name">{{ item.album.name }}</div>
        <div class="artist">
          <span
            v-for="(ar, index) in item.artist ? item.artist : item.artists"
            :key="ar.id"
            class="ar-name"
            >{{ ar.name }}
            <span v-if="index !== (item.artist ? item.artist : item.artists).length - 1">/</span>
          </span>
        </div>
      </div>
    </div>
    <div class="album">
      <span>{{ item.album.name }}</span>
    </div>
    <div class="time">{{ timeFormat(item.duration) }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import timeFormat from '@/utils/timeFormat'
export default defineComponent({
  props: {
    musicList: {
      type: Array,
      required: true
    }
  },
  setup() {
    return { timeFormat }
  }
})
</script>

<style lang="less" scoped>
.music-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  height: 50px;
  .content {
    display: flex;
    max-width: 45%;
    min-width: 45%;
    .image {
      width: 50px;
      height: 100%;
      cursor: pointer;
      img {
        width: 100%;
        border-radius: 5px;
      }
    }
    .detial {
      cursor: pointer;
      margin-left: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      .name {
        font-weight: 700;
      }
      .artist {
        margin-top: 10px;
        font-size: 12px;
        color: #666;
        .ar-name:hover {
          color: #1dcf9f;
        }
      }
    }
  }
  .album {
    padding-left: 15px;
    max-width: 45%;
    min-width: 45%;
    font-size: 12px;
    color: #666;
    line-height: 50px;
    span:hover {
      cursor: pointer;
      color: #1dcf9f;
    }
  }
  .time {
    flex: 1;
    margin-right: 10px;
    font-size: 12px;
    color: #666;
    line-height: 50px;
  }
}
.music-item:hover {
  border-radius: 15px;
  background-color: #ccc;
}
</style>
