// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Icon from 'vue-svg-icon/Icon.vue'
import axios from 'axios'


Vue.config.productionTip = false
Vue.component('icon', Icon)
Vue.prototype.$http = axios


/* eslint-disable no-new */
// document.addEventListener('deviceready', function() {
	new Vue({
		el: '#app',
		router,
		components: { App },
		template: '<App/>'
	})
// 	window.navigator.splashscreen.hide()
// }, false);
