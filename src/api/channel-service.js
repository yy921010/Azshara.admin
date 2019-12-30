import request from '@/utils/request'

const url = '/channel'

export function getChannel(params = {}) {
  // 调用模拟数据
  return request({
    url,
    method: 'get',
    params
  })
}

export function updateChannel(data = {}, id) {
  return request({
    url: `${url}/${id}`,
    method: 'post',
    data
  })
}

export function addChannel(data = {}) {
  return request({
    url,
    method: 'put',
    data
  })
}

export function delChannel(channelName = '') {
  return request({
    url: `${url}?channelName=${channelName}`,
    method: 'delete'
  })
}

