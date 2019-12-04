const errorRouter = [
  {
    path: '/login',
    component: () => import('@/views/user-register/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }
]
export default errorRouter
