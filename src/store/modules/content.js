import content from '@api/Content'
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
  ratingsRender: [
    {
      label: 'G',
      value: 1
    },
    {
      label: 'PG',
      value: 8
    }, {
      label: 'PG-13',
      value: 13
    },
    {
      label: 'R',
      value: 16
    },
    {
      label: 'NC-17',
      value: 18
    }
  ],
  genres: [
    '动作',
    '冒险',
    '艺术',
    '传记',
    '喜剧',
    '纪录',
    '剧情',
    '惊悚',
    '歌舞',
    '悬疑',
    '爱情',
    '科幻'
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
    await content.add(contentItem)
  },

  async getContent({ commit }, pageNumber = 1) {
    const pageSize = 20
    const contentData = await content.get(Object.assign({
      pageSize,
      pageNumber
    }, {}))
    commit('SET_CONTENT', contentData)
  },

  async delContent({ commit }, contentId) {
    await content.delete(contentId)
    commit('DEL_CONTENT_BY_ID', contentId)
  },

  async editContent({ commit }, contentData) {
    await content.update(contentData)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
