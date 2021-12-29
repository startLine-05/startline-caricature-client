//请求处理
import config from './config.js'
import store from '../store/index.js'
import { login } from './common.js'
const install = (Vue, vm) => {
	// 此为自定义配置参数，具体参数见上方说明
	Vue.prototype.$u.http.setConfig({
		...config 
	});
	// 请求拦截，配置Token等参数
	Vue.prototype.$u.http.interceptor.request = (config) => {
		//vuex
		// console.log(vm.$store.state.userInfo.token)
		const TokenV2 = vm.$store.state.userInfo.token
		if(!TokenV2 && config.url !== '/SmartReceptionApi/v1.0/login'){
			login()
			return false
		}
		// const token = vm.$store.state.userInfo.union_id + '&1';
		// config.header.token = token
		// const token = uni.getStorageSync('userdata').union_id+'&2';
		config.header.TokenV2 = TokenV2;
		
		/* config.header.Token = 'xxxxxx'; */
		// 可以对某个url进行特别处理，此url参数为this.$u.get(url)中的url值
		/* if(config.url == '/user/login') config.header.noToken = true; */
		// 最后需要将config进行return
		//如果return一个false值，则会取消本次请求
		
		// if(!store.state.isLogin) {
		// 	return false;
		// }
		return config;
	}
	// 响应拦截，判断状态码是否通过
	Vue.prototype.$u.http.interceptor.response = (res) => {
		// console.log(res)
		if(res.statusCode == 200) {
			// res为服务端返回值，可能有code，result等字段
			// 这里对res.result进行返回，将会在this.$u.post(url).then(res => {})的then回调中的res的到
			// 如果配置了originalData为true，请留意这里的返回值
			/* console.log(res) */
			return res.data;
		} else if(res.statusCode == 400 && res.data.message === 'token无效') {
			store.commit('REMOVE_USER_INFO')
			login()
			return false
		//其他
		}else {
			// 如果返回false，则会调用Promise的reject回调，
			// 并将进入this.$u.post(url).then().catch(res=>{})的catch回调中，res为服务端的返回值
			uni.showToast({
				icon: 'none',
				title: res.data.message,
				duration: 3000
			})
			return false;
			/* return false; */
		}
	}
}
export default {
	install
}