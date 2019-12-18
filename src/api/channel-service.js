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

