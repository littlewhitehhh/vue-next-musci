<template>
  <div class="my-aside">
    <div class="logo">
      <img class="image" src="@/assets/img/logo.png" alt="" />
      <span class="title">音乐demo</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'myAside',
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.logo {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;

  .image {
    border-radius: 50%;
    width: 40px;
    margin: 10px;
  }
  .title {
    color: red;
    font-size: 20px;
  }
}
</style>
