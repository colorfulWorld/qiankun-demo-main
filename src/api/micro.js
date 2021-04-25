import request from '@/util/request'

// 获取匹配规则
export function getModuleList(data) {
  return request.post('/api/auth/activeRule', data)
}

export function getMenu(data) {
  return request.post('/api/auth/menu', data)
}