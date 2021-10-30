<template>
  <div class="home">
    <el-button type="primary" @click="handleClick">hahah</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MyAxios from '@/network/index'
import axios from 'axios'
export default defineComponent({
  name: 'home',
  setup() {
    const handleClick = () => {
      console.log('123')
      MyAxios.request({
        url: '/playlist/hot'
      }).then((res) => {
        console.log(res)
      })
    }
    return { handleClick }
  }
})
</script>

<style lang="less" scope></style>
