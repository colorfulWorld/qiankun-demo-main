import api from '@/api'
import store from '@/store'
import getQuery from '@/util/get-query'
import appApi from '@/apps/api'
import { getCookie } from '@/util/cookie'

function dataReset (resData) {
    const details = {}
    const apps = []
    resData.forEach((item) => {
        const { type } = item
        const { typeName } = item
        const isShow = false
        if (!details[type]) {
            details[type] = {
                isShow,
                typeName,
                detail: []
            }
        }
        details[type].detail.push(item)
        const appItem = JSON.parse(JSON.stringify(item))
        apps.push(appItem)
    })
    apps.forEach((items) => {
        items.name = items.moduleName
        items.container = '#micro'
        if (!items.activeRule) {
            items.activeRule = function (location) {
                return getQuery('micro', location) === items.moduleCode
            }
        }
        items.props = {
            userInfo: store.state.user.userInfo,
            gwToken: getCookie('gwToken'),
            appApi
        }
    })
    const moduleList = Object.values(details)
    moduleList.apps = apps
    store.commit('user/setModuleList', moduleList)
    return moduleList
}

function moduleList () {
    return api.module.moduleList().then(response => {
        if (response.data) {
            return dataReset(response.data)
        }
    })
}

export default moduleList
