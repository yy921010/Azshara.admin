import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

const createBaseToken = () => {
  const clientId = localStorage.getItem('uuid')
  const clientSecret = process.env.VUE_APP_DEVICE_TOKEN
  return window.btoa(`${clientId}:${clientSecret}`)
}

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = 'Bearer ' + getToken()
      // config.headers['content-type'] = 'application/x-www-form-urlencoded;charset=utf-8'
    } else if (config.url && /token/.test(config.url)) {
      config.headers['Authorization'] = `Basic ${createBaseToken()}`
    }
    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const url = response.config.url
    const responseData = response.data
    const msg = responseData.msg
    const code = responseData.code
    const data = responseData.data
    if (/token/.test(url)) {
      return responseData
    }
    switch (code + '') {
      case '0':
        return data
      default:
        Message({
          title: '错误消息',
          message: msg,
          type: 'error'
        })
        return Promise.reject(new Error(msg || 'Error'))
    }
  },
  error => {
    const errorCode = error.request.status
    const errorUrl = error.config.url
    const errorBody = error.response.data
    if (/token/.test(errorUrl)) {
      Notification({
        title: '错误消息',
        message: errorBody.error_description,
        type: 'warning'
      })
    }

    store.commit('errorMessage/showErrorMsgByCode', { errorCode, errorUrl })
    return Promise.reject(error)
  }
)

export default service
