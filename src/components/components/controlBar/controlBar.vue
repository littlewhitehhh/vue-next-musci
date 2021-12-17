<template>
  <div>
    <!-- 进度条 -->
    <!-- <ProgressBar origin-key="controlBar" @jumpTo="jumpTo" /> -->
    <div class="control-bar">
      <!-- 左侧 -->
      <div class="bar-left">
        <!-- 头像 -->
        <div style="position: relative" class="cover" @click="showPlayView">
          <img :src="imgUrl" :type="0" class="cover-image" />
          <div class="cover-mask">
            <i
              class="iconfont icon-xiangshang"
              name="upShow"
              style="width: 100%; height: 100%; padding: 30%"
            ></i>
          </div>
        </div>
        <!-- 音乐名 作者 专辑 -->
        <div style="display: flex; flex-direction: column; margin-left: 10px; width: 100%">
          <div style="display: flex; align-items: center; width: 100%">
            <span class="music-name">{{ currentMusic?.name ?? 'Ping音乐' }}</span>
            <!-- <svg-icon
              v-if="currMusic"
              name="love"
              :class="likeList.indexOf(currentMusic?.id) !== -1 ? 'like-active' : 'like'"
              @click="setLike"
            /> -->
          </div>

          <div>
            <span v-if="!currentMusic">修勾🐕</span>
            <div v-else class="artist">
              <span
                v-for="(item, index) of currentMusic?.ar"
                :key="item.id"
                style="font-size: 14px; cursor: pointer"
              >
                <span v-artist="item?.id" class="discolour">{{ item?.name }}</span>
                <span v-if="index !== currentMusic?.ar.length - 1">/</span>
              </span>
              <span> - </span>
              <span v-album="currentMusic?.al?.id" class="discolour">{{
                currentMusic?.al?.name
              }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="bar-center">
        <div>
          <!-- 播放方式 单曲 顺序 乱序 -->
          <!-- <svg-icon
            :name="modeList[mode]"
            class="discolour"
            style="font-size: 20px"
            @click="switchMode"
          /> -->
          <i
            class="iconfont discolour"
            :class="modeList[0].icon"
            style="font-size: 20px"
            @click="switchMode"
          ></i>
        </div>
        <!-- 上一首 -->
        <!-- <svg-icon name="prev" class="discolour prev-button" style="font-size: 22px" @click="prev" /> -->
        <!-- 暂停 -->
        <!-- <svg-icon
          :name="state ? 'pause' : 'play'"
          style="font-size: 40px; color: var(--primary-color); cursor: pointer"
          @click="changeState"
        /> -->
        <!-- 下一首 -->
        <!-- <svg-icon name="next" class="discolour next-button" style="font-size: 22px" @click="next" /> -->
        <!-- 音量 -->
        <div class="volume">
          <!-- <svg-icon
            :name="mute ? 'volume_mute' : 'volume'"
            class="discolour"
            style="font-size: 20px"
            @click="volumeMute"
          /> -->

          <!-- 音量进度条-->
          <!-- <VolumeBar v-show="!mute" class="volumeBar" origin-key="controlBar" /> -->
        </div>
      </div>
      <div class="bar-right">
        <!-- 时间 -->
        <span style="margin-right: 10px">{{ currFormat }} / {{ totalFormat }}</span>

        <!-- <svg-icon name="lyric" class="discolour" style="font-size: 19px; margin: 0 10px" /> -->
        <!-- <svg-icon name="music-list" class="discolour" style="font-size: 22px" @click="showDrawer" /> -->
        <!-- <span style="font-size: 10px">{{ musicList.length }}</span> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ref } from 'vue'
