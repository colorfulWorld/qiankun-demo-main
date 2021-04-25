const indexRouter = [
  // {
  //   path: '/index',
  //   name: 'Index',
  //   component: () => import('@/pages/index/index'),
  //   meta: { title: '首页', keepAlive: true, disable: true }
  // },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/login/login'),
    meta: { title: '登录', keepAlive: true, disable: true }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/pages/404'),
    meta: { title: '404', keepAlive: true, disable: true }
  }
]
export default indexRouter
