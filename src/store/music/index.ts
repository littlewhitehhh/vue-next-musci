import type { Module } from 'vuex'
import { IMusicState } from './type'

import {
  getBanner,
  getRecommendPlaylist,
  getPrivateConentList,
  getRcmdPlaylsit,
  getRcmdMV
} from '@/network/api/musicHall'

const music: Module<IMusicState, any> = {
  namespaced: true,
  state() {
    return {
      // 轮播图
      banners: [],
      //推荐歌单
      recommendPlaylist: [],
      // 独家放送
      privateContentList: [],
      // 音乐先听列表（新音乐）
      rcmdNewPlaylsit: [],
      //推荐mv
      rcmdMVlist: []
    }
  },
  mutations: {
    // 轮播图数据
    saveBanners(state, banners) {
      state.banners = banners
    },
    // 推荐歌单
    saveRecommendPlaylist(state, result) {
      state.recommendPlaylist = result
    },
    // 独家放送
    savePrivatecontentList(state, privatecontentList) {
      state.privateContentList = privatecontentList
    },
    // 获取推荐新音乐列表(推荐音乐先听)
    saveRcmdNewPlaylsit(state, rcmdNewPlaylsit) {
      state.rcmdNewPlaylsit = rcmdNewPlaylsit
    },
    saveRcmdMVlist(state, rcmdMVlist) {
      state.rcmdMVlist = rcmdMVlist
    }
  },
  actions: {
    // 动态组件获取所需数据
    async getFeaturedData({ commit }) {
      // 1、获取轮播图数据
      const { banners } = await getBanner()
      // console.log(res)
      commit('saveBanners', banners)

      // 2、 获取推荐歌单
      const { result } = await getRecommendPlaylist()
      // console.log(result)
      commit('saveRecommendPlaylist', result)

      // 3、获取独家放送
      const { result: privatecontentList } = await getPrivateConentList()
      commit('savePrivatecontentList', privatecontentList)
      // console.log(privatecontentList)

      // 获取音乐先听（推荐新音乐）
      const { result: rcmdPlaylsit } = await getRcmdPlaylsit()
      // console.log(rcmdPlaylsit)
      commit('saveRcmdNewPlaylsit', rcmdPlaylsit)

      //获取推荐mv
      const { result: rcmdMVlist } = await getRcmdMV()
      commit('saveRcmdMVlist', rcmdMVlist)
    }
  },
  getters: {}
}

export default music
