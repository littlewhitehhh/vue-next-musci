<template>
  <div class="hot-page">
    <!-- 最新发布 -->
    <div class="first">
      <h2>最新发布</h2>
      <div>
        <span class="h2" style="margin-right: 10px"
          >TOP 20 <i class="el-icon-video-play"></i>
        </span>
        <music-block :musicList="musicList"></music-block>
      </div>
    </div>

    <!-- 推荐专辑 -->
    <div class="second">
      <span class="h2" style="margin-right: 10px">推荐专辑 </span>
      <playlist-item :playlist="albumList"></playlist-item>
    </div>

    <!-- 热门视频 -->

    <!-- 相似歌手 -->
    <div class="fouth">
      <span class="h2" style="margin-right: 10px">相似歌手 </span>
      <singer-item :artistsList="simiArtistsList" @goToArtist="goToArtistPage"></singer-item>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import {
  getArtistsTopSongs,
  playAble,
  getArtistsAlbum,
  getSimiArtists
} from '@/network/api/musicHall'

import musicBlock from '@/components/common/musicBlock/musicBlock.vue'
import playlistItem from '@/components/common/playlistItem/playlistItem.vue'
import singerItem from '@/components/common/singerItem/singerItem.vue'

export default defineComponent({
  components: {
    musicBlock,
    playlistItem,
    singerItem
  },
  props: {
    artistId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    const musicList = ref<any>([])
    const albumList = ref<any>([])
    const simiArtistsList = ref<any>([])
    const getHotData = async () => {
      // top20
      let res = await getArtistsTopSongs(props.artistId)
      // console.log(res.songs)
      setMusicList(res.songs)
      // 推荐专辑
      const params = {
        id: props.artistId,
        limit: 10
      }
      let res2 = await getArtistsAlbum(params)
      // console.log(res2)
      // 直接接受了  不修改数据了
      albumList.value = res2.hotAlbums

      // 相似歌手
      let res3 = await getSimiArtists(props.artistId)
      // console.log(res3)
      simiArtistsList.value = res3.artists
    }
    const setMusicList = (list: any) => {
      const songList = []
      for (const [index, item] of list.entries()) {
        const song: any = {
          index: index,
          id: item.id,
          name: item.name,
          artist: item.ar,
          album: item.al,
          mvId: item.mv,
          duration: item.dt / 1000,
          publishTime: item.publishTime,
          privileges: item.privileges,
          fee: item.fee,
          noCopyrightRcmd: item.noCopyrightRcmd,
          canPlay: null,
          listId: 'hotMusic' + props.artistId
        }
        song.canPlay = playAble(song)
        songList.push(song)
      }
      musicList.value = songList.slice(0, 20)
    }
    getHotData()

    // const goToArtistPage = (id: number) => {
    //   console.log(id)
    //   router.push('/artist/' + id)
    // }
    const goToArtistPage = (id: number) => {
      router.push('/artist/' + id)
    }

    watch(
      () => props.artistId,
      () => {
        getHotData()
      }
    )
    return { musicList, albumList, simiArtistsList, goToArtistPage }
  }
})
</script>

<style lang="less" scoped>
.h2 {
  text-align: center;
  font-size: 22px;
  font-weight: 700;
  margin-right: 10px;
  cursor: pointer;
  i.icon {
    font-weight: 700;
    color: #1dcf9f;
  }
}
</style>
