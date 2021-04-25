import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.css'
import './core/lazy_lib/components_use'
import './style/commom.less'
import './micro'
import './permission'
import './mock'

if (process.env.NODE_ENV == 'development') {
  Vue.config.devtools = true
} else {
  Vue.config.devtools = false
}

Vue.config.productionTip = false
window.Vue2 = window.Vue
window.Vue = undefined

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#sky-bgs-vms-ui')
