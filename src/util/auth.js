const TokenKey = 'vmcp-Token'

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(token)
}

export function getUserInfo() {
  return JSON.parse(localStorage.getItem('userInfo')) || {}
}
export function setUserInfo(data) {
  return localStorage.setItem('userInfo', JSON.stringify(data))
}

export function clearlAllInfo() {
  localStorage.clear()
  sessionStorage.clear()
}
