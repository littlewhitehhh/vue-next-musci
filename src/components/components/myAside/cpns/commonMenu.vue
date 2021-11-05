<template>
  <div class="commonMenu">
    <div class="music-menu">
      <span class="title">{{ title }}</span>
      <!-- {{ menuList }} -->
      <!-- menulist -->
      <template v-for="listItem in menuList" :key="listItem.path">
        <el-menu-item :index="listItem.path" @click="clickHandle(listItem.path)">
          <i class="iconfont" :class="listItem.icon"></i>
          <span>{{ listItem.name }}</span>
        </el-menu-item>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'commonMenu',
  props: {
    menuList: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  emits: ['changeActivePath'],
  setup(props, { emit }) {
    const clickHandle = (path: string) => {
      // console.log('111')
      // console.log(path)

      emit('changeActivePath', path)
    }
    return {
      clickHandle
    }
  }
})
</script>

<style lang="less" scoped>
.commonMenu {
  .music-menu {
    margin: 20px 10px 0 10px;
    .title {
      font-size: 12px;
      color: #ccc;
    }
    .el-menu {
      margin-top: 10px;
    }
    .el-menu-item {
      margin-top: 10px;
      height: 50px;
      line-height: 50px;
      border-radius: 10px;
      .iconfont {
        margin-right: 10px;
        font-size: 18px;
      }
    }
    .el-menu-item:hover {
      background-color: #1dcf9f;
    }
    .el-menu-item.is-active {
      background-color: #1dcf9f;
    }
  }
}
</style>
