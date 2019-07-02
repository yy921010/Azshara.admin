import Mock from 'mockjs'

const data = Mock.mock({
  'items|20': [{
    id: '@id',
    contentName: '@ctitle',
    'type|1': [1, 2],
    'contentType|1': [1, 2, 3, 4, 5, 6, 7],
    createdTime: '@datetime',
    updateTime: '@datetime'
  }]
})

export default [
  {
    url: '/content',
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
  },
  {
    url: '/content',
    type: 'put',
    response: config => {
      return {
        code: 0,
        data: {},
        msg: ''
      }
    }
  },
  {
    url: '/content',
    type: 'post',
    response: config => {
      return {
        code: 0,
        data: {},
        msg: ''
      }
    }
  },
  {
    url: '/content',
    type: 'delete',
    response: config => {
      return {
        code: 0,
        data: {},
        msg: ''
      }
    }
  }
]
