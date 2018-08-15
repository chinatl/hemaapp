import axios from 'axios'
import {
	Toast
} from 'vant';
//import {
//	getToken,
//	setToken
//} from '@/utils/auth'
axios.defaults.withCredentials = false;
import router from '@/router'
import vue from 'vue'
// 创建axios实例
const service = axios.create({
	//    baseURL: process.env.BASE_API, // api的base_url
	timeout: 15000, // 请求超时时间
	//	headers: {
	//		'Content-Type': 'application/x-www-form-urlencoded',
	//	},
	//	withCredentials: true
})
//console.log(getToken())
// request拦截器
//service.interceptors.request.use(config => {
//	if (getToken()) {
//		config.headers['token'] = getToken()
//	}
//	return config
//}, error => {
//	Promise.reject(error)
//})

// respone拦截器
service.interceptors.response.use(
	response => {
		/**
		 * code为非1是抛错 
		 */
		const res = response.data
		if (res.code !== 1) {
			// 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
			if (res.code === 1000 || res.code === 5004 || res.code === 50014) {
				Toast.fail('toke过期，你已被登出')
				router.push('/login')
				return Promise.reject(response.data)
			}
			Toast({
				type: 'fail',
				message: res.message,
				duration: 2000
			});
			return Promise.reject(response.data)
		} else {
			return response.data;
		}
	},
	error => {
//		setTimeout(res => {
			Toast({
				type: 'fail',
				message: error.message,
				duration: 2000
			});
//		}, 0)
		return Promise.reject(error)
	}
)

export default service
