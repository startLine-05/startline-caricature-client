<template>
  <view>
    <view class="head">
      <u--image :src="detailInfo.avatar" width="100%" mode="aspectFill"></u--image>
    </view>
    <view class="info">
      <view class="name">
        {{ detailInfo.name }}
      </view>
      <view class="notability">
        <text style="background: #c7c6c6"> 阅读数：22万 </text>
      </view>
      <view class="start">
        {{ detailInfo.caricature_status == "0" ? "连载中" : "已完结" }}
      </view>
      <view class="other"></view>
    </view>
    <view class="com"> </view>
    <!--目录-->
    <u-popup :show="showList" @close="showList = false">
      <view> </view>
    </u-popup>
  </view>
</template>

<script>
export default {
  data() {
    // 页面数据变量
    return {
      detailInfo: {},
      showList: false,
    };
  },
  // 监听 - 页面每次【加载时】执行(如：前进)
  onLoad(options = {}) {
    console.log(options, "ssss");
    this.getCaricatureDetail(options.id);
  },
  // 函数
  methods: {
    // 页面数据初始化函数
    getCaricatureDetail(id) {
      uni.vk
        .callFunction({
          url: "client/caricature/pub/getCaricatureDetail",
          title: "请求中...",
          data: {
            caricature_id: id,
          },
        })
        .then((res) => {
          this.detailInfo = res.data;
          console.log(res, "s");
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
.head {
  width: 100%;
  height: 300rpx;
  overflow: hidden;
}
.info {
  padding: 20rpx;
  .name {
    font-size: 34rpx;
    font-weight: bold;
  }
  .notability {
    font-size: 24rpx;
  }
  .start {
    font-size: 26rpx;
  }
}
</style>
