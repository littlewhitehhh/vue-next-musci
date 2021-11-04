<template>
  <div class="home">
    <!-- <el-button type="primary" @click="handleClick">hahah</el-button> -->

    <el-container>
      <el-aside width="200px" class="aside">
        <my-aside></my-aside>
      </el-aside>
      <el-container>
        <el-header>
          <my-header></my-header>
        </el-header>
        <el-main>
          <my-main></my-main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MyAxios from '@/network/index'

import myHeader from '@/components/components/myHeader/myHeader.vue'
import myAside from '@/components/components/myAside/myAside.vue'
import myMain from '@/components/components/myMain/myMain.vue'

export default defineComponent({
  name: 'home',
  components: {
    myHeader,
    myAside,
    myMain
  },
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

<style lang="less" scoped>
.aside {
  height: 100vh;
}
</style>
