import Mock from 'mockjs'

const data = Mock.mock({
  'items|20': [{
    id: '@id',
    floorName: '@ctitle',
    floorStyle: 1,
    createAt: '@datetime',
    updateAt: '@datetime'
  }]
})
export default [
  {
    url: '/aggregation',
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
