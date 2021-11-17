<template>
  <div class="music-block">
    <template v-for="item in musicList" :key="item.id">
      <div class="music-block-item" @dblclick="play(item.id)">
        <img :src="item.picUrl ? item.picUrl : item.album.picUrl" alt="" />
        <div class="content">
          <!-- 歌曲名 -->
          <div class="name">{{ item.name }}</div>
          <!-- 歌手名 -->
          <div v-if="item.song">
            <span class="singer" v-for="(item2, index) in item.song.artists" :key="item2.id">
              {{ item2.name }}
              <span v-if="index !== item.song.artists.length - 1">/</span>
            </span>
          </div>
          <div v-else>
            <span class="singer" v-for="(item2, index) in item.artist" :key="item2.id">
              {{ item2.name }}
              <span v-if="index !== item.artist.length - 1">/</span>
            </span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    musicList: {
      type: Array,
      required: true
    }
  },
  emits: ['playMusic'],
  setup(props, { emit }) {
    const play = (id: number) => {
      // console.log(id)
      emit('playMusic', id)
      // 用vuex来存啊
    }

    return { play }
  }
})
</script>

<style lang="less" scoped>
.music-block {
  display: grid;
  grid-template-columns: repeat(4, 24%);
  grid-gap: 20px 20px;
  margin: 20px 0;
  cursor: pointer;

  .music-block-item {
    display: flex;
    border-radius: 5px;

    img {
      width: 50px;
      height: 50px;
      border-radius: 10px;
    }
    .content {
      width: 100%;
      margin-left: 20px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      flex: 1;
      .name {
        font-weight: 700;
      }
      .singer {
        font-size: 12px;
        color: #666;
      }
      .singer:hover {
        color: #1dcf9f;
      }
    }
  }
  .music-block-item:hover {
    background-color: rgba(29, 207, 159, 0.1);
  }
}
</style>
