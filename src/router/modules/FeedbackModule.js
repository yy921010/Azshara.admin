import Layout from '@/layout'
const FeedbackModuleRouter = [
  {
    path: '/feedback-module',
    component: Layout,
    redirect: '/feedback-module/index',
    meta: { title: '反馈', icon: 'page' },
    children: [
      {
        path: 'index',
        name: 'feedbackModule',
        component: () => import('@/views/pageSide/index'),
        meta: {
          title: '反馈',
          icon: 'feedback'
        }
      }
    ]
  }
]

export default FeedbackModuleRouter
