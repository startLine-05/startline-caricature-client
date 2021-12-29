<template>
	<view class="app">
		<!-- 页面内容开始 -->
		<input type="number" v-model="form1.num1" placeholder="请输入数字" />
		<input type="number" v-model="form1.num2" placeholder="请输入数字" />
		<button type="default" @tap="calc">计算</button>
		<view>
			计算结果：{{ value }}
		</view>
		<!-- 页面内容结束 -->
	</view>
</template>

<script>
	var that;											// 当前页面对象
	var vk;												// vk依赖
	export default {
		data() {
			// 页面数据变量
			return {
				form1:{
					num1:"",
					num2:"",
				},
				value:""
			}
		},
		// 监听 - 页面每次【加载时】执行(如：前进)
		onLoad(options = {}) {
			that = this;
			vk = that.vk;
			that.options = options;
			that.init(options);
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
		// 函数
		methods: {
			// 页面数据初始化函数
			init(options){
				
			},
			calc(){
				let form1 = that.form1;
				// 开始调用云函数
				vk.callFunction({
					url: 'template/test/pub/addition',			// 云函数service目录下的地址，路径带/pub/的云函数不需要用户登录即可请求
					title:'请求中...',	
					//data : form1, // 这样写也可以，下面这样写是为了方便新手理解
					data:{
						num1 : form1.num1,
						num2 : form1.num2,
					},
					success(data) {
						that.value = data.value;
					}
				});
			}
		}
	}
</script>
<style lang="scss" scoped>
	.app {
		padding: 15px;
	}
	.app input {
		height: 46px;
		border: solid 1px #DDDDDD;
		border-radius: 5px;
		margin-bottom: 15px;
		padding: 0px 15px;
	}
	.app button {
		margin-bottom: 15px;
	}
	
</style>