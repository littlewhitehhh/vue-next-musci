<template>
  <div class="album-page">
    <playlist-item :playlist="albumList"></playlist-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { getArtistsAlbum } from '@/network/api/musicHall'
import playlistItem from '@/components/common/playlistItem/playlistItem.vue'
export default defineComponent({
  components: {
    playlistItem
  },
  props: {
    artistId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const albumList = ref<any>([])

    const params = { id: props.artistId, limit: 50 }
    const getAlbumData = async () => {
      let res = await getArtistsAlbum(params)
      console.log(res)
      albumList.value = res.hotAlbums
    }
    getAlbumData()
    watch(
      () => props.artistId,
      () => {
        getAlbumData()
      }
    )
    return { albumList }
  }
})
</script>

<style lang="less" scoped>
.album-page {
  margin-top: 20px;
}
</style>
