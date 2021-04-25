import { getMenu } from '@/api/micro'

const menu = {
  state: {
    menus: []
  },
  mutations: {
    SET_MENUS: (state, data) => {
      state.menus = data
    }
  },
  actions: {
    getMenus({ commit, state }) {
      if (!state.menus.length) {
        return new Promise((resolve, reject) => {
          getMenu().then(res => {
            if (res.data?.length > 0) {
              commit('SET_MENUS', res.data)
              resolve(res.data)
            } else {
              reject(error)
            }
          })
        })
      } else {
        return state.menus
      }
    }
  }
}

export default menu
