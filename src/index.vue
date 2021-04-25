<template>
  <div class="vms-index">
    <a-layout class="iframe-container">
      <a-layout-header class="iframe-header">
        <a-row class="trigger-container">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
            :style="{ color: '#fff', fontSize: '24px' }"
          />
          <span class="system-name margin-left-20">FMS-智能车队管理系统-运营平台</span>
        </a-row>

        <a-dropdown>
          <p class="action ant-dropdown-link user-dropdown-menu">
            <span class="name">您好，{{ nickname }}</span>
            <a-icon type="caret-down" :style="{ marginLeft: '10px', color: '#fff' }"></a-icon>
          </p>
          <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
            <a-menu-item key="3">
              <a href="javascript:;" @click="handleLogout">
                <a-icon type="logout" />
                <span>退出登录</span>
              </a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </a-layout-header>
      <a-layout>
        <Menu :isCollapsed="collapsed"></Menu>
        <a-layout-content :style="{ margin: '10px', borderRadius: '4px' }">
          <section class="cns-frame-wrapper">
            <router-view />
            <section id="frame" class="frame"></section>
          </section>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script type="text/javascript">
import store from '@/store'
import Menu from '@/components/Menu/Menu'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'index',
  data() {
    return {
      collapsed: false,
      nickname: '管理者'
    }
  },
  components: {
    Menu
  },
  computed: {
    currentRouter() {
      return this.menus.findIndex(item => {
        return item.path === this.$route.path
      })
    }
  },
  methods: {
    ...mapActions(['Logout']),
    loadMicro(item) {
      this.$router.push(item.path)
    },
    handleLogout() {
      const _this = this
      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        cancelText: '取消',
        okText: '确定',
        onOk: () => {
          return this.Logout()
            .then(() => {})
            .catch(err => {
              this.$message.error({
                title: '错误',
                description: err.message
              })
            })
        },
        onCancel() {}
      })
    }
  }
}
</script>

<style lang="less" scope>
.vms-index {
  height: 100%;
  .cns-frame-wrapper {
    height: 100%;
    .frame,
    div[id^='__qiankun_microapp_wrapper_'] {
      height: 100%;
    }
  }
  .iframe-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #242f42;
    padding: 0 20px;
  }
  .iframe-container {
    height: 100%;
  }
  .system-name {
    color: #fff;
    font-weight: 700;
    font-size: 24px;
  }
  .action {
    display: inline-block;
    font-size: 16px;
  }
  .name {
    font-size: 16px;
    color: #fff;
  }
}
</style>
