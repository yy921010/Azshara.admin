import Mock, { Random } from 'mockjs'

const data = Mock.mock({
  'items|20': [{
    id: '@id',
    channelName: '@ctitle',
    logo: Random.image(Random.size, '#02adea', 'Hello'),
    playUrl: 'https://123.com',
    createAt: '@datetime',
    updateAt: '@datetime'
  }]
})

/**
 * 创建频道的模拟数据
 */
export default [
  {
    url: '/channel',
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
