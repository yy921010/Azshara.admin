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

export function addProgram(data = {}) {
// 调用模拟数据
  return request({
    url,
    method: 'put',
    data
  })
}

export function updateProgram(data = {}, id) {
// 调用模拟数据
  return request({
    url: `${url}/${id}`,
    method: 'post',
    data
  })
}

export function delProgramByName(name = '') {
  return request({
    url: `${url}?programName=${name}`,
    method: 'delete'
  })
}

export function delProgramId(id = '') {
  return request({
    url: `${url}?id=${id}`,
    method: 'delete'
  })
}

