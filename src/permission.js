import router from './router'
import store from '@/store'

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // determine whether the user has logged in
  const hasToken = store.getters.token
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/index', replace: true })
      return
    } else {
      if (to.meta.title) {
        window.document.title = to.meta.title
      }
      next()
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      //login
      next()
      return
    } else {
      //非login
      next({ path: '/login', replace: true })
    }
  }
})

router.afterEach(() => {})
