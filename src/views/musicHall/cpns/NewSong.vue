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
      <music-list :musicList="newSongsList"></music-list>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, ref } from 'vue'
import { useStore } from 'vuex'

import musicList from '@/components/common/musicItem/musicItem.vue'
import timeFormat from '@/utils/timeFormat'

export default defineComponent({
  components: {
    musicList
  },
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
    margin-top: 20px;
  }
}
</style>
