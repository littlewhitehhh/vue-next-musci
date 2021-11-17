<template>
  <div class="home">
    <el-container>
      <el-aside width="200px" class="aside">
        <my-aside></my-aside>
      </el-aside>
      <el-container>
        <el-header class="header">
          <my-header></my-header>
        </el-header>
        <el-main class="mian">
          <my-main></my-main>
        </el-main>
        <el-footer>
          <!-- 播放器control -->
          <control-bar></control-bar>
        </el-footer>
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
import controlBar from '@/components/components/controlBar/controlBar.vue'
export default defineComponent({
  name: 'home',
  components: {
    myHeader,
    myAside,
    myMain,
    controlBar
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
  background-color: #ececec;
}
.mian {
  height: calc(100vh - 120px);
}
.el-footer {
  padding: 0;
}
</style>
