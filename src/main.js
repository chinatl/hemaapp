// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
/*解决移动端 300 ms 延迟的问题*/
//import FastClick from 'fastclick';
//FastClick.attach(document.body);
/* 导入 vant-ui*/
//import {
//	Icon,
//	Uploader,
//	Lazyload,
//	Checkbox,
//	Popup,
//	Picker
//} from 'vant';
//Vue.use(Lazyload);
//Vue.component("vanIcon", Icon);
//Vue.component("vanUploader", Uploader);
//Vue.component("vanCheckbox", Checkbox);
//Vue.component("vanPopup", Popup);
//Vue.component("vanPicker", Picker);
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
Vue.use(Vant);
import '@/styles/index.scss' // global css
/*导入自定义图标*/
import '@/icons' // icon
/*头部导航条*/
import navBar from '@/components/navBar'
Vue.component('navBar', navBar);
/*底部菜单栏*/
import tableBar from '@/components/tableBar' //import 
Vue.component('tableBar', tableBar);
/* 全局提示组件*/
import tips from '@/components/tipDialog' //import 
Vue.component('tips', tips);
/*全局弹窗*/
import dialog from '@/components/Dialog' //import 
Vue.component('messageDialog', dialog);
/*导出一个全局跳转页面的功能*/
import {
	go_route
} from '@/utils'
Vue.prototype.$go = go_route;
/*导入 ajax*/
import * as api from '@/utils/fetch'
import axios from 'axios'
Vue.prototype.$get = api.get;
Vue.prototype.$post = api.post;
Vue.prototype.$delete = api.deleteItem;
/*导入一个自定义的上传*/
Vue.prototype.$axios = axios;
/*初始化缓存操作*/
import './session'
/*一键复制功能*/
import VueClipboards from 'vue-clipboards';
Vue.use(VueClipboards);

import './permission'
Vue.config.productionTip = true;

/*一个透明背景图的对象*/
import OpacityBgc from "@/assets/opacity.png";
Vue.prototype.$note = {
	backgroundImage: "url(" + OpacityBgc + ")"
}
/* eslint-disable no-new */

new Vue({
	el: '#app',
	router,
	store,
	components: {
		App
	},
	template: '<App/>'
})
