<template>
	<view class="content">
		<button type="default" @click="getWeixinCode('snsapi_base')">静默授权获取code</button>
		<view class="tips">静默授权获取code，且页面会刷新。</view>
		<button type="default" @click="code2SessionWeixin">获取微信openid</button>
		<view class="tips">以下API有授权弹窗</view>
		<button type="default" @click="getWeixinCode('snsapi_userinfo')">用户授权获取code</button>
		<view class="tips">用户授权获取code，且页面会刷新。</view>
		<button type="default" @click="loginByWeixin('register')">微信注册</button>
		<button type="default" @click="loginByWeixin('login')">微信登录</button>
		<button type="default" @click="loginByWeixin()">微信登录(不存在自动注册)</button>
	</view>
</template>

<script>
var that;		// 当前页面对象
var vk;			// vk依赖
export default {
	data() {
		return {
			options: {}
		};
	},
	onLoad(options) {
		that = this;
		vk = that.vk;
		that.options = options || {};
		that.init(options);
	},
	methods: {
		// 初始化
		init(options) {
			if(that.options.code){
				vk.toast("已获取到code，请点击相应操作。");
				return false;
			}
		},
		getWeixinCode(scope){
			let appid = "wx2ebf03d174875bed";
			let redirect_uri = window.location.href.split("?")[0];
			let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}&state=STATE#wechat_redirect`;
			window.location.href = url;
		},
		code2SessionWeixin() {
			if(!that.options.code){
				vk.toast("请先获取code");
				return false;
			}
			vk.userCenter.code2SessionWeixin({
				data:{
					code: that.options.code,
					state: that.options.state,
				},
				success:function(data){
					vk.alert(JSON.stringify(data));
				},
			});
		},
		// 微信登陆
		loginByWeixin(type){
			vk.userCenter.loginByWeixin({
				data:{
					code: that.options.code,
					state: that.options.state,
					type
				},
				success:function(data){
					vk.alert(data.msg);
					that.data = data;
				}
			});
		},
	}
};
</script>

<style lang="scss" scoped>
.content {
	padding: 30rpx;
}
.content button {
	margin-bottom: 30rpx;
}
.tips {
	font-size: 28rpx;
	color: #999999;
	margin-bottom: 32rpx;
}
</style>
