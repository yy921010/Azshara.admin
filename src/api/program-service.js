import request from '@/utils/request'

const url = '/program'

export function getProgram(params = {}) {
  // 调用模拟数据
  return request({
    url,
    method: 'get',
    params
  })
}

