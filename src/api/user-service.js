import request from '@/utils/request'

export function login(data = {}) {
  data.grant_type = 'password'
  const params = new URLSearchParams()
  params.append('grant_type', 'password')
  params.append('username', data.username)
  params.append('password', data.password)
  return request({
    url: '/oauth/token',
    method: 'post',
    data: params
  })
}

export function getInfo(username) {
  return request({
    url: `/user/normal?userName=${username}`,
    method: 'get'
  })
}

export function logout(token) {
  const params = new URLSearchParams()
  params.append('token', token.token)
  params.append('clientId', token.clientId)
  params.append('clientSecret', token.clientSecret)
  return request({
    url: '/token/revoke',
    method: 'post',
    data: params
  })
}

export function userRegister(data = {}) {
  return request({
    url: '/user',
    method: 'put',
    data
  })
}

export function getUser(pageNumber = 1, pageSize = 20) {
  return request({
    url: '/user',
    method: 'get',
    params: {
      pageNumber,
      pageSize
    }
  })
}
export function delUser({ id, userId }) {
  return request({
    url: '/user',
    method: 'delete',
    params: {
      id,
      userId
    }
  })
}

export function editUser(userInfo) {
  return request({
    url: '/user',
    method: 'post',
    data: userInfo
  })
}
