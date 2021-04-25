<template>
  <a-layout-sider width="230" v-model="collapsed" :trigger="null" collapsible>
    <a-menu
      class="margin-top-20"
      :selectedKeys="[selectMenus]"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
      @click="menu"
      :open-keys="openKey"
      @openChange="onOpenChange"
    >
      <template v-for="item in menuList">
        <a-menu-item v-if="!item.children" :key="item.path">
          <router-link :to="item.path">
            <a-icon :type="item.icon" />
            <span>{{ item.title }}</span>
          </router-link>
        </a-menu-item>
        <sub-menu v-else :key="item.path" :menu-info="item" />
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script type="text/javascript">
import SubMenu from '@/components/Menu/SubMenu'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Menu',
  props: {
    isCollapsed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      menuList: [],
      selectMenus: '/index',
      collapsed: this.isCollapsed,
      openKey: [],
      rootSubmenuKeys: []
    }
  },
  components: {
    SubMenu
  },
  watch: {
    isCollapsed(value) {
      this.collapsed = value
    },
    $route: {
      handler() {
        this.updateMenu()
      },
      immediate: true
    }
  },
  created() {
    this.getMenuList()
  },
  methods: {
    ...mapActions(['getMenus']),
    updateMenu() {
      this.selectMenus = this.$route.path
      const routerLink = this.selectMenus.split('/')
      if (routerLink.length > 3) {
        this.getMenus().then(res => {
          const a = this.deepSearch(res, this.selectMenus)
          this.openKey = [a.parent]
        })
      } else {
        this.openKey = [this.selectMenus]
      }
    },
    deepSearch(list, path, parent) {
      let result = {}
      for (let i = 0; i < list.length; i++) {
        const item = list[i]
        if (item.path == path) {
          result = item
          result.parent = parent
          
          return result
        } else if (item.children?.length) {
          const a = this.deepSearch(item.children, path, item.path)
          if(a){
            return a
          }
        }
      }
    },
    getMenuList() {
      this.getMenus().then(res => {
        this.menuList = res
        this.rootSubmenuKeys = res.map(item => item.path)
      })
    },
    menu(value) {
      this.selectMenus = value.key
    },
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKey.indexOf(key) === -1)
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKey = openKeys
      } else {
        this.openKey = latestOpenKey ? [latestOpenKey] : []
      }
    }
  }
}
</script>

<style lang="less">
.menu-component {
  .trigger-container {
    padding: 20px;
  }
}
</style>
