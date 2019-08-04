import { BaseApi } from './BaseApi'

class Image extends BaseApi {
  constructor() {
    super('/image')
  }
}

export default new Image()
