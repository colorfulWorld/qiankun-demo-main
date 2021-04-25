const loginRouter = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/login'),
    meta: { title: '登录', keepAlive: true, disable: true }
  }
]
export default loginRouter
