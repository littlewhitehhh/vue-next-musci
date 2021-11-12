<template>
  <div class="video">
    <h2 class="title">Music Video</h2>
    <!-- 标签栏 -->
    <div class="tabsContent">
      <!-- area Tabs-->
      <div class="area">
        <template v-for="(item, index) in typeList" :key="item">
          <div
            class="list-item"
            :class="currTypeIndex === index ? 'active' : ''"
            @click="changeType(index, item)"
          >
            {{ item }}
          </div>
        </template>
      </div>
      <!--  Types Tabd-->
      <div class="type">
        <template v-for="(item, index) in orderList" :key="item">
          <div
            class="list-item"
            :class="currOrderIndex === index ? 'active' : ''"
            @click="changeOrder(index, item)"
          >
            {{ item }}
          </div>
        </template>
      </div>
    </div>
    <!-- 内容展示 -->
    <div class="mv-lsit">
      <template v-for="item in mvList" :key="item.id">
        <div class="mv-lsit-item">
          <img :src="item.cover" /> <span class="title">{{ item.name }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'myVideo',
  setup() {
    const store = useStore()
    // console.log(store)

    const params = reactive({
      type: '全部',
      order: '上升最快'
    })
    store.dispatch('video/getVideoData', params)
    const mvList = computed(() => {
      return store.state.video.allMvList
    })
    const currTypeIndex = ref(0)
    const currOrderIndex = ref(0)
    const typeList = ['全部', '官方版', '原声', '现场版', '网易出品']
    const orderList = ['上升最快', '最热', '最新']
    const changeType = (index: number, value: string) => {
      currTypeIndex.value = index
      params.type = value
      store.dispatch('video/getVideoData', params)
    }
    const changeOrder = (index: number, value: string) => {
      currOrderIndex.value = index
      params.order = value
      store.dispatch('video/getVideoData', params)
    }
    return {
      mvList,
      currTypeIndex,
      currOrderIndex,
      typeList,
      orderList,
      changeType,
      changeOrder
    }
  }
})
</script>

<style lang="less" scoped>
.video {
  // margin-top: 20px;
  h2 {
    font-size: 30px;
  }
  .tabsContent {
    display: flex;
    justify-content: space-between;
    .area,
    .type {
      display: flex;
      .list-item {
        margin-left: 20px;
        cursor: pointer;
      }
    }
    .active {
      color: #1dcf9f;
    }
  }
  .mv-lsit {
    display: grid;
    grid-template-columns: repeat(4, 23.5%);
    grid-gap: 20px 20px;
    margin: 20px 0;
    cursor: pointer;
    .mv-lsit-item {
      img {
        width: 100%;
        height: 150px;
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
    .mv-lsit-item:hover img {
      transform: scale(1.1);
    }
  }
}
</style>
