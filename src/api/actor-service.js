import request from '@/utils/request'

const url = '/actor'

export function getActor(params = {}) {
  return request({
    url,
    method: 'get',
    params
  })
}

export function updateActor(data = {}, actorId) {
  return request({
    url: `actor/${actorId}`,
    method: 'put',
    data
  })
}

export function deleteActor(actorId) {
  return request({
    url: `actor/${actorId}`,
    method: 'delete'
  })
}

export function addActor(data = {}) {
  return request({
    url,
    method: 'post',
    data
  })
}
