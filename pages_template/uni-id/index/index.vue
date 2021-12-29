<template>
	<view class="content">
		<view style="margin-bottom: 20rpx;font-size: 32rpx;">
			当前集成的
			<text style="font-weight: bold;margin: 0 10rpx;">uni-id</text>
			版本：
			<text style="font-weight: bold;">3.3.9</text>
		</view>

		<button type="default" @click="pageTo('../password/password')">用户名和密码</button>
		<button type="default" @click="pageTo('../mobile/mobile')">手机号和验证码</button>
		<button type="default" @click="pageTo('../email/email')">邮箱与验证码</button>
		<!-- #ifdef MP-WEIXIN || APP-PLUS -->
		<button type="default" @click="pageTo('../weixin/weixin')">微信登录</button>
		<!-- #endif -->
		<button type="default" @click="vk.navigateTo('../../openapi/weixin/weixin')">微信小程序API</button>
		<!-- #ifdef H5 -->
		<button type="default" @click="pageTo('../../openapi/h5-weixin/h5-weixin')">微信公众号API</button>
		<!-- #endif -->
		<button type="default" @click="vk.navigateTo('../../openapi/baidu/baidu')">百度开放平台API</button>
		<!-- #ifdef MP-ALIPAY || APP-PLUS -->
		<button type="default" @click="pageTo('../alipay/alipay')">支付宝登录</button>
		<!-- #endif -->
		<!-- #ifdef MP-QQ || APP-PLUS -->
		<button type="default" @click="pageTo('../qq/qq')">QQ登录</button>
		<!-- #endif -->
		<view style="margin-bottom: 20rpx;">小白也能轻松上手的数据库API</view>
		<button type="default" @click="pageTo('../../db-test/db-test')">数据库API</button>
		<button type="default" @click="pageTo('../util/util')">通用方法</button>
		<view style="margin-bottom: 20rpx;">插件版本1.8.7 新增 APP手机一键登录</view>
		<button type="default" @click="pageTo('../univerify/univerify')">手机一键登录</button>
		<view style="margin-bottom: 20rpx;">插件版本1.4.4 新增 Vuex状态管理</view>
		<button type="default" @click="pageTo('../../vk-vuex/vk-vuex')">Vuex状态管理演示示例</button>
		<button type="default" @click="pageTo('../login/index/index')">登录注册找回密码页面模板</button>

	</view>
</template>

<script>
	var that;											// 当前页面对象
	var vk;												// vk依赖
	export default {
		data() {
			return {

			}
		},
		onLoad(options) {
			that = this;
			vk = that.vk;
		},
		methods: {
			pageTo(url){
				vk.navigateTo(url);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 15px;
	}
	.content input {
		height: 46px;
		border: solid 1px #DDDDDD;
		border-radius: 5px;
		margin-bottom: 15px;
		padding: 0px 15px;
	}
	.content button {
		margin-bottom: 15px;
	}
	.content navigator {
		display: inline-block;
		color: #007AFF;
		border-bottom: solid 1px #007AFF;
		font-size: 16px;
		line-height: 24px;
		margin-bottom: 15px;
	}
	.tips {
		text-align: center;
		line-height: 20px;
		font-size: 14px;
		color: #999999;
		margin-bottom: 20px;
	}
	.red-tips{
		margin-bottom: 20rpx;
		color: red;
		font-size: 26rpx;
	}
</style>
