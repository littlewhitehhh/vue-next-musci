<template>
  <div class="mySearch">
    <el-popover placement="bottom" :width="300" trigger="click" @show="showHandle">
      <template #reference>
        <div class="search-input">
          <el-input
            placeholder="音乐/电台/用户"
            prefix-icon="el-icon-search"
            width="300px"
            v-model="keyword"
            @change="changeHandle"
          ></el-input>
        </div>
      </template>
      <!-- 热搜列表 -->
      <div class="hotSearch">
        <div v-for="(item, index) in hotSearchList" :key="item.first" class="listItem">
          {{ index }}
          {{ item.searchWord }}
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

import { searchSuggest } from '@/network/api/search'
export default defineComponent({
  name: 'mySearch',

  setup() {
    const keyword = ref('')
    // 根据关键词搜索
    const changeHandle = async () => {
      let res = await searchSuggest(keyword.value)
      console.log(res)
    }
    const store = useStore()
    const showHandle = () => {
      store.dispatch('gethotSearchList')
    }

    const hotSearchList = computed(() => {
      return store.state.hotSearchList
    })
    return {
      keyword,
      changeHandle,
      showHandle,
      hotSearchList
    }
  }
})
</script>

<style lang="less" scoped>
.mySearch {
  margin-left: 40px;
  line-height: 60px;
  .search-input:deep(.el-input__inner) {
    width: 300px;
    border-radius: 25px;
  }
  .search-input :deep(.el-input__inner):focus {
    border-color: rgba(238, 60, 104, 0.5);
  }
}
</style>
