<template>
  <div class="search">
    <span class="h1">关于"{{ keywords }}"搜索结果</span>
    结果：{{ result }}
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, watch, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'

import { searchResult } from '@/network/api/search'
export default defineComponent({
  name: 'search',
  setup() {
    const route = useRoute()
    // console.log(route.params.keyword)
    const keywords = computed(() => {
      return route.params.keyword
    })

    const state = reactive({
      result: {}
    })
    onMounted(() => {
      searchResult(keywords.value).then((res: any) => {
        console.log(res)
        state.result = res.result
      })
    })
    watch(keywords, () => {
      searchResult(keywords.value).then((res: any) => {
        console.log(res)
        state.result = res.result
      })
    })
    return { keywords, ...toRefs(state) }
  }
})
</script>

<style lang="less" scoped></style>
