import Layout from '@/layout'
const pageSideRouter = [
  {
    path: '/pageSize',
    component: Layout,
    redirect: '/pageSize/index',
    meta: { title: '页面管理', icon: 'page' },
    children: [
      {
        path: 'index',
        name: 'pageManager',
        component: () => import('@/views/pageSide/index'),
        meta: {
          title: '页面浏览',
          icon: 'navigator'
        }
      }
    ]
  }
]

export default pageSideRouter
