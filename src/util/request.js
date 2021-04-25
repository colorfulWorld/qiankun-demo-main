import axios from 'axios'
import store from '@/store'
import qs from 'querystring'
import { message } from 'ant-design-vue'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 6000 // 请求超时时间
})

/**
 * request interceptor
 */
service.interceptors.request.use(
  config => {
    const tokenId = store.getters.token
    if (tokenId) {
      config.headers.token = tokenId
    }
    config.headers['yame-source'] = store.getters.yameSource
    if (config.method === 'post') {
      if (config.data && config.data.formData) {
        config.data = qs.stringify({
          ...config.data,
          tokenId
        })
      } else {
        config.data = {
          ...config.data,
          tokenId
        }
      }
    } else {
      config.params = {
        ...config.params,
        tokenId
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * response interceptor
 */
// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    // 失败
    if ((res.code && res.code !== '0000') || res.success === false) {
      // 过期重新设置
      if (res.code === '9991' || res.code === '9992' || res.code === '9990') {
        message.error(res.msg)
        store.dispatch('Logout')
      } else {
        message.error(res.msg)
        return Promise.reject(new Error(res.msg || 'Error'))
      }
    } else {
      return res
    }
  },
  error => {
    error.msg && Toast(error.msg)
    return Promise.reject(error)
  }
)

export default service
