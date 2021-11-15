<template>
  <div class="playList-detail">
    <div class="content">
      <!-- 头像 -->
      <div class="image">
        <img :src="playListInfo.image" alt="" />
      </div>
      <!-- 详情 -->
      <div class="detail">
        <h2 class="name">{{ playListInfo.name }}</h2>
        <!-- 创建者信息 -->
        <div class="artistInfo">
          <!-- 作者头像 -->
          <img
            :src="playListInfo.creatorImg + '?param=100y100'"
            style="margin-right: 10px; width: 36px; border-radius: 50%"
          />
          <div style="display: flex; flex-direction: column">
            <span>{{ playListInfo.creatorName }}</span>
            <div>
              <span style="color: #929292; font-size: 14px"
                >{{ playListInfo.type === 1 ? '发行于' : '更新于'
                }}{{ timeFormat(playListInfo.time) }} • {{ playListInfo.length }}首歌</span
              >
              <div v-if="playListInfo.type === 2" class="tags">
                <span v-for="item of playListInfo.tags" :key="item" style="margin-right: 10px"
                  >#{{ item }}</span
                >
              </div>
            </div>
          </div>
        </div>
        <!-- 描述 -->
        <span class="description">{{ playListInfo.description }}</span>
        <!-- 操作按钮 -->
        <div class="handle">
          <el-button class="bt-play discolour"><i class="iconfont icon-bofang"></i>播放</el-button>
          <el-button class="discolour"><i class="iconfont icon-xihuan"></i></el-button>
          <el-button class="discolour">•••</el-button>
        </div>
      </div>
    </div>

    <!-- 歌曲列表 -->
    <div class="musicList">
      <music-item :musicList="musicList"></music-item>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { useRoute } from 'vue-router'

import timeFormat from '@/utils/timeFormat'
import { getPlaylistById, getSongDetailById, playAble } from '@/network/api/musicHall'
import musicItem from '@/components/common/musicItem/musicItem.vue'

export default defineComponent({
  components: {
    musicItem
  },
  name: 'playList',
  setup() {
    const route = useRoute()
    const state = reactive({
      playListInfo: {}
    })
    const musicList = ref<any>([])
    // let playMusicList: any = []
    const getPlaylistData = async () => {
      const params = { id: route.params.id }
      // const res = await getPlaylistById(params)
      const { playlist } = await getPlaylistById(params)
      // 获取歌单信息
      getPlayListInfo(playlist)
      // console.log(res)
      // 获取歌单中每个歌曲的信息
      getMusicList(playlist.trackIds)
      // state.playMusicList = playlist.trackIds
    }
    // 获取歌单具体信息
    const getPlayListInfo = (playList: any) => {
      const info = {
        name: playList.name,
        image: playList.coverImgUrl,
        description: playList.description,
        creatorName: playList.creator.nickname,
        creatorImg: playList.creator.avatarUrl,
        time: playList.updateTime,
        length: playList.trackCount,
        type: 2
      }
      state.playListInfo = info
    }
    // 获取音乐歌曲列表
    const getMusicList = async (list: any) => {
      // playMusicList = []
      // let playIndex = 0
      let ids = ''
      for (let i = 0; i < list.length; i += 50) {
        ids = ''
        if (i + 50 < list.length) {
          for (const item of list.slice(i, i + 50)) {
            ids += item.id + ','
          }
        } else {
          for (const item of list.slice(i, list.length)) {
            ids += item.id + ','
          }
        }

        const param = { ids: ids.slice(0, ids.length - 1) }
        await getSongDetailById(param).then((res: any) => {
          console.log(res)

          if (res.code === 200) {
            const songs = res.songs
            const details = []
            for (const [index, item] of songs.entries()) {
              // 获取需要的歌曲信息
              const song: any = {
                index: index,
                id: item.id,
                name: item.name,
                artist: item.ar,
                album: item.al,
                mvId: item.mv,
                duration: item.dt / 1000,
                publishTime: item.publishTime,
                privileges: res.privileges[index],
                fee: item.fee,
                noCopyrightRcmd: item.noCopyrightRcmd,
                canPlay: null,
                listId: 'playList' + route.params.id
              }
              song.canPlay = playAble(song) //判断歌曲是否可播放
              details.push(song)
              //   if (song.canPlay.able) {
              //     song.index = playIndex
              //     playIndex++
              //     playMusicList.push(song)
              //   }
            }
            musicList.value = musicList.value.concat(details)
          }
        })
      }
      // console.log(ids)
      // if (isPlayAll) {
      //   isPlayAll = false
      //   store.commit('setMusicList', playMusicList)
      // }
    }
    getPlaylistData()
    return { ...toRefs(state), timeFormat, musicList }
  }
})
</script>

<style lang="less" scoped>
.playList-detail {
  .content {
    display: flex;
    justify-content: space-between;

    .image {
      width: 280px;
      height: 280px;
      img {
        width: 100%;
        border-radius: 15px;
      }
    }
    .detail {
      margin-left: 60px;
      flex: 1;
      h2 {
        font-size: 30px;
      }
      .artistInfo {
        display: flex;
        margin-bottom: 40px;
      }
      .description {
        color: #929292;
        font-size: 14px;
      }
      .handle {
        margin-top: 40px;
      }
    }
  }
  .musicList {
    margin-top: 50px;
  }
}
.discolour:hover {
  color: #1dcf9f;
}
</style>
