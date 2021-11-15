<template>
  <div class="singer-item">
    <template v-for="item in artistsList" :key="item.id">
      <div class="artist-list-item" @click="goToArtistClick(item.id)">
        <img :src="item.picUrl" alt="" />
        <span class="title">{{ item.name }}</span>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import { useRouter } from 'vue-router'

export default defineComponent({
  props: {
    artistsList: {
      type: Array,
      required: true
    }
  },
  emits: ['goToArtist'],
  setup(props, { emit }) {
    // const router = useRouter()
    const goToArtistClick = (id: number) => {
      emit('goToArtist', id)
      // console.log(id)
    }
    return { goToArtistClick }
  }
})
</script>

<style lang="less" scoped>
.singer-item {
  display: grid;
  grid-template-columns: repeat(6, 15%);
  grid-gap: 20px 20px;
  margin: 20px 0;
  .artist-list-item {
    text-align: center;
    cursor: pointer;
    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
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
