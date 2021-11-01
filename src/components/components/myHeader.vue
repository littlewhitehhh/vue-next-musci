<template>
  <div class="my-header">
    <div class="goBackBtns">
      <div class="back el-icon-arrow-left"></div>
      <div class="forward el-icon-arrow-right"></div>
    </div>
    <my-search></my-search>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import mySearch from '../common/mySerach.vue'
export default defineComponent({
  name: 'myHome',
  components: {
    mySearch
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.my-header {
  display: flex;
  align-content: center;
  min-width: 500px;
}
.goBackBtns {
  height: 100%;
  .back,
  .forward {
    height: 100%;
    line-height: 60px;
    margin-left: 20px;
    font-weight: 700;
    font-size: 28px;
    cursor: pointer;
  }
  .back:hover,
  .forward:hover {
    color: red;
  }
}
</style>
