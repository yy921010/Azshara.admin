import request from '@/utils/request'

const url = '/image'

export function getImage(params = {}) {
  return request({
    url,
    method: 'get',
    params
  })
}

export function deleteImage(imageId) {
  return request({
    url: `image/${imageId}`,
    method: 'delete'
  })
}

export function addImage(data = {}) {
  return request({
    url,
    method: 'post',
    data
  })
}
