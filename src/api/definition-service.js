import request from '@/utils/request'

const url = '/definition'

export function getDefinition(params = {}) {
  return request({
    url,
    method: 'get',
    params
  })
}

export function updateDefinition(data = {}, actorId) {
  return request({
    url: `definition/${actorId}`,
    method: 'put',
    data
  })
}

export function deleteDefinition(actorId) {
  return request({
    url: `definition/${actorId}`,
    method: 'delete'
  })
}

export function addDefinition(data = {}) {
  return request({
    url,
    method: 'post',
    data
  })
}
