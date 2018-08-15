import router from './router'
import store from './store'
router.beforeEach((to, from, next) => {
	if (to.name === 'login' && from.path === '/') {
		if (localStorage.getItem('user') + '' !== "null") {
			var user_data = JSON.parse(localStorage.getItem('user'));
			if (user_data.sessionId) {
				store.dispatch('get_home_data', user_data.sessionId);
				next('/home');
			} else {
				next();
			}
		} else {
			next()
		}
	} else if (to.name !== 'home' && from.name === 'login') {
		next('/login');
	} else if (to.name === 'home' && from.name === 'login') {
		if (to.query.t) {
			next()
		} else {
			next('/login');
		}
	} else if (to.name === 'login' && from.name !== 'set') {
		return
	} else {
		next()
	}
})
