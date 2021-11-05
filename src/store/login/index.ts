import type { Module } from 'vuex'
import { ILoginState } from '../login/types'

import { LoginByPhone, getPlayList } from '@/network/api/login'

const login: Module<ILoginState, any> = {
  namespaced: true,
  state() {
    return {
      token: '',
      profile: {},
      bindings: [],
      account: {},
      cookie: '',
      loginType: 0,
      isLogin: false,
      playLsit: [],
      // 收藏的歌单
      collectionPlayList: [],
      // 创建的歌单
      createdPlayList: []
    }
  },
  mutations: {
    //changLoginState
    changeLoginState(state, isLogin) {
      state.isLogin = isLogin
    },
    // 获取token
    saveToken(state, token: string) {
      state.token = token
      // window.localStorage.setItem('token', token)
    },
    saveProfile(state, profile: any) {
      state.profile = profile
      // window.localStorage.setItem('userInfo', JSON.stringify(profile))
    },
    saveBindings(state, bindings: any[]) {
      state.bindings = bindings
      // window.localStorage.setItem('token', token)
    },
    saveAccount(state, account: any) {
      state.account = account
      // window.localStorage.setItem('account', JSON.stringify(profile))
    },
    saveCookie(state, cookie: string) {
      state.cookie = cookie
      // window.localStorage.setItem('token', token)
    },
    saveLoginType(state, loginType: number) {
      state.loginType = loginType
      // window.localStorage.setItem('token', token)
    },
    savePlayList(state, playlist: any[]) {
      state.playLsit = playlist
      // 先清空
      state.collectionPlayList = []
      state.createdPlayList = []
      //添加
      playlist.forEach((item) => {
        if (item.subscribed === false) {
          state.createdPlayList.push(item)
        } else {
          state.collectionPlayList.push(item)
        }
      })
    }
  },
  actions: {
    async accountLoginAction({ commit }, params: any) {
      // 登录
      const loginResult = await LoginByPhone(params)
      console.log(loginResult)
      if (loginResult.code === 200) {
        //1、登陆成功后，储存账号部分信息  头像 名称  id
        const { token, profile, bindings, account, cookie, loginType } = loginResult
        commit('changeLoginState', true)
        commit('saveToken', token)
        window.localStorage.setItem('token', token)

        commit('saveProfile', profile)
        window.localStorage.setItem('userInfo', JSON.stringify(profile))
        commit('saveBindings', bindings)
        commit('saveAccount', account)
        commit('saveCookie', cookie)
        commit('saveLoginType', loginType)

        //2、通过id获取用户歌单
        const { playlist } = await getPlayList({ uid: account.id })
        console.log(playlist)
        commit('savePlayList', playlist)
      }
    }
  },
  getters: {}
}

export default login
