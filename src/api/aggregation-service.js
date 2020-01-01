import request from '@/utils/request'

const url = '/aggregation'

export function getAggregation(params = {}) {
  return request({
    url,
    method: 'get',
    params
  })
}
