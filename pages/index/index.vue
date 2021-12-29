<template>
	<view>
		演示页面首页在
		pages_template/uni-id/index/index
		<u--image :showLoading="true" :src="src" width="80px" height="80px" @click="click"></u--image>
	</view>
</template>


<script>
	var that;											// 当前页面对象
	var vk;												// vk依赖
	export default {
		data() {
			// 页面数据变量
			return {
				src: 'https://cdn.uviewui.com/uview/album/1.jpg',
				// init请求返回的数据
				data:{
					
				},
				// 表单请求数据
				form1:{
					
				},
				scrollTop:0,
			}
		},
		onPageScroll(e) {
			that.scrollTop = e.scrollTop;
		},
		// 监听 - 页面每次【加载时】执行(如：前进)
		onLoad(options = {}) {
			that = this;
			vk = that.vk;
			that.options = options;
			// that.init(options);
		},
		// 监听 - 页面【首次渲染完成时】执行。注意如果渲染速度快，会在页面进入动画完成前触发
		onReady(){
			
		},
		// 监听 - 页面每次【显示时】执行(如：前进和返回) (页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面)
		onShow() {
			
		},
		// 监听 - 页面每次【隐藏时】执行(如：返回)
		onHide() {
			
		},
		// 监听 - 页面触底部
		onReachBottom(){
			
		},
		// 监听 - 窗口尺寸变化(仅限:App、微信小程序)
		onResize(){
			
		},
		// 监听 - 点击右上角转发时
		onShareAppMessage(options) {
			
		},
		// 监听 - 页面创建时
		created() {
			
		},
		// 函数
		methods: {
			// 页面数据初始化函数
			init(options){
				vk.reLaunch("/pages_template/uni-id/index/index");
			},
			pageTo(path){
				vk.navigateTo(path);
			}
		},
		// 过滤器
		filters:{
			
		},
		// 计算属性
		computed:{
			
		}
	}
</script>
<style lang="scss" scoped>
	
	
</style>