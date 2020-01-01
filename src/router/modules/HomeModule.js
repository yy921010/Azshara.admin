import Layout from '@/layout'

const homeModule = [
  {
    path: '/',
    component: Layout,
    redirect: '/home-module',
    children: [{
      path: 'home-module',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  }
]

export default homeModule
