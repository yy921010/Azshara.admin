import { BaseApi } from './BaseApi'

class Content extends BaseApi {
  constructor() {
    super('/content')
  }
}

export default new Content()
