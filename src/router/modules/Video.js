import Layout from '@/layout'
const contentRouter = [
  {
    path: '/content',
    component: Layout,
    redirect: '/content/index',
    meta: { title: '影片内容', icon: 'content' },
    children: [
      {
        path: 'actor',
        name: 'contentActor',
        component: () => import('@views/content/actor/actor'),
        meta: {
          title: '演员',
          icon: 'actor'
        }
      },
      {
        path: 'genre',
        name: 'contentGenre',
        component: () => import('@views/content/genres/genres'),
        meta: {
          title: '流派',
          icon: 'genres'
        }
      },
      {
        path: 'index',
        name: 'contentIndex',
        component: () => import('@views/content/video/video'),
        meta: {
          title: '浏览',
          icon: 'video'
        }
      },
      {
        path: 'detail',
        name: 'contentDetail',
        hidden: true,
        component: () => import('@views/content/video/video-detail'),
        meta: {
          title: '详情',
          icon: 'content-add'
        }
      }

    ]
  }
]

export default contentRouter
