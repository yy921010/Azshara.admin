import { login, logout, getInfo } from '@/api/user-service'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  avatar: '',
  username: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.username = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  }
}

const actions = {
  // user login
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then(response => {
          commit('SET_TOKEN', response.access_token)
          commit('SET_USERNAME', username)
          sessionStorage.setItem('username', username)
          setToken(response.access_token)
          resolve()
        }).catch(error => {
          reject(error)
        })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      const username = state.username ? state.username : sessionStorage.getItem('username')
      getInfo(username).then(response => {
        const { userName, avatar } = response
        commit('SET_NAME', userName)
        commit('SET_AVATAR', avatar)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      const client64 = process.env.VUE_APP_DEVICE_TOKEN
      const clientString = atob(client64)
      const clientIds = clientString.split(':')
      logout({
        token: state.token,
        clientId: clientIds[0],
        clientSecret: clientIds[1]
      }).then(() => {
        commit('SET_TOKEN', '')
        sessionStorage.removeItem('username')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

