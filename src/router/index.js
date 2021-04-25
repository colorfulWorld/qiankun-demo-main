import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let constantRouterMap = []

const routerContext = require.context('./modules', true, /\.js$/)
routerContext.keys().forEach(route => {
  const routerModule = routerContext(route)
  constantRouterMap = constantRouterMap.concat(routerModule.default || routerModule)
})

const router = [
  {
    path: '/',
    redirect: '/vmcp/monitor-ui/monitoring'
  },
  ...constantRouterMap,
  
]

export default new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: router
})
