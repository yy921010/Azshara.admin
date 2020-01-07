import Mock from 'mockjs'

const data = Mock.mock({
  'items|20': [{
    channelId: '@id',
    programName: '@ctitle',
    startTime: '@datetime',
    endTime: '@datetime',
    description: '@ctitle',
    'type|1': [1, 2],
    pictureUrl: 'https://123.com',
    createAt: '@datetime',
    updateAt: '@datetime'
  }]
})

/**
 * 创建频道的模拟数据
 */
export default [
  {
    url: '/program',
    type: 'get',
    response: config => {
      return {
        status: 'success',
        data: {
          total: 20,
          items: data.items
        }}
    } }
]
