'use strict'

//请求头统一设置
const config = {
	baseUrl: 'https://smart.test.vdinsight.com',
	// baseUrl : 'https://api-miniapp.vdrm.cn',
	// baseUrl: 'http://192.168.2.124:9501',
	// 设置为json，返回后会对数据进行一次JSON.parse()
	dataType: 'json', 
 	showLoading: true,// 是否显示请求中的loading
	loadingText: '努力加载中~', // 请求loading中的文字提示
	loadingTime: 2000, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
	originalData: true, // 是否在拦截器中返回服务端的原始数据
	loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
	// 配置请求头信息
 	header: {
		// 'content-type':'application/x-www-form-urlencoded; charset=UTF-8',
		'content-type': 'application/json'
	},  
}
export default config