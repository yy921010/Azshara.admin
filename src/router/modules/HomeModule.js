import Layout from '@/layout'
export default [
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
