import { BaseApi } from './BaseApi'

class Person extends BaseApi {
  constructor() {
    super('/actor')
  }
}
const person = new Person()
export default person
