<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
:root {
  // --primary-color: #1dcf9f;
  // --light-color: rgba(29, 207, 159, 0.1);
  /*--primary-color: rgb(244, 93, 93);*/
  --block-size: 230px;
  --block-num: 5;
  --page-width: 1000px;
}
::-webkit-scrollbar {
  width: 6px; /* 纵向滚动条*/
  height: 6px; /* 横向滚动条 */
  background-color: #fff;
}
</style>
