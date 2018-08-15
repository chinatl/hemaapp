import store from './store';
var set_info = (name, methods) => {
	var obj = sessionStorage.getItem(name);
	if (obj + '' === 'null' || obj + '' === 'undefined') {
		return
	}
	store.commit(methods, JSON.parse(obj));
};
if (localStorage.getItem('user') + '' !== 'null') {
	store.commit("set_token", JSON.parse(localStorage.getItem('user')));
};
set_info('config', "set_config");
set_info('user_info', "set_user_info");
set_info('bank_info', "set_bank_info");
set_info('order_list', "set_order_list");
set_info('home_data', "set_home_data");
set_info('order_id', "set_order_id");
set_info('order_data', "set_order_data");
set_info('auth_type', "set_auth_type");
set_info('pay_status', "set_pay_status");
