import Mock from 'mockjs'

const data = Mock.mock({
  'items|20': [{
    id: '@id',
    name: '@ctitle',
    'visible|1': [1, 2],
    createAt: '@datetime',
    updateAt: '@datetime'
  }]
})
export default [
  {
    url: '/navigator',
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
