<template>
  <div class="tabs">
    <template v-for="(item, index) in tabsList" :key="item.name">
      <div
        class="tab-item"
        :class="currentIndex === index ? 'active' : ''"
        @click="clickTabsHandle(index)"
      >
        <span>{{ item.title }}</span>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    tabsList: {
      type: Array,
      required: true
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  emits: ['changeTabComponent'],
  setup(props, { emit }) {
    const clickTabsHandle = (index: number) => {
      // console.log(index)
      // 根据index 动态决定组件
      emit('changeTabComponent', index)
      // 并获取当前动态组件所需要的数据
    }

    return { clickTabsHandle }
  }
})
</script>

<style lang="less" scoped>
.tabs {
  display: flex;
  .tab-item {
    margin-left: 20px;

    font-weight: 700;
    font-size: 18px;
    cursor: pointer;
  }

  .tab-item:nth-child(1) {
    margin-left: 0;
  }
}
.active {
  color: #1dcf9f;
  span {
    border-bottom: solid 2px #1dcf9f;
  }
}
</style>
