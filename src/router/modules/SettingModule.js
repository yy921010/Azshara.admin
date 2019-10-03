import Layout from '@/layout'
const UserModuleRouter = [
  {
    path: '/setting-module',
    component: Layout,
    redirect: '/setting-module/index',
    meta: { title: '设置页面', icon: 'page' },
    children: [
      {
        path: 'index',
        name: 'settingModule',
        component: () => import('@/views/pageSide/index'),
        meta: {
          title: '系统设置',
          icon: 'interface_setting_line'
        }
      }
    ]
  }
]

export default UserModuleRouter
