<template>
  <div class="Laederboard">
    <!-- <div v-if="topList.length > 0"> -->
    <div class="container">
      <!-- 超级榜 -->
      <span class="h2">超级榜</span>
      <div class="super-list">
        <template v-for="item in superList" :key="item.id">
          <div class="super-list-item">
            <div class="left">
              <img :src="item.coverImgUrl" alt="" />
            </div>
            <div class="right">
              <span class="title">{{ item.name }}</span>
              <template v-for="(trackItem, index) in item.tracks" :key="trackItem.id">
                <div class="track-item">
                  <span class="index"
                    ><em>{{ index + 1 }}</em></span
                  >
                  <span class="content">{{ trackItem.first }} - {{ trackItem.second }}}</span>
                </div>
              </template>
            </div>
          </div>
        </template>
      </div>
      <span class="h2">云听榜</span>
      <div class="cloud-list">
        <template v-for="item in cloudList" :key="item.id">
          <div class="cloud-list-item">
            <img :src="item.coverImgUrl" alt="" />
            <span class="title">{{ item.name }}</span>
          </div>
        </template>
      </div>
      <span class="h2">全球榜</span>
      <div class="cloud-list">
        <template v-for="item in globalList" :key="item.id">
          <div class="cloud-list-item">
            <img :src="item.coverImgUrl" alt="" />
            <span class="title">{{ item.name }}</span>
          </div>
        </template>
      </div>
      <span class="h2">花样榜</span>
      <div class="cloud-list">
        <template v-for="item in patternList" :key="item.id">
          <div class="cloud-list-item">
            <img :src="item.coverImgUrl" alt="" />
            <span class="title">{{ item.name }}</span>
          </div>
        </template>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script lang="ts">
import { defineComponent, computed, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    // interface stateType {
    //   superList: any[]
    // }
    const store = useStore()
    const state = reactive({
      superList: computed(() => {
        return store.state.music.superList
      }),
      cloudList: computed(() => {
        return store.state.music.cloudList
      }),
      globalList: computed(() => {
        return store.state.music.globalList
      }),
      patternList: computed(() => {
        return store.state.music.patternList
      })
    })
    store.dispatch('music/getLeaderboardDate')
    const toplist = computed(() => {
      return store.state.music.toplist
    })

    return { toplist, ...toRefs(state) }
  }
})
</script>

<style lang="less" scoped>
.Laederboard {
  margin-top: 20px;
  .h2 {
    font-size: 22px;
    font-weight: 700;
  }
  .super-list {
    display: grid;
    grid-template-columns: repeat(2, 48%);
    grid-gap: 20px 20px;
    margin: 20px 0;

    .super-list-item {
      height: 167px;
      display: flex;
      cursor: pointer;
      .left {
        width: 167px;
        img {
          width: 100%;
          border-radius: 15px;
        }
      }
      .right {
        padding: 15px 0;
        margin-left: 20px;
        .title {
          font-weight: 700;
          font-size: 22px;
        }
        .track-item {
          margin-top: 10px;
          .index {
            color: red;
            padding-right: 10px;
          }
          .content {
            font-size: 14px;
            color: #525151;
          }
        }
      }
    }
  }
  .cloud-list {
    display: grid;
    grid-template-columns: repeat(6, 15%);
    grid-gap: 20px 20px;
    margin: 20px 0;

    .cloud-list-item {
      cursor: pointer;
      text-align: center;
      img {
        width: 100%;
        border-radius: 15px;
      }
      .title {
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: block;
      }
    }
  }
}
</style>
