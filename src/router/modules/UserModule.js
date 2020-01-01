import Layout from '@/layout'
const UserModuleRouter = [
  {
    path: '/user-module',
    component: Layout,
    redirect: '/user-module/index',
    meta: { title: '用户管理', icon: 'page' },
    children: [
      {
        path: 'index',
        name: 'pageManager',
        component: () => import('@/views/users/index'),
        meta: {
          title: '用户管理',
          icon: 'users'
        }
      }
    ]
  }
]

export default UserModuleRouter
