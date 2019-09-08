import request from '@/utils/request'

const url = '/video'
export function getVideo(params) {
  return request({
    url,
    method: 'get',
    params
  })
}
