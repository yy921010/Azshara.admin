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

export function getVideoExtra(contentId) {
  return request({
    url: `/video-extra?contentId=${contentId}`,
    method: 'get'
  })
}

export function updateVideo(data) {
  return request({
    url: `video/${data.id}`,
    method: 'put',
    data
  })
}
