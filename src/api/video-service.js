import request from '@/utils/request'

const url = '/video'
export function getVideo(params) {
  return request({
    url,
    method: 'get',
    params
  })
}

export function addVideo(data = {}) {
  return request({
    url,
    method: 'post',
    data
  })
}

export function deleteVideo(videoId) {
  return request({
    url: `/video/${videoId}`,
    method: 'delete'
  })
}
