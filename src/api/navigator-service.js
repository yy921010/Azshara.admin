import request from '@/utils/request'

const url = '/navigator'

export function getNavigator(params = {}) {
  return request({
    url,
    method: 'get',
    params
  })
}

export function updateNavigator(data = {}, actorId) {
  return request({
    url: `navigator/${actorId}`,
    method: 'put',
    data
  })
}

export function deleteNavigator(actorId) {
  return request({
    url: `navigator/${actorId}`,
    method: 'delete'
  })
}

export function addNavigator(data = {}) {
  return request({
    url,
    method: 'post',
    data
  })
}
