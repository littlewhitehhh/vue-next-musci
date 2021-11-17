import { createStore } from 'vuex'
import { searchHot } from '@/network/api/search'
import { getMusicDetail } from '@/network/api/playMusic'

import login from './login/index'
import music from './music'
import video from './video/index'
export default createStore({
  state: {
    // 热搜列表
    hotSearchList: [],

    // 当前正在播放的歌曲
    currentMusic: {},
    // 当前正在播放的歌单
    MusicList: []
  },
  mutations: {
    // 热搜列表
    changehotSearchList(state, hotSearchList: any) {
      state.hotSearchList = hotSearchList.data
      // console.log(hotSearchList)
    },
    setMusicList(state, musicList) {
      state.MusicList = musicList
    },
    setCurrMusic(state, currentMusic) {
      state.currentMusic = currentMusic[0]
    }
  },
  actions: {
    // 获取是热搜榜
    async gethotSearchList({ commit }) {
      const hotSearchList = await searchHot()
      commit('changehotSearchList', hotSearchList)
    },
    //获取当前歌单详情
    async getMusicList({ commit }, params) {
      const { songs } = await getMusicDetail(params.ids)

      // console.log(res)
      commit('setMusicList', songs)
    },
    // 获取播放的歌曲的详情
    async getCurrMusic({ commit }, params) {
      const { songs } = await getMusicDetail(params.id)
      const res = await getMusicDetail(params.id)
      console.log(res)
      commit('setCurrMusic', songs)
    }
  },
  modules: { login, music, video }
})
