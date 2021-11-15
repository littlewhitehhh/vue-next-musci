<template>
  <div class="private-container">
    <template v-for="item in privateContentList" :key="item.id">
      <div class="private-content-list-item">
        <img :src="item.picUrl" alt="" />
        <span class="title">{{ item.name }}</span>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    privateContentList: {
      type: Array,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.private-container {
  display: grid;
  grid-template-columns: repeat(3, calc((100vw - 340px) / 3));
  // grid-template-rows: repeat(1, calc(var(--block-size) + 15px));
  grid-gap: 20px 20px;
  margin: 20px 0;
  cursor: pointer;
  .private-content-list-item {
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
