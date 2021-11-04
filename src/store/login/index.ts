import type { Module } from 'vuex'
import { ILoginState } from '../login/types'

import { LoginByPhone } from '@/network/api/login'

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
      isLogin: false
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
    }
  },
  actions: {
    async accountLoginAction({ commit }, params: any) {
      // 登录
      const loginResult = await LoginByPhone(params)
      console.log(loginResult)
      if (loginResult.code === 200) {
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
      }
    }
  },
  getters: {}
}

export default login
