<template>
  <div class="private-content">
    <span class="h2" style="cursor: pointer">独家放送</span>
    <div class="private-content-list">
      <template v-for="item in allPrivateContentList" :key="item.id">
        <div class="private-content-list-item">
          <img :src="item.picUrl" alt="" />
          <span class="title">{{ item.name }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    const store = useStore()
    // 获取页面所需数据
    store.dispatch('music/getPrivateContentData')

    const allPrivateContentList = computed(() => {
      return store.state.music.allPrivateContentList
    })

    return { allPrivateContentList }
  }
})
</script>

<style lang="less" scoped>
.private-content {
  margin-top: 20px;
  .h2 {
    font-weight: 700;
    font-size: 22px;
  }
  .private-content-list {
    display: grid;
    grid-template-columns: repeat(3, 32%);
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
    .private-content-list-item:hover img {
      transform: scale(1.1);
    }
  }
}
</style>