import { useStore } from 'vuex'
// import ProgressBar from '@/components/ProgressBar.vue'
// import VolumeBar from '@/components/VolumeBar.vue'
// import coverImage from '@/assets/image/cover.png'
// import timeFormat from '@/utils/timeFormat'
// import Image from '@/components/global/Image.vue'
// import { likeMusic } from '@/api/music'/
export default defineComponent({
  name: 'ControlBar',
  components: {
    // Image,
    // ProgressBar,
    // VolumeBar
  },
  setup() {
    const store = useStore()
    const currFormat = ref('00:00')
    const totalFormat = ref('00:00')
    const jump = ref(0)
    const modeList = [
      {
        mode: 'order',
        icon: 'icon-bofangliebiao'
      },
      {
        mode: 'loop',
        icon: 'icon-xunhuan'
      },
      {
        mode: 'random',
        icon: 'icon-24gl-shuffle'
      },
      {
        mode: 'single',
        icon: 'icon-danquxunhuan'
      }
    ]
    const imgUrl = ref()

    // const state = computed(() => store.state.audio.state)
    // const currentDura = computed(() => store.state.audio.currentTime)
    // const totalDura = computed(() => store.state.audio.duration)
    const mode = computed(() => store.state.audio.mode)
    // const mute = computed(() => store.state.audio.mute)
    const musicList = computed(() => store.state.MusicList)
    const currentMusic = computed(() => store.state.currentMusic)
    // const likeList = computed(() => store.state.likeList)

    // watch(currentDura, () => {
    //   currFormat.value = timeFormat(currentDura.value)
    // })

    // watch(totalDura, () => {
    //   totalFormat.value = timeFormat(totalDura.value)
    // })

    watch(currentMusic, () => {
      imgUrl.value = currentMusic.value?.al.picUrl + '?param=800y800'
    })

    // const showPlayView = () => {
    //   store.commit('setShowPlayView', true)
    // }
    const switchMode = () => {
      let param = {}
      if (mode.value !== modeList.length - 1) {
        param = { prop: 'mode', value: mode.value + 1 }
      } else {
        param = { prop: 'mode', value: 0 }
      }
      store.commit('setAudio', param)
    }
    // const changeState = () => {
    //   const param = { prop: 'state', value: !state.value }
    //   store.commit('setAudio', param)
    // }
    // const jumpTo = (value: number) => {
    // jump.value = value
    // }
    // const volumeMute = () => {
    // const param = { prop: 'mute', value: !mute.value }
    // store.commit('setAudio', param)
    // }
    // const prev = () => {
    // const param = { prop: 'prev', value: true }
    // store.commit('setAudio', param)
    // }
    // const next = () => {
    // const param = { prop: 'next', value: true }
    // store.commit('setAudio', param)
    // }
    // const showDrawer = () => {
    // ctx.emit('showDrawer')
    // }

    // const setLike = () => {
    // const param = {
    // id: currMusic.value?.id,
    // like: false
    // }
    // const index = likeList.value.indexOf(currMusic.value?.id)
    // if (index === -1) {
    //   param.like = true
    // }
    //   likeMusic(param).then((res: any) => {
    //     if (res.code === 200) {
    //       const ids: any = [].concat(likeList.value)
    //       if (index === -1) {
    //         ids.push(param.id)
    //       } else {
    //         ids.splice(index, 1)
    //       }
    //       store.commit('setLikeList', ids)
    //     }
    //   })
    // }

    return {
      // state,
      imgUrl,
      currentMusic,
      modeList,
      // mode,
      // mute,
      jump,
      musicList,
      currFormat,
      totalFormat,
      // likeList,
      // showPlayView,
      // changeState,
      switchMode
      // jumpTo,
      // volumeMute,
      // prev,
      // next,
      // showDrawer,
      // setLike
    }
  }
})
</script>

<style lang="less" scoped>
.control-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.bar-left {
  min-width: calc((100% - 300px) / 2);
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.bar-center {
  width: 250px;
  min-width: 250px;
  margin: 0 25px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.bar-right {
  min-width: calc((100% - 300px) / 2);
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
.cover {
  border: 1px solid #ededed;
  overflow: hidden;
  min-width: 50px;
  min-height: 50px;
  max-width: 50px;
  max-height: 50px;
}
.cover-image {
  transition: 0.3s;
  /*border-radius: 2px;*/
}
.cover-mask {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  /*background: #fafafa;*/
  color: #ffffff;
  transition: 0.3s;
  opacity: 0;
  line-height: 50px;
  i {
    font-size: 20px;
  }
}
.cover:hover .cover-image {
  filter: blur(3px);
}
.cover:hover .cover-mask {
  opacity: 1;
}
.music-name {
  max-width: 90%;
  font-size: 18px;
  font-weight: bolder;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.artist {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.like {
  margin-left: 20px;
  color: #cccccc;
  cursor: pointer;
}
.like:hover {
  color: var(--primary-color);
}
.like-active {
  margin-left: 20px;
  color: red;
  cursor: pointer;
}

.prev-button {
  color: #3f3f3f;
  margin: 0 20px 0 30px;
}

.next-button {
  color: #3f3f3f;
  margin: 0 30px 0 20px;
}
.volume {
  /*width: 150px;*/
  /*display: flex;*/
  /*align-items: center;*/
  position: relative;
}
.volumeBar {
  width: 0;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  transition: 0.3s;
}
.volume:hover .volumeBar {
  width: 100px;
}
</style>
