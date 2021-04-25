import { registerMicroApps, start } from 'qiankun'
import moduleList from '@/apps/module-list'

moduleList().then(response => {
    if (response) {
        const apps = response.apps
        registerMicroApps(apps)
        start()
    }
})
