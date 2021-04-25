<template>
  <a-sub-menu :key="menuInfo.path" v-bind="$props" v-on="$listeners">
    <span slot="title">
      <a-icon :type="menuInfo.icon" /><span>{{ menuInfo.title }}</span>
    </span>
    <template v-for="item in menuInfo.children">
      <a-menu-item v-if="!item.children" :key="item.path">
        <router-link :to="item.path">
          <span>{{ item.title }}</span>
        </router-link>
      </a-menu-item>
      <sub-menu v-else :key="item.path" :menu-info="item" />
    </template>
  </a-sub-menu>
</template>

<script>
import { Menu } from 'ant-design-vue'

export default {
  name: 'SubMenu',
  // must add isSubMenu: true
  isSubMenu: true,
  components: { Menu },
  props: {
    ...Menu.SubMenu.props,
    menuInfo: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
<style lang="less">
.SubMenu-C {
  width: 256px;
}
</style>
