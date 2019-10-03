import Layout from '@/layout'
const pageSideRouter = [
  {
    path: '/navigator-module',
    component: Layout,
    redirect: '/navigator-module/index',
    meta: { title: '页面管理', icon: 'page' },
    children: [
      {
        path: 'index',
        name: 'navigator',
        component: () => import('@/views/navigator/navigator-show'),
        meta: {
          title: '导航配置',
          icon: 'navigator'
        }
      }
    ]
  }
]

export default pageSideRouter
