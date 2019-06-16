import Layout from '@/layout'
const aggregationRouter = [{
  path: '/aggregation',
  component: Layout,
  redirect: '/aggregation/index',
  meta: {
    title: '楼层管理',
    icon: 'floor'
  },
  children: [
    {
      path: 'index',
      name: 'aggregationIndex',
      component: () => import('@views/aggregation'),
      meta: {
        title: '楼层管理',
        icon: 'floor'
      }
    }
  ]
}]

export default aggregationRouter
