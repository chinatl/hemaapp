import Vue from 'vue'
import Vuex from 'vuex'
import Router from '@/router'
import {
	post
} from '@/utils/fetch';
import {
	Toast
} from 'vant';
Vue.use(Vuex)
const store = new Vuex.Store({
	//	strict: true,
	state: {
		user: {},
		config: {
			"id": null,
			"disabled": null,
			"uuid": null,
			"createUser": null,
			"createTime": null,
			"updateUser": null,
			"updateTime": null,
			"remark": null,
			"userUuid": null,
			"userProgress": 0,
			"detailProgress": 0,
			"bankCardProgress": 0,
			"zhimaProgress": 0,
			"operatorProgress": 0,
			"contactsProgress": 0,
			"completionAll": null,
			"idCardNo": "",
			"realName": ""
		},
		user_info: {
			"idCard": '',
			"imgUrl": '',
			"userName": '',
		},
		bank_info: {
			"bankNumberNo": '',
			"bankNumberMobile": '',
			"bankName": ''
		},
		/*申请记录*/
		order_list: [],
		order_loading: false,
		/*主页数据*/
		home_data: {},
		order_id: '', //订单id
		order_data: {}, //订单数据
		auth_type: '',
		pay_status: '',//用来是否点击pay判断状态
	},
	getters: {
		user: state => state.user,
		sessionId: state => state.user.sessionId,
		config: state => state.config,
		user_info: state => state.user_info,
		bank_info: state => state.bank_info,
		home_data: state => state.home_data,
		order_id: state => state.order_id,
		order_list: state => state.order_list,
		order_data: state => state.order_data,
		auth_type: state => state.auth_type,
		pay_status: state => state.pay_status
	},
	mutations: {
		set_token(state, data) {
			state.user = data;
			localStorage.setItem('user', JSON.stringify(data));
		},
		remove_token(state) {

		},
		/*设置配置信息*/
		set_config(state, data) {
			state.config = data;
			sessionStorage.setItem('config', JSON.stringify(data));
		},
		/*设置用户信息*/
		set_user_info(state, data) {
			state.user_info = data;
			sessionStorage.setItem('user_info', JSON.stringify(data));
		},
		/*设置银行卡信息*/
		set_bank_info(state, data) {
			state.bank_info = data;
			sessionStorage.setItem('bank_info', JSON.stringify(data));
		},
		/*设置申请记录*/
		set_order_list(state, data) {
			state.order_list = data;
			sessionStorage.setItem('order_list', JSON.stringify(data));
		},
		/*设置主页信息*/
		set_home_data(state, data) {
			state.home_data = data;
			sessionStorage.setItem('home_data', JSON.stringify(data));
		},
		/*设置订单id*/
		set_order_id(state, data) {
			state.order_id = data.orderNo;
			sessionStorage.setItem('order_id', JSON.stringify(data));
		},
		/*设置订单数据*/
		set_order_data(state, data) {
			state.order_data = data;
			sessionStorage.setItem('order_data', JSON.stringify(data));
		},
		/*退出登录*/
		logout(state, data) {
			state.user = {};
			state.config = {};
			state.user_info = {};
			state.bank_info = {};
			state.order_list = {};
			state.home_data = {};
			state.order_data = {};
			sessionStorage.clear();
			localStorage.clear();
			Router.push({
				path: '/login'
			})
		},
		/*设置我的认证跳转页面*/
		set_auth_type(state, data) {
			state.auth_type = data;
			sessionStorage.setItem('auth_type', JSON.stringify(data));
		},
		set_pay_status(state, data) {
			state.pay_status = data;
			sessionStorage.setItem('pay_status', JSON.stringify(data));
		}
	},
	actions: {
		/* 获取配置信息*/
		get_config_info({
			commit,
			state
		}){
			post("web/credit/getCompletion", {
				sessionId: state.user.sessionId
			}).then(res => {
				commit('set_config', res.data);
			}).catch(res => {
				console.log(res);
			})
		},
		/*获取订单列表*/
		get_order_list({
			commit,
			state
		}) {
			post('wallet/orders/borrowingInfo', {
				sessionId: state.user.sessionId
			}).then(res => {
				commit('set_order_list', res.data);
			}).catch(res => {
				console.log(res)
			})
		},
		/*获取订单信息*/
		get_pay_info({
			commit,
			state
		}, data) {
			var sessionId = '';
			if (!data.sessionId) {
				sessionId = state.user.sessionId;
			} else {
				state.user.sessionId = data.sessionId;
				sessionId = data.sessionId;
			};
			post('wallet/orders/offlineRefundApply', {
				orderNo: data.orderNo,
				sessionId: sessionId,
				offineRefundType: 1
			}).then(res => {
				commit('set_order_data', res.data);
			}).catch(res => {
				console.log(res)
			})
		},
		/*查询个人认证*/
		get_user_info({
			commit,
			state
		}) {
			post('wallet/user/userIdCardInfo', {
				sessionId: state.user.sessionId
			}).then(res => {
				commit('set_user_info', res.data)
			}).catch(res => {
				console.log(res);
			});
		},
		/* 查询银行卡认证*/
		get_bank_info({
			commit,
			state
		}) {
			post('wallet/userBankList', {
				sessionId: state.user.sessionId
			}).then(res => {
				if (!res.data.length) {
					return
				}
				commit('set_bank_info', res.data[0])
			}).catch(res => {
				console.log(res);
			});
		},
		logout({
			commit,
			state
		}) {
			const toast = Toast.loading({
				duration: 0, // 持续展示 toast
				forbidClick: true, // 禁用背景点击
				loadingType: 'spinner',
				message: '正在退出登陆'
			});
			post('wallet/user/logout', {
				sessionId: state.user.sessionId
			}).then(res => {
				commit('logout');
				Toast.loading({
					message: '退出登陆成功',
					type: 'success',
					duration: 1500
				});
			}).catch(res => {
				console.log(res);
			});
		},
		/* 获取主页数据 */
		get_home_data({
			commit,
			state
		}, sessionId = state.user.sessionId) {
			post('wallet/system/initProduct', {
				sessionId: sessionId
			}).then(res => {
				if (!res.data) {
					return
				}
				if (!res.data.length) {
					return
				}
				commit('set_home_data', res.data[0])
			}).catch(res => {
				console.log(res);
			})
		}
	}
})

export default store
