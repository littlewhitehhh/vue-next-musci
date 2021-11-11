import type { Module } from 'vuex'
import { IMusicState } from './type'

import {
  getBanner,
  getRecommendPlaylist,
  getPrivateConentList,
  getRcmdPlaylsit,
  getRcmdMV,
  gethotTags,
  getTopPlaylist,
  // getHighqualityTags,
  getHighqualityPlaylist,
  getAllPrivateConentList
} from '@/network/api/musicHall'

const music: Module<IMusicState, any> = {
  namespaced: true,
  state() {
    return {
      // 轮播图
      banners: [],
      //推荐歌单
      recommendPlaylist: [],
      // 独家放送（入口列表）
      privateContentList: [],
      // 音乐先听列表（新音乐）
      rcmdNewPlaylsit: [],
      //推荐mv
      rcmdMVlist: [],
      //热门标签
      hotTags: [{ name: '全部', id: 1 }],
      // 热门歌单列表
      hotPlaylist: [],
      // 精品标签
      highqualityTags: [],
      // 精品歌单列表
      highqualityPlaylist: [],
      // 独家放送(全部)
      allPrivateContentList: []
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
    // 独家放送（入口列表）
    savePrivatecontentList(state, privatecontentList) {
      state.privateContentList = privatecontentList
    },
    // 获取推荐新音乐列表(推荐音乐先听)
    saveRcmdNewPlaylsit(state, rcmdNewPlaylsit) {
      state.rcmdNewPlaylsit = rcmdNewPlaylsit
    },
    // 推荐mv
    saveRcmdMVlist(state, rcmdMVlist) {
      state.rcmdMVlist = rcmdMVlist
    },
    //热门歌单标签
    saveHotTags(state, hotTags) {
      // 先清空
      state.hotTags = [{ name: '全部', id: 1 }]
      for (const item of hotTags) {
        state.hotTags.push(item)
      }
    },
    //热门歌单列表
    saveHotPlaylist(state, hotPlaylist) {
      state.hotPlaylist = hotPlaylist
    },
    // 精品歌单标签
    saveHighqualityTags(state, highqualityTags) {
      state.highqualityTags = highqualityTags
    },
    saveHighqualityPlaylist(state, highqualityPlaylist) {
      state.highqualityPlaylist = highqualityPlaylist
    },

    // 独家放送（全部）
    saveAllPrivatecontentList(state, allPrivatecontentList) {
      // for (const item of allPrivatecontentList) {
      //   state.allPrivateContentList.push(item)
      // }
      state.allPrivateContentList = allPrivatecontentList
    }
  },
  actions: {
    // 动态组件获取所需数据
    //获取featured页面数据
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
    },

    // 获取playlist页面数据
    async getPlayListData({ commit }, params) {
      // console.log(params)

      // 1、获取网友热碟热门标签
      const { tags } = await gethotTags()
      // console.log(tags)
      commit('saveHotTags', tags)

      // 2、获取网友热碟歌单列表
      const { playlists: hotPlaylist } = await getTopPlaylist(params)
      // console.log(hotPlaylist)
      commit('saveHotPlaylist', hotPlaylist)

      // 3、 获取精品推荐标签
      // const result = await getHighqualityTags()
      // console.log(result)

      // 4、获取精品歌单
      const { playlists: highqualityPlaylist } = await getHighqualityPlaylist(params)
      // console.log(highqualityPlaylist)
      commit('saveHighqualityPlaylist', highqualityPlaylist)
    },

    //获取独家放送页面数据
    async getPrivateContentData({ commit }) {
      // 获取独家放送列表
      const { result: allPrivatecontentList } = await getAllPrivateConentList({})
      console.log(allPrivatecontentList)
      commit('saveAllPrivatecontentList', allPrivatecontentList)
    }
  },
  getters: {}
}

export default music
