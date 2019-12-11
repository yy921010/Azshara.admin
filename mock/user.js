
const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default [
  // user login
  {
    url: '/oauth2/token',
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
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 0,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/oauth2/revoke-token',
    type: 'post',
    response: _ => {
      return {
        code: 0,
        data: 'success'
      }
    }
  }
]
