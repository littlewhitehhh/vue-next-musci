<template>
  <div class="footer">
    <!-- 进度条组件 -->

    <!-- control-bar -->
    <div class="control-bar">
      <!-- 左侧 -->

      <div class="bar-left">
        <!-- <img src="@/assets/img/cover.png" alt="" /> -->
        <!-- 头像 -->
        <div class="cover" style="position: relative">
          <img :src="imgUrl" alt="" class="cover-image" />
          <div class="cover-mask">
            <!-- 图标 -->
          </div>
        </div>

        <!-- 音乐名 作者 专辑 -->
        <div style="display: flex; flex-direction: column; margin-left: 10px; width: 100%">
          <div class="display: flex;align-items:center;width: 100%">
            <span class="music-name">{{ currentMusic.al?.name ?? 'Ping音乐' }}</span>
            <!-- 收藏 -->
          </div>

          <div>
            <span v-if="!currentMusic">修勾</span>
            <div v-else class="artist">
              <span
                v-for="(item, index) in currentMusic?.ar"
                :key="item.id"
                style="font-size: 14px; cursor: pointer"
              >
                <span class="discolour">{{ item.name }} </span>
                <span v-if="index !== currentMusic?.ar.length - 1">/</span>
              </span>
              <span> - </span>
              <span class="discolour">{{ currentMusic?.al?.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 中间 -->
      <div class="bar-center">
        中间
        <div>
          <!-- 播放方式 单曲 顺序 乱序 -->
          <i class="iconfont icon-shangyishou"></i>
          <i class="iconfont icon-kuaijin"></i>
          <i class="iconfont icon-zanting"></i>
          <i class="iconfont icon-weibiaoti518"></i>
          <i class="iconfont icon-danquxunhuan"></i>
          <i class="iconfont icon-xunhuan"></i>
          <i class="iconfont icon-shengyinkai"></i>
          <i class="iconfont icon-24gl-shuffle"></i>
          <i class="iconfont icon-bofangliebiao"></i>
          <i class="iconfont icon-bofangduilie"></i>
          <!-- 上一首 -->

          <!-- 暂停 -->
          <!-- 下一首 -->
          <!-- 音量 -->
          <div class="volume">
            <!-- icon -->
            <!-- 音量进度条 -->
          </div>
        </div>
      </div>

      <!-- 右侧 -->
      <div class="bar-right">
        右侧
        <!-- 时间 -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()

    const imgUrl = ref()
    // 当前正在播放的歌曲

    const currentMusic = computed(() => {
      return store.state.currentMusic
    })
    const musicList = computed(() => {
      return store.state.MusicList
    })

    watch(currentMusic, () => {
      imgUrl.value = currentMusic.value?.al.picUrl
    })
    return { currentMusic, musicList, imgUrl }
  }
})
</script>

<style lang="less" scoped>
.control-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.bar-left {
  min-width: calc((100% - 300px) / 2);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .cover {
    img {
      border-radius: 5px;
      width: 48px;
      height: 48px;
    }
  }
  .discolour {
    cursor: pointer;
    color: #ccc;
    font-size: 13px;
  }
  .discolour:hover {
    color: #1dcf9f;
  }
}
</style>
