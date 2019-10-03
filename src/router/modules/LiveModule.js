import Layout from '@/layout'
const UserModuleRouter = [
  {
    path: '/live-module',
    component: Layout,
    redirect: '/live-module/index',
    meta: { title: '直播管理', icon: 'page' },
    children: [
      {
        path: 'index',
        name: 'liveModule',
        component: () => import('@/views/pageSide/index'),
        meta: {
          title: '直播管理',
          icon: 'live'
        }
      }
    ]
  }
]

export default UserModuleRouter
