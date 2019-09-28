import axios from 'axios'
import { MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import Cookies from 'js-cookie'

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
      config.headers['X-Token'] = getToken()
      config.headers['x-csrf-token'] = Cookies.get('csrfToken')
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
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const responseData = response.data
    const code = responseData.code
    const msg = responseData.msg
    const data = responseData.data
    // if the custom code is not 20000, it is judged as an error.
    switch (code) {
      case 0:
        return data
      case 50008:
      case 50012:
      case 50014:
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
        return Promise.reject(new Error(msg || 'Error'))
      default:
        return Promise.reject(new Error('Error'))
    }
  },
  error => {
    const errorCode = error.request.status
    const errorUrl = error.config.url
    store.commit('errorMessage/showErrorMsgByCode', { errorCode, errorUrl })
    return Promise.reject(error)
  }
)

export default service
