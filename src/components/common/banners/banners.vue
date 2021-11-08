<template>
  <div class="banner">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in bannersList" :key="item.targetId" class="list-item">
        <div class="content">
          <img :src="item.imageUrl" alt="" class="image" />
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    bannersList: {
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
.banner {
  width: 80%;
  margin: 10px auto;

  .list-item {
    border-radius: 10px;
    .content {
      height: 100%;
      position: relative;
      .image {
        height: 100%;
      }
      span {
        position: absolute;
        right: 0;
        background-color: red;
        color: #fff;
        border-bottom-right-radius: 10px;
        border-top-left-radius: 10px;
      }
    }
  }
}
</style>
