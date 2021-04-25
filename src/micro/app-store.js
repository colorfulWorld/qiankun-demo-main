import store from '@/store'
import Vue from 'vue'

/**
 * @name 声明一个常量准备将props内的部分内容储存起来
 */
const STORE = {}

/**
 * @name 导入注册并启动微应用函数
 */

/**
 * @name 启动qiankun应用间通信机制
 * @param {Function} initGlobalState 官方通信函数
 * @description 注意：主应用是从qiankun中导出的initGlobalState方法，
 * @description 注意：子应用是附加在props上的onGlobalStateChange, setGlobalState方法（只用主应用注册了通信才会有）
 */
const appStore = initGlobalState => {
  /**
   * @name 初始化数据内容
   */
  const { onGlobalStateChange, setGlobalState } = initGlobalState({
    isLogout: false,
    storeInfo: {
      ...store.getters.userInfo
    }
  })

  /**
   * @name 监听数据变动
   * @param {Function} 监听到数据发生改变后的回调函数
   * @des 将监听到的数据存入vuex
   */
  onGlobalStateChange((value, prev) => {
    console.log('主应用[onGlobalStateChange - master]:', value, prev)
    if (value.isLogout) {
      //退出登录
      store.dispatch('Logout')
    }
    // 'msg' in value && store.dispatch('appstore/setMsg', value.msg)
    // value.token && store.dispatch('app/setToken', value.token)
    // value.appsRefresh && window?.location?.reload?.()
  })

  /**
   * @name 改变数据并向所有应用广播
   */
  setGlobalState({
    ignore: 'master',
    msg: '来自master动态设定的消息'
  })

  /**
   * @name 将你需要的数据存起来，供下面setState方法使用
   */
  STORE.setGlobalState = setGlobalState
  STORE.name = 'master'
}
const setState = data => {
  if (typeof data !== 'object') {
    throw Error('data必须是对象格式')
  }
  STORE.setGlobalState?.({
    ignore: STORE.name,
    ...data
  })
}
Vue.prototype.$setState = setState

export default appStore
