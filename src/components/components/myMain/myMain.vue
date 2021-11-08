<template>
  <div class="my-main">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'myMain',
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.my-main {
  min-width: 700px;
  padding: 0 20px;
}
</style>
