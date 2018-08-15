import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);
export default new Router({
	routes: [
		{
			path: '/login',
			name: 'login',
			component: () =>
				import ('@/views/login/index'),
    },
		{
			path: '/',
			name:'/',
			redirect: '/login',
	},
		{
			path: '/home',
			name: 'home',
			component: () =>
				import ('@/views/home/index'),
    }, {
			path: '/device',
			name: 'device',
			component: () =>
				import ('@/views/device/index'),
    }, {
			path: '/user',
			name: 'user',
			component: () =>
				import ('@/views/user'),
    }, {
			path: '/orderlist',
			name: 'orderlist',
			component: () =>
				import ('@/views/user/order-list'),
    }, {
			path: '/opinion',
			name: 'opinion',
			component: () =>
				import ('@/views/user/opinion'),
    }, {
			path: '/apply-fail',
			name: 'apply-fail',
			component: () =>
				import ('@/views/apply/fail'),
    }, {
			path: '/auth',
			name: 'auth',
			component: () =>
				import ('@/views/auth'),
    }, {
			path: '/auth-user',
			name: 'auth-user',
			component: () =>
				import ('@/views/auth/user'),
    }, {
			path: '/auth-zhima',
			name: 'auth-zhima',
			component: () =>
				import ('@/views/auth/zhima'),
    }, {
			path: '/auth-person',
			name: 'auth-person',
			component: () =>
				import ('@/views/auth/person'),
    }, {
			path: '/auth-phone',
			name: 'auth-phone',
			component: () =>
				import ('@/views/auth/phone'),
    }, {
			path: '/auth-card',
			name: 'auth-card',
			component: () =>
				import ('@/views/auth/card'),
    }, {
			path: '/auth-contact',
			name: 'auth-contact',
			component: () =>
				import ('@/views/auth/contact'),
    }, {
			path: '/set',
			name: 'set',
			component: () =>
				import ('@/views/set'),
    }, {
			path: '/set-pwd',
			name: 'set-pwd',
			component: () =>
				import ('@/views/set/set'),
    }, {
			path: '/reset-pwd',
			name: 'reset-pwd',
			component: () =>
				import ('@/views/set/reset'),
    }, {
			path: '/pay',
			name: 'pay',
			component: () =>
				import ('@/views/pay/pay'),
    }, {
			path: '/payoffline',
			name: 'payoffline',
			component: () =>
				import ('@/views/pay/payOffline'),
    }, {
			path: '/paysuccess',
			name: 'paysuccess',
			component: () =>
				import ('@/views/pay/pay_success'),
    }, {
			path: '/blog',
			name: 'blog',
			component: () =>
				import ('@/views/blog'),
    },
  ]
})
