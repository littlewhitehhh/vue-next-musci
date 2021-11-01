import { createStore } from 'vuex'
import { searchHot } from '@/network/api/search'

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
  modules: {}
})
