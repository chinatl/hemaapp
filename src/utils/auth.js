import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken() {
	return sessionStorage.getItem(TokenKey)
}

export function setToken(data) {
	sessionStorage.setItem(TokenKey, data.token)
	sessionStorage.setItem('user', JSON.stringify(data.user))
}

export function removeToken() {
	sessionStorage.removeItem(TokenKey)
}
