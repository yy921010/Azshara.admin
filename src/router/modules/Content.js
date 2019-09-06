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
        component: () => import('@views/actor/actor'),
        meta: {
          title: '演员',
          icon: 'content-add'
        }
      },
      {
        path: 'index',
        name: 'contentIndex',
        component: () => import('@views/content/index'),
        meta: {
          title: '浏览',
          icon: 'content-paste'
        }
      },
      {
        path: 'add',
        name: 'contentAdd',
        component: () => import('@views/content/AddContent.vue'),
        meta: {
          title: '新增',
          icon: 'content-add'
        }
      }

    ]
  }
]

export default contentRouter
