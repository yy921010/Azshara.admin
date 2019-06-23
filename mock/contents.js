import Mock from 'mockjs'

const data = Mock.mock({
  'items|20': [{
    id: '@id',
    contentName: '@ctitle',
    'type|1-2': [1, 2],
    'contentType|1-7': [1, 2, 3, 4, 5, 6, 7],
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)'
  }]
})

export default [
  {
    url: '/content',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
