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
  getAllPrivateConentList,
  getTopList,
  getArtist,
  getNewSongs
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
      allPrivateContentList: [],
      // 获取排行榜单
      toplist: [],
      superList: [], //超级榜
      cloudList: [], //云听榜
      globalList: [], //全球榜
      patternList: [], //花样榜
      artistsList: [], //歌手列表
      newSongsList: [] //新歌速递
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
    },

    //排行榜单
    saveToplist(state, list) {
      state.toplist = list
      state.superList = []
      state.cloudList = []
      state.patternList = []
      state.globalList = []
      //对排行榜单进行分类处理
      for (const [index, item] of list.entries()) {
        // 先清空后赋值
        // console.log(index, item) // 0：item

        if (index < 4) {
          state.superList.push(item)
        } else if (item.name.indexOf('云音乐') !== -1 || item.name.indexOf('语榜') !== -1) {
          state.cloudList.push(item)
        } else {
          switch (item.name) {
            case '黑胶VIP爱听榜':
            case 'KTV唛榜':
            case '中国新乡村音乐排行榜':
            case '潜力爆款榜':
            case '听歌识曲榜':
            case '网络热歌榜':
              state.patternList.push(item)

              break
            default:
              state.globalList.push(item)

              break
          }
        }
      }
    },
    // 歌手名单
    savaArtistsList(state, artists) {
      state.artistsList = artists
    },
    // 新歌列表
    saveNewSongsList(state, newSongsList) {
      state.newSongsList = newSongsList
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
      // console.log(allPrivatecontentList)
      commit('saveAllPrivatecontentList', allPrivatecontentList)
    },

    // 获取排行榜数据
    async getLeaderboardDate({ commit }) {
      const { list } = await getTopList()
      // console.log(list)
      commit('saveToplist', list)
    },

    // 获取歌手页面数据
    async getArtistData({ commit }, params) {
      const { artists } = await getArtist(params)
      // console.log(artists)
      commit('savaArtistsList', artists)
    },

    // 获取新歌速递页面数据
    async getNewSongsData({ commit }, params) {
      const { data } = await getNewSongs(params)
      // console.log(data)
      commit('saveNewSongsList', data)
    }
  },
  getters: {}
}

export default music
