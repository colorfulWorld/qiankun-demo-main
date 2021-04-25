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
      name: 'report-ui',
      entry: host + '/vmcp/report-ui/',
      container: '#frame',
      activeRule: '/vmcp/report-ui'
    },
    {
      name: 'base-info-ui',
      entry: host + '/vmcp/base-info-ui/',
      container: '#frame',
      activeRule: '/vmcp/base-info-ui'
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
      title: '车辆监控',
      icon: 'usergroup-delete',
      children: [
        {
          path: '/vmcp/monitor-ui/monitoring',
          title: '实时监控'
        },
        {
          path: '/vmcp/monitor-ui/trajectory',
          title: '车辆轨迹'
        }
      ]
    },
    {
      path: '/vmcp/vm-ui',
      title: '用车管理',
      icon: 'car',
      children: [
        {
          path: '/vmcp/vm-ui/apply',
          title: '申请用车'
        },
        {
          path: '/vmcp/vm-ui/vehicle-dispatch',
          title: '审核派车'
        },
        {
          path: '/vmcp/vm-ui/audit',
          title: '交车审核'
        },
        {
          path: '/vmcp/vm-ui/order-list',
          title: '订单查询'
        }
      ]
    },
    {
      path: '/vmcp/report-ui',
      title: '报表统计',
      icon: 'area-chart',
      children: [
        {
          path: '/vmcp/report-ui/daily-traffic',
          title: '车辆行车日报'
        },
        {
          path: '/vmcp/report-ui/que-driver',
          title: '驾驶员统计'
        },
        {
          path: '/vmcp/report-ui/que-return',
          title: '交车统计'
        }
      ]
    },
    {
      path: '/vmcp/base-info-ui',
      title: '基础信息',
      icon: 'container',
      children: [
        {
          path: '/vmcp/base-info-ui/driver',
          title: '驾驶员信息'
        },
        {
          path: '/vmcp/base-info-ui/carinfo',
          title: '车辆类型'
        }
      ]
    },
    {
      path: '/vmcp/role-ui',
      title: '权限管理',
      icon: 'usergroup-delete',
      children: [
        {
          path: '/vmcp/role-ui/organization',
          title: '机构管理'
        },
        {
          path: '/vmcp/role-ui/station',
          title: '岗位管理'
        },
        {
          path: '/vmcp/role-ui/user',
          title: '用户管理'
        },
        {
          path: '/vmcp/role-ui/department',
          title: '部门管理'
        }
      ]
    }
  ]
})
