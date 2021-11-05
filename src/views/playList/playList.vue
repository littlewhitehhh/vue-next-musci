<template>
  <div class="playList">{{ route.params.id }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
export default defineComponent({
  name: 'playList',
  setup() {
    const route = useRoute()
    return { route }
  }
})
</script>

<style lang="less" scoped></style>
