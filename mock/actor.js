import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    'type|1': ['1', '2'],
    name: '@cname',
    introduce: '@cparagraph',
    createAt: '@datetime',
    updateAt: '@datetime',
    'pictures|1': [{
      url: '@image(100x100)',
      minSize: '1x1'
    }]
  }]
})

const personItem = Mock.mock({
  id: '@id',
  'type|1': ['1', '2'],
  name: '@cname',
  introduce: '@cparagraph',
  'pictures|1': [{
    url: '@image',
    minSize: '1x1'
  }]
})

export default [
  {
    url: '/actor',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 0,
        data: {
          total: items.length,
          items: items
        },
        msg: ''
      }
    }
  },
  {
    url: '/person',
    type: 'put',
    response: config => {
      return {
        code: 0,
        data: personItem,
        msg: ''
      }
    }
  },
  {
    url: '/person',
    type: 'post',
    response: config => {
      return {
        code: 0,
        data: personItem,
        msg: ''
      }
    }
  },
  {
    url: '/person',
    type: 'delete',
    response: config => {
      return {
        code: 0,
        data: personItem,
        msg: ''
      }
    }
  }
]
