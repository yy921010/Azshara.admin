import { deleteImage } from '@api/image-service'
const state = {
  previewPictures: []
}

const mutations = {
  CLEAR_PICTURE(state) {
    state.previewPictures = []
  },
  ADD_PICTURE_ARR(state, object) {
    state.previewPictures.push(object)
  },
  DELETE_PICTURE_BY_ID(state, pictureId) {
    state.previewPictures = state.previewPictures.filter(item => item.id !== pictureId)
  }
}

const actions = {
  async deletePicture({ commit }, pictureId) {
    await deleteImage(pictureId)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
