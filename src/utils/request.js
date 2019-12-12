import axios from 'axios'
import { MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = 'Bearer ' + getToken()
      config.headers['content-type'] = 'application/x-www-form-urlencoded;charset=utf-8'
    }
    if (config.url && /oauth2/.test(config.url)) {
      config.headers['Authorization'] = 'Basic ' + process.env.VUE_APP_DEVICE_TOKEN
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const url = response.config.url
    const responseData = response.data
    const msg = responseData.msg
    const status = responseData.status
    const data = responseData.data
    if (/oauth2/.test(url)) {
      return responseData
    }
    switch (status) {
      case 'success':
        return data
      case 'failed':
        return Promise.reject(new Error(msg || 'Error'))
    }
  },
  error => {
    const errorCode = error.request.status
    const errorUrl = error.config.url
    console.log(error)
    MessageBox(error.error_description)
    store.commit('errorMessage/showErrorMsgByCode', { errorCode, errorUrl })
    return Promise.reject(error)
  }
)

export default service
