
export default [
  {
    url: '/image',
    type: 'post',
    response: config => {
      return {
        code: 0,
        data: {
          url: 'http://img5.mtime.cn/mg/2019/12/09/160147.27169406_285X160X4.jpg',
          name: 'demo.jpg'
        }
      }
    }
  },

  {
    url: '/image',
    type: 'delete',
    response: config => {
      return {
        code: 0,
        data: '删除成功'
      }
    }
  }
]
