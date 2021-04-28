import Mock from 'mockjs'
const host = '//' + window.location.host
Mock.mock('/api/auth/activeRule', {
  data: [
    {
      name: 'role-ui',
      entry: host + '/vmcp/role-ui/',
      container: '#frame',
      activeRule: '/vmcp/role-ui'
    },
    {
      name: 'vm-ui',
      entry: host + '/vmcp/vm-ui/',
      container: '#frame',
      activeRule: '/vmcp/vm-ui'
    },
    {
      name: 'monitor-ui',
      entry: host + '/vmcp/monitor-ui/',
      container: '#frame',
      activeRule: '/vmcp/monitor-ui'
    }
  ]
})

Mock.mock('/api/auth/menu', {
  data: [
    {
      path: '/vmcp/monitor-ui',
      title: '菜单一',
      icon: 'usergroup-delete',
      children: [
        {
          path: '/vmcp/monitor-ui/monitoring',
          title: '子菜单'
        }
      ]
    },
    {
      path: '/vmcp/vm-ui',
      title: '菜单二',
      icon: 'car',
      children: [
        {
          path: '/vmcp/vm-ui/apply',
          title: '子菜单'
        }
      ]
    }
  ]
})

Mock.mock('/api/auth/login', {
  code: '0000',
  data: {
    userId: '111111111111111111',
    name: '切图仔',
    account: '切图仔',
    orgId: '11111111111',
    orgName: '11111111',
    unionId: '11111111111',
    hasChildren: true,
    isInitial: 0,
    singleDeviceLogin: 0,
    loginSystemCodes: ['1111111'],
    identityCodes: ['111111111', '11111111111'],
    departments: [],
    token: '11111111111111111111',
    expireTime: 1619604526989
  },
  msg: '登录成功'
})

Mock.mock('/api/auth/permissions', {
  code: '0000',
  data: ['11111111111111', '22222222222222222'],
  msg: '获取权限成功'
})
