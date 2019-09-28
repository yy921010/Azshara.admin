import Mock from 'mockjs'

const data = Mock.mock({
  'items|20': [{
    id: '@id',
    name: '@ctitle',
    createAt: '@datetime',
    updateAt: '@datetime'
  }]
})
export default [
  {
    url: '/genre',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 0,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }]
