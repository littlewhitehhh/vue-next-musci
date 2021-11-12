import { createStore } from 'vuex'
import { searchHot } from '@/network/api/search'

import login from './login/index'
import music from './music'
import video from './video/index'
export default createStore({
  state: {
    hotSearchList: []
  },
  mutations: {
    changehotSearchList(state, hotSearchList: any) {
      state.hotSearchList = hotSearchList.data
      // console.log(hotSearchList)
    }
  },
  actions: {
    async gethotSearchList({ commit }) {
      const hotSearchList = await searchHot()
      commit('changehotSearchList', hotSearchList)
    }
  },
  modules: { login, music, video }
})
