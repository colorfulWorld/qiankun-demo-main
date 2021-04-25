import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { message } from 'ant-design-vue'
import { registerMicroApps, addGlobalUncaughtErrorHandler, start, initGlobalState } from 'qiankun'
import store from '@/store'
import { getModuleList } from '@/api/micro'
import appStore from './app-store'
import app from './apps'
const envType = process.env.NODE_ENV == 'production'

const params = {
  appBaseInfo: {
    yameSource: store.getters.yameSource,
    routerBase: ''
  }
}

/**
 * @name 导入qiankun应用间通信机制appStore
 */

function formatData(data) {
  data.forEach(element => {
    element.props = params
  })
  return data
}

function qiankunSatrt(data) {
  registerMicroApps(data, {
    beforeLoad: app => {
      NProgress.start()
      return Promise.resolve()
    },
    afterMount: app => {
      NProgress.done()
      return Promise.resolve()
    }
  })

  start({
    excludeAssetFilter: assetUrl => {
      const whiteList = []
      const whiteWords = ['baidu', 'bdimg']
      if (whiteList.includes(assetUrl)) {
        return true
      }
      return whiteWords.some(w => {
        return assetUrl.includes(w)
      })
    }
  })
  addGlobalUncaughtErrorHandler(event => {
    const { message: msg } = event
    if (msg) {
      message.error(msg)
    }
  })
  appStore(initGlobalState)
}

if (envType) {
  getModuleList().then(res => {
    const data = formatData(res.data)
    if (data) {
      qiankunSatrt(data)
    }
  })
} else {
  qiankunSatrt(formatData(app))
}
