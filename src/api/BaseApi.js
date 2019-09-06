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
  update(data = {}, updateId) {
    return request({
      url: this.requestUrl + `/${updateId}`,
      method: 'put',
      data
    })
  }
  delete(data = {}) {
    return request({
      url: this.requestUrl + `/${data.id}`,
      method: 'delete',
      data
    })
  }
  add(data = {}) {
    return request({
      url: this.requestUrl,
      method: 'post',
      data
    })
  }
}
