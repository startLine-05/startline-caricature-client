<template>
  <view>
    <view class="head"></view>
    <view class="list u-f-ac">
		<block v-for="item in list" :key="item._id">
			<view class="card">
				<u--image :showLoading="true" :src="item.avatar" width="80px" height="100px" ></u--image>
			</view>
		</block>
    </view>
  </view>
</template>

<script>
var that; // 当前页面对象
var vk; // vk依赖

export default {
  data() {
    // 页面数据变量
    return {
      list: [],
    };
  },
  onPageScroll(e) {
    that.scrollTop = e.scrollTop;
  },
  // 监听 - 页面每次【加载时】执行(如：前进)
  onLoad(options = {}) {
    that = this;
    vk = that.vk;
    that.options = options;
    that.init(options);
  },
  // 监听 - 页面【首次渲染完成时】执行。注意如果渲染速度快，会在页面进入动画完成前触发
  onReady() {},
  // 监听 - 页面每次【显示时】执行(如：前进和返回) (页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面)
  onShow() {},
  // 监听 - 页面每次【隐藏时】执行(如：返回)
  onHide() {},
  // 监听 - 页面触底部
  onReachBottom() {},
  // 监听 - 页面创建时
  created() {},
  // 函数
  methods: {
    // 页面数据初始化函数
    init(options) {
      // promise方式
      vk.callFunction({
        url: "client/caricature/pub/getCaricatureList",
        title: "请求中...",
        data: {
          pageIndex: 1,
          pageSize: 10,
        },
      }).then((res) => {
        console.log(res, "s");
        this.list = res.rows;
      });
    },
    pageTo(path) {
      vk.navigateTo(path);
    },
  },
  // 过滤器
  filters: {},
  // 计算属性
  computed: {},
};
</script>
<style lang="less" scoped>
	.list{
		padding: 20rpx;
		.card {
			margin-bottom: 35rpx;
			border: 1rpx solid #bebebe;
			border-radius: 15rpx;
			box-shadow: 2rpx 2rpx 10rpx #e6e6e6;
		}
	}

</style>
