import request from '@/utils/request'

export function login(data = {}) {
  data.grant_type = 'password'
  const params = new URLSearchParams()
  params.append('grant_type', 'password')
  params.append('username', data.username)
  params.append('password', data.password)
  return request({
    url: '/oauth2/token',
    method: 'post',
    data: params
  })
}

export function getInfo(username) {
  return request({
    url: '/user',
    method: 'get',
    params: { username }
  })
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
