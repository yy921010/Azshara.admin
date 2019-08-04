import request from '@/utils/request'
export class BaseApi {
  constructor(url) {
    this.requestUrl = url
  }
  get(params = {}) {
    return request({
      url: this.requestUrl,
      method: 'get',
      params
    })
  }
  update(data = {}) {
    return request({
      url: this.requestUrl,
      method: 'put',
      data
    })
  }
  delete(params = {}) {
    return request({
      url: this.requestUrl,
      method: 'delete',
      params
    })
  }
  add(data = {}) {
    return request({
      url: this.requestUrl,
      method: 'post',
      data
    })
  }

  upload(data = {}) {
    return request({
      url: this.requestUrl,
      method: 'post',
      data
    })
  }
}
