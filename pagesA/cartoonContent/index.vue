<template>
  <view>
    <u-list @scroll="scroll" @scrolltolower="scrolltolower" ref="list">
      <u-list-item v-for="(item, index) in contentList" :key="index" :anchor="index">
        <u--image :src="item" width="100%" mode="widthFix" @click="showPopup = true">
        </u--image>
      </u-list-item>
    </u-list>
    <u-popup :show="showPopup" @close="showPopup = false" mode="top" :overlay="false" bgColor="rgba(30, 30, 30, 0.7)">
      <view class="head u-f-ac">
        <u-icon size="50rpx" name="arrow-left" color="#fff" label="22-11" labelPos="right" labelSize="40rpx" labelColor="#fff" space="50rpx"></u-icon>
      </view>
    </u-popup>
    <u-popup :show="showPopup" @close="showPopup = false" :overlay="false" bgColor="rgba(30, 30, 30, 0.7)">
      <view class="bottom u-f-ac">
        <u-icon size="50rpx" name="star-fill" color="#fff" label="追番" labelPos="bottom" labelSize="24rpx" labelColor="#fff" space="20rpx"></u-icon>
        <u-icon size="50rpx" name="file-text" color="#fff" label="章节" labelPos="bottom" labelSize="24rpx" labelColor="#fff" space="20rpx"></u-icon>
        <u-icon size="50rpx" name="arrow-left-double" color="#fff" label="上一章" labelPos="bottom" labelSize="24rpx" labelColor="#fff" space="20rpx"></u-icon>
        <u-icon size="50rpx" name="arrow-right-double" color="#fff" label="下一章" labelPos="bottom" labelSize="24rpx" labelColor="#fff" space="20rpx"></u-icon>
      </view>
    </u-popup>
  </view>
</template>

<script>
var total = 0;
export default {
  data() {
    // 页面数据变量
    return {
      detailInfo: {
        image_list:[],
      },
      //要渲染的图片数组
      contentList:[],
      showPopup: false,
    };
  },
  onPageScroll(e) {},
  // 监听 - 页面每次【加载时】执行(如：前进)
  onLoad(options = {}) {
    this.getCaricatureContent(options.id);
  },
  // 监听 - 页面【首次渲染完成时】执行。注意如果渲染速度快，会在页面进入动画完成前触发
  onReady() {},
  // 监听 - 页面每次【显示时】执行(如：前进和返回) (页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面)
  onShow() {},
  // 监听 - 页面每次【隐藏时】执行(如：返回)
  onHide() {},
  // 监听 - 页面触底部
  onReachBottom() {},
  // 监听 - 窗口尺寸变化(仅限:App、微信小程序)
  onResize() {},
  // 监听 - 点击右上角转发时
  onShareAppMessage(options) {},
  // 监听 - 页面创建时
  created() {},
  // 函数
  methods: {
    scroll(data) {
      // console.log(data);
      this.showPopup && (this.showPopup = false);
    },
    // 页面数据初始化函数获取漫画数据
    getCaricatureContent(id) {
      uni.vk
        .callFunction({
          url: "client/caricature/pub/getCaricatureContent",
          title: "请求中...",
          data: {
            content_id: id,
          },
        })
        .then((res) => {
          this.detailInfo = res.data;
          this.contentList = [...this.contentList, ...this.detailInfo.image_list.splice(total=+3,3)]
          // this.$nextTick(()=>{
          // 	this.$refs.list.refreshLsit()
          // })
        });
    },
      scrolltolower() {
        this.loadmore()
      },
      loadmore() {
        this.contentList = [...this.contentList, ...this.detailInfo.image_list.splice(total=+1,1)]
          //         this.$nextTick(()=>{
          // 	this.$refs.list.refreshLsit()
          // })
      }
  },
  // 过滤器
  filters: {},
  // 计算属性
  computed: {},
};
</script>
<style lang="scss" scoped>
.head {
  height: 120rpx;
  padding: 0 20rpx;
}
.bottom {
  height: 150rpx;
  color: #fff;
  view {
    font-size: 24rpx;
    flex: 1;
    display: flex;
    justify-items: center;
    flex-direction: column;
    align-items: center;
  }
}
</style>
