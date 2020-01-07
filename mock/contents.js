import Mock from 'mockjs'

const data = Mock.mock({
  'items|20': [{
    id: '@id',
    contentName: '@ctitle',
    'type|1': [1, 2],
    'contentType|1': [1, 2, 3, 4, 5, 6, 7],
    createAt: '@datetime',
    updateAt: '@datetime'
  }]
})

export default [
  {
    url: '/video',
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
  },
  {
    url: '/content',
    type: 'put',
    response: config => {
      return {
        status: 'success',
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
        status: 'success',
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
        status: 'success',
        data: {},
        msg: ''
      }
    }
  }
]
