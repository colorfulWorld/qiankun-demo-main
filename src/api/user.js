import request from '@/util/request'

// 登录
export function login(data) {
  return request.post('/api/auth/login', data)
}

// 登出
export function logout(data) {
  return request.post('/api/auth/logout', data)
}

// 获取权限
export function getPermissions(data) {
  return request.post('/api/auth/permissions', data)
}
