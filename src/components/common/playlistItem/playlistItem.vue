<template>
  <div class="playlist-item-container">
    <template v-for="item in playlist" :key="item.id">
      <div class="playlist-item" @click="clickToPlayList(item.id)">
        <!-- image图片需要特殊操作 -->
        <img :src="item.picUrl || item.coverImgUrl" alt="" />
        <span class="title">{{ item.name }}</span>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    playlist: {
      type: Array,
      required: true
    }
  },
  emits: ['open'],
  setup(props, { emit }) {
    const clickToPlayList = (id: number) => {
      console.log('11', id)
      emit('open', id)
    }
    return { clickToPlayList }
  }
})
</script>

<style lang="less" scoped>
.playlist-item-container {
  display: grid;
  grid-template-columns: repeat(var(--block-num), var(--block-size));
  grid-template-rows: repeat(1, calc(var(--block-size) + 15px));
  grid-gap: 20px 20px;
  margin: 20px 0;
  cursor: pointer;
  .playlist-item {
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
}
</style>
