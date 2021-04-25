<template>
  <div class="vms-body">
    <index v-if="token && $route.name != 'Login'"></index>
    <router-view v-if="!token" />
  </div>
</template>

<script>
import index from './index'
import { mapState } from 'vuex'
import { setToken } from '@/util/auth'
export default {
  name: 'app',
  components: {
    index
  },
  computed: {
    ...mapState({
      token: state => {
        console.log(state.user.token)
        return state.user.token
      }
    })
  },
  methods: {}
}
</script>
<style lang="less" scope>
.vms-body {
  width: 100%;
  height: 100%;
  margin: 0;
}
</style>
