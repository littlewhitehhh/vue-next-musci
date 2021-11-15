import { Module } from 'vuex'
import { IVideoType } from './type'

import { getAllMv } from '@/network/api/video'
const video: Module<IVideoType, any> = {
  namespaced: true,
  state() {
    return {
      allMvList: []
    }
  },
  mutations: {
    saveMvList(state, data) {
      state.allMvList = data
    }
  },
  actions: {
    async getVideoData({ commit }, params) {
      const { data } = await getAllMv(params)
      // console.log(data)
      commit('saveMvList', data)
    }
  },
  getters: {}
}

export default video
