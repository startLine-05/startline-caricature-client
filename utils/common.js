import Vue from 'vue'
// 将状态颜色，音频状态，注入到全局过滤器
Vue.filter('audioStatus', audioStatus)
// Vue.filter('color', color)
// Vue.filter('getMin', getMin)
Vue.filter('getUnixTime', getUnixTime)
// Vue.filter('source', source)
Vue.filter('gender', gender)
/*
1:分析成功  2: 分析中  3：分析失败
*/
//音频状态
export function audioStatus(data = ''){
	// console.log(data)
	switch (data) {
		case 1 : 
			return '分析成功'
		break;
		case 2 :
			return '分析中'
		break;
		case 3 : 
			return '分析失败'
		break;
		default:
			return ''
	}
}
export function gender(data = ''){
	switch (data) {
		case 'male' : 
			return '男'
		break;
		case 'female' :
			return '女'
		break;
		case 'unknown' :
			return '未知'
		break;
		default:
			return '未知'
	}
}
//时间模式转义 置业顾问，经理端统计
export  function timeFormat(data){
	// console.log(status)
	switch (data) {
		case 0 : case '0' : case '本日' : 
			return 'day'
		break;
		case 1 :case '1' : case '本周' : 
			return 'week'
		break;
		case 2 :case 2 :  case '本月' : 
			return 'month'
		break;
		case 3 :case 3 : case '本年' : 
			return 'custom'
		break;
	}
}
//时间转时间戳
export function getUnixTime(data,type = '') {
	if(!data) return 0;
	const newstr = data.replace(/-/g, '/');
	const date = new Date(newstr).getTime().toString();
	return type === 'end'? parseInt(date.substr(0, 10)) + 24 * 60 * 60 : parseInt(date.substr(0, 10)) ; 
}
//非法字符串过滤
export function filter(data){
	console.log(data)
	var reg = /[^\u4E00-\u9FA5|\d|\a-zA-Z|\r\n\s,.?!，。？！…—&$=()-+/*{}[\]]|\s/g
	for(let item in data){
		if(data[item] && typeof data[item] === 'string'){
			data[item] = data[item].replace(reg, '')
		}	
	}
	return data
}
//登录
export function login() {
	uni.showModal({
	    title: '登录提示',
	    content: '尚未登录是否需要跳转登录',
	    success: function (res) {
	        if (res.confirm) {
	            console.log('用户点击确定');
				uni.reLaunch({
					url: '/pages/login/index'
				});
	        } else if (res.cancel) {
	            console.log('用户点击取消');
	        }
	    }
	});
}
