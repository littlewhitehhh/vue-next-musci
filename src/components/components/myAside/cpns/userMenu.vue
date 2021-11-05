<template>
  <div class="userMenu">
    <div class="music-menu">
      <span class="title">{{ title }}</span>
      <!-- menulist -->

      <template v-for="listItem in menuList" :key="listItem.id">
        <el-menu-item :index="`/playList/${listItem.id}`" @click="clickHandle">
          <span>{{ listItem.name }}</span>
        </el-menu-item>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'userMenu',
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
      // console.log(path)
      emit('changeActivePath', path)
    }
    return { clickHandle }
  }
})
</script>

<style lang="less" scoped>
.userMenu {
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
      height: 20px;
      line-height: 20px;
      font-size: 13px;
      border-radius: 5px;

      span {
        display: block;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
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
