import request from '@/utils/request'

const url = '/page'

export function getPage(params = {}) {
  return request({
    url,
    method: 'get',
    params
  })
}

export function updatePage(data = {}, pageId) {
  return request({
    url: `page/${pageId}`,
    method: 'put',
    data
  })
}

export function deletePage(pageId) {
  return request({
    url: `page/${pageId}`,
    method: 'delete'
  })
}

export function addPage(data = {}) {
  return request({
    url,
    method: 'post',
    data
  })
}
