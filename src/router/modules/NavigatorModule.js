import Layout from '@/layout'
const pageSideRouter = [
  {
    path: '/navigator-module',
    component: Layout,
    redirect: '/navigator-module/index',
    meta: { title: '页面管理', icon: 'page_main' },
    children: [
      {
        path: 'index',
        name: 'navigator',
        component: () => import('@/views/navigator/navigator-show'),
        meta: {
          title: '导航配置',
          icon: 'navigator'
        }
      },
      {
        path: 'pageShow',
        name: 'pageShow',
        component: () => import('@/views/navigator/page-show'),
        meta: {
          title: '页面配置',
          icon: 'page'
        }
      }
    ]
  }
]

export default pageSideRouter
