import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/oauth2/token',
    method: 'post',
    data
  })
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

export function logout(token) {
  return request({
    url: '/oauth2/revoke-token',
    method: 'post',
    data: token
  })
}

export function userRegister(data = {}) {
  return request({
    url: '/user-register',
    method: 'post',
    data
  })
}
