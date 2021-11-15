<template>
  <div class="Artist">
    <div class="tabsContent">
      <!-- area Tabs-->
      <div class="area">
        <template v-for="(item, index) in areas" :key="item.value">
          <div
            class="list-item"
            :class="currentAreaIndex === index ? 'active' : ''"
            @click="changeArea(index, item.value)"
          >
            {{ item.name }}
          </div>
        </template>
      </div>
      <!--  Types Tabd-->
      <div class="type">
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
    </div>
    <!-- 歌手列表 -->
    <div class="artist-list">
      <singer-item :artistsList="artistsList" @goToArtist="goToArtistDetial"></singer-item>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import singerItem from '@/components/common/singerItem/singerItem.vue'

export default defineComponent({
  components: {
    singerItem
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    const types = [
      { name: '全部', value: '-1' },
      { name: '男歌手', value: '1' },
      { name: '女歌手', value: '2' },
      { name: '乐队', value: '3' }
    ]
    const areas = [
      { name: '全部', value: '-1' },
      { name: '华语', value: '7' },
      { name: '欧美', value: '96' },
      { name: '日本', value: '8' },
      { name: '韩国', value: '16' },
      { name: '其他', value: '0' }
    ]

    const currentAreaIndex = ref(0)
    const currentTypeIndex = ref(0)
    const params = reactive({
      area: '-1',
      type: '-1'
    })
    // 获取数据
    store.dispatch('music/getArtistData', params)
    const artistsList = computed(() => {
      return store.state.music.artistsList
    })
    const changeArea = (index: number, value: string) => {
      currentAreaIndex.value = index
      params.area = value
      store.dispatch('music/getArtistData', params)
    }
    const changeType = (index: number, value: string) => {
      currentTypeIndex.value = index
      params.type = value
      store.dispatch('music/getArtistData', params)
    }
    const goToArtistDetial = (id: number) => {
      router.push('/artist/' + id)
    }
    return {
      types,
      areas,
      currentAreaIndex,
      currentTypeIndex,
      artistsList,
      changeArea,
      changeType,
      goToArtistDetial
    }
  }
})
</script>

<style lang="less" scoped>
.Artist {
  margin-top: 20px;
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
  // .artist-list {
  //   display: grid;
  //   grid-template-columns: repeat(6, 15%);
  //   grid-gap: 20px 20px;
  //   margin: 20px 0;
  //   .artist-list-item {
  //     text-align: center;
  //     img {
  //       width: 150px;
  //       height: 150px;
  //       border-radius: 50%;
  //     }
  //     .title {
  //       font-size: 14px;
  //       overflow: hidden;
  //       text-overflow: ellipsis;
  //       white-space: nowrap;
  //       display: block;
  //     }
  //   }
  // }
}
</style>
