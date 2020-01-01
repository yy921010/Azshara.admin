import { Message } from 'element-ui'
const state = {
  messagePool: {
    '404': '接口不存在',
    '500': '服务端异常'
  }
}

const mutations = {
  showErrorMsgByCode(state, { errorCode, errorUrl }) {
    const message = state.messagePool[errorCode]
    if (message) {
      Message({
        message: `请求地址：${errorUrl} ${message}`,
        type: 'error',
        duration: 5 * 1000
      })
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
