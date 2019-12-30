import Layout from '@/layout'
const UserModuleRouter = [
  {
    path: '/live-module',
    component: Layout,
    redirect: '/live-module/index',
    meta: { title: '直播管理', icon: 'page' },
    children: [
      {
        path: 'channel',
        name: 'channelModule',
        component: () => import('@/views/live/channel'),
        meta: {
          title: '频道模块',
          icon: 'live'
        }
      },
      {
        path: 'program',
        name: 'programModule',
        component: () => import('@/views/live/program'),
        meta: {
          title: '节目单模块',
          icon: 'genres'
        }
      }
    ]
  }
]

export default UserModuleRouter
