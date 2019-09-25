const state = {
  editVideoInfo: {}
}

const mutations = {
  CHANGE_VIDEO_INFO(state, opt) {
    state.editVideoInfo = opt
  }
}

const actions = {
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
