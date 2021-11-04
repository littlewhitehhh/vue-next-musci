<template>
  <div class="my-main">我是Main</div>
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
}
</style>
