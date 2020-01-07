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
        status: 'success',
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }]
