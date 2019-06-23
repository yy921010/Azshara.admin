import { BaseApi } from './BaseApi'

class Person extends BaseApi {
  constructor() {
    super('/person')
  }
}
const person = new Person()
export default person
