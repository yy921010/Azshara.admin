import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import content from './modules/content'
import image from './modules/image'
import errorMessage from './modules/error_message'
import client from './modules/client'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    content,
    image,
    errorMessage,
    client
  },
  getters
})

export default store
