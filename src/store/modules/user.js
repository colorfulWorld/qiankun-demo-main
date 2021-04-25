import { login, logout, getPermissions } from '@/api/user'
import { getToken, setToken, clearlAllInfo, setUserInfo, getUserInfo } from '@/util/auth'
const user = {
  state: {
    token: getToken(),
    userInfo: getUserInfo(), //当前用户信息
    yameSource: 'vmcp',
    moduleList: []
  },
  getters: {
    token: state => {
      return state.token
    },
    userInfo: state => {
      return state.userInfo
    },
    yameSource: state => {
      return state.yameSource
    },
    moduleList: state => {
      return state.moduleList
    }
  },
  mutations: {
    SET_TOKEN: (state, data) => {
      setToken(data)
      state.token = data
    },
    SET_USERINFO: (state, userInfo) => {
      setUserInfo(userInfo)
      state.userInfo = userInfo
    },
    SET_MODULELIST: (state, data) => {
      state.moduleList = data
    }
  },
  actions: {
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then(response => {
            const result = response.data
            commit('SET_TOKEN', result.token)
            commit('SET_USERINFO', result)
            //网关需要调用获取一下权限
            getPermissions()
              .then(res => {
                resolve(result)
              })
              .catch(error => {
                commit('SET_TOKEN', '')
                commit('SET_USERINFO', '')
                clearlAllInfo()
                reject(error)
              })
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 登出
    Logout({ commit }) {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            location.replace('/login')
            commit('SET_TOKEN', '')
            commit('SET_USERINFO', '')
            clearlAllInfo()
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    setModuleList({ commit }, data) {
      commit('setModuleList', data)
    }
  }
}

export default user
