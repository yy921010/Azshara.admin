import Layout from '@/layout'
const pagesideRouter = [
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
          icon: 'pageview'
        }
      }
    ]
  },
  {
    path: '/floor',
    component: Layout,
    redirect: '/floor/index',
    meta: { title: '楼层管理', icon: 'floor' },
    children: [
      {
        path: 'index',
        name: 'floorIndex',
        component: () => import('@/views/pageSide/index'),
        meta: {
          title: '楼层管理',
          icon: 'floor'
        }
      }
    ]
  }
]

export default pagesideRouter
