import Layout from '@/layout'
const contentRouter = [
  {
    path: '/content',
    component: Layout,
    redirect: '/content/index',
    meta: { title: '内容管理', icon: 'content' },
    children: [
      {
        path: 'index',
        name: 'contentIndex',
        component: () => import('@views/content/index'),
        meta: {
          title: '内容浏览',
          icon: 'content-paste'
        }
      },
      {
        path: 'add',
        name: 'contentAdd',
        component: () => import('@views/content/AddContent.vue'),
        meta: {
          title: '内容添加',
          icon: 'content-add'
        }
      },
      {
        path: 'person',
        name: 'contentPerson',
        component: () => import('@views/content/PersonMange'),
        meta: {
          title: '参演人员',
          icon: 'content-add'
        }
      }
    ]
  }
]

export default contentRouter
