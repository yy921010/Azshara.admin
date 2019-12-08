
export default [
  {
    url: '/image',
    type: 'post',
    response: config => {
      return {
        code: 0,
        data: {
          url: 'https://23.nao.coim'
        }
      }
    }
  }]
