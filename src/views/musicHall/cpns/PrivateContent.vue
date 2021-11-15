<template>
  <div class="private-content">
    <span class="h2" style="cursor: pointer">独家放送</span>
    <div class="private-content-list">
      <!-- <template v-for="item in allPrivateContentList" :key="item.id">
        <div class="private-content-list-item">
          <img :src="item.picUrl" alt="" />
          <span class="title">{{ item.name }}</span>
        </div>
      </template> -->
      <private-content-item :privateContentList="allPrivateContentList"></private-content-item>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import privateContentItem from '@/components/common/privateContentItem/privateContentItem.vue'

export default defineComponent({
  components: {
    privateContentItem
  },
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
}
</style>
