
export default [
  // user login
  {
    url: '/token',
    type: 'post',
    response: config => {
      return {
        accessToken: 'e6edhaskjhdsjakdjksadhsakasojgoji4et3tjo',
        accessTokenExpiresAt: '2019-12-31T00:00:00.000Z',
        refreshTokenExpiresAt: '2020-12-31T00:00:00.000Z',
        refreshToken: 'dsadsasadsadsadsadsadsadsad'
      }
    }
  },

  {
    url: '/user-register',
    type: 'post',
    response: config => {
      return {
        data: {},
        status: 'success',
        code: 0
      }
    }
  },

  // get user info
  {
    url: '/user\.*',
    type: 'get',
    response: config => {
      const { username } = config.query
      return {
        status: 'success',
        data: {
          username,
          avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
          nickName: '管理员'
        }
      }
    }
  },

  // user logout
  {
    url: '/revoke-token',
    type: 'post',
    response: _ => {
      return {
        data: 'success'
      }
    }
  }
]
