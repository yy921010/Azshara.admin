const state = {
  contentTypeRender: [
    {
      label: '电影',
      value: 1
    },
    {
      label: '电视剧',
      value: 2
    },
    {
      label: '动漫',
      value: 3
    },
    {
      label: '综艺',
      value: 4
    },
    {
      label: '子集',
      value: 5
    },
    {
      label: '短视频',
      value: 6
    }
  ],
  sortOption: [],
  contents: {},
  editContentObj: {}
}

const mutations = {
  SET_EDIT_CONTENT(state, data = {}) {
    state.editContentObj = data
  },
  SET_CONTENT(state, data = {}) {
    state.contents = data
  },

  DEL_CONTENT_BY_ID(state, id) {
    state.contents.items = state.contents.items.filter(contentItem => id !== contentItem.id)
  }
}

const actions = {

  async addContent({ commit }, contentItem) {
  },

  async getContent({ commit }, pageNumber = 1) {

  },

  async delContent({ commit }, contentId) {

  },

  async editContent({ commit }, contentData) {

  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
