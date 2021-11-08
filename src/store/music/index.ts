import type { Module } from 'vuex'
import { IMusicState } from './type'

import { getBanner, getRecommendPlaylist } from '@/network/api/musicHall'

const music: Module<IMusicState, any> = {
  namespaced: true,
  state() {
    return {
      // 轮播图
      banners: [],
      //推荐歌单
      recommendPlaylist: []
    }
  },
  mutations: {
    // 轮播图数据
    saveBanners(state, banners) {
      state.banners = banners
    },
    saveRecommendPlaylist(state, result) {
      state.recommendPlaylist = result
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
    }
  },
  getters: {}
}

export default music
