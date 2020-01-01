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
      component: () => import('@views/aggregation/aggregation'),
      meta: {
        title: '楼层管理',
        icon: 'floor'
      }
    },
    {
      path: 'aggregationDetail',
      hidden: true,
      name: 'aggregationDetail',
      component: () => import('@views/aggregation/aggregation-detail'),
      meta: {
        title: '楼层编辑',
        icon: 'floor'
      }
    }
  ]
}]

export default aggregationRouter
