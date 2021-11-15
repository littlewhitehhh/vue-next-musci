<template>
  <div class="musiclist-page">
    <music-item :musicList="musicList"></music-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

import { getArtistsTopSongs, playAble } from '@/network/api/musicHall'

import musicItem from '@/components/common/musicItem/musicItem.vue'
export default defineComponent({
  components: {
    musicItem
  },
  props: {
    artistId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const musicList = ref<any>([])
    const getMusicListData = async () => {
      let res = await getArtistsTopSongs(props.artistId)
      console.log(res)
      setMusicList(res.songs)
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
    getMusicListData()
    watch(
      () => props.artistId,
      () => {
        getMusicListData()
      }
    )
    return { musicList }
  }
})
</script>

<style lang="less" scoped>
.musiclist-page {
  margin-top: 20px;
}
</style>
