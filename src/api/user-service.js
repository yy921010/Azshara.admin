import request from '@/utils/request'

const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

export function login(data) {
  return new Promise((resolve, reject) => {
    resolve({
      code: 0,
      data: tokens['admin']
    })
  })
  // return request({
  //   url: '/user/login',
  //   method: 'post',
  //   data
  // })
}

export function getInfo(token) {
  return new Promise((resolve, reject) => {
    resolve({
      code: 0,
      data: {}
    })
  })
  // return request({
  //   url: '/user/info',
  //   method: 'get',
  //   params: { token }
  // })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function userRegister(data = {}) {
  return request({
    url: '/user-register',
    method: 'post',
    data
  })
}
