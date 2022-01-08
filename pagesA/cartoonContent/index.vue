<template>
  <view>
    <block v-for="(item, index) in contentList" :key="index">
      <u--image :src="item" width="100%" bgColor="#616161" mode="widthFix" @click="showPopup = true"> </u--image>
    </block>
    <u-popup :show="showPopup" @close="showPopup = false" mode="top" :overlay="false" bgColor="rgba(30, 30, 30, 0.7)">
      <view class="head u-f-ac">
        <u-icon size="50rpx" name="arrow-left" color="#fff" label="22-11" labelPos="right" labelSize="40rpx" labelColor="#fff" space="50rpx"></u-icon>
      </view>
    </u-popup>
    <u-popup :show="showPopup" @close="showPopup = false" :overlay="false" bgColor="rgba(30, 30, 30, 0.7)">
      <view class="bottom u-f-ac">
        <u-icon size="50rpx" name="star-fill" color="#fff" label="追番" labelPos="bottom" labelSize="24rpx" labelColor="#fff" space="20rpx"></u-icon>
        <u-icon
          size="50rpx"
          name="file-text"
          color="#fff"
          label="章节"
          labelPos="bottom"
          labelSize="24rpx"
          @click="showList = true"
          labelColor="#fff"
          space="20rpx"
        ></u-icon>
        <u-icon size="50rpx" name="arrow-left-double" color="#fff" label="上一章" labelPos="bottom" labelSize="24rpx" labelColor="#fff" space="20rpx"></u-icon>
        <u-icon size="50rpx" name="arrow-right-double" color="#fff" label="下一章" labelPos="bottom" labelSize="24rpx" labelColor="#fff" space="20rpx"></u-icon>
      </view>
    </u-popup>

    <!--目录-->
    <u-popup :show="showList" @close="showList = false">
      <view class="popup-title"> 全部章节 ({{ caricatureContentLength }}) </view>
      <view class="popup-content">
        <u-list>
          <u-list-item v-for="(item, index) in cartoonDetails.caricatureContentList" :key="index">
            <view class="chapter u-f" @click="readDetail(item)">
              <u--image :src="cartoonDetails.avatar" width="200rpx" height="112rpx" radius="10rpx" mode="aspectFill"></u--image>
              <view class="chapter-info">
                <view>
                  <text style="color: #303133">{{ item.current_number }} </text>
                  <text></text>
                  <text>{{ item.current_name }} </text>
                </view>
                <view>{{ item.create_date | date("yyyy-mm-dd") }}</view>
              </view>
            </view>
          </u-list-item>
        </u-list>
      </view>
    </u-popup>
  </view>
</template>

<script>
export default {
  data() {
    // 页面数据变量
    return {
      cartoonDetails: uni.getStorageSync("lifeData")?.$cartoon?.cartoonDetails || {},
      detailInfo: {
        image_list: [],
      },
      //要渲染的图片数组
      contentList: [],
      showPopup: false,
      showList: false,
    };
  },
  onPageScroll(e) {
    this.showPopup && (this.showPopup = false);
  },
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
  onReachBottom() {
    this.loadmore();
  },
  // 函数
  methods: {
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
          this.contentList = [...this.contentList, ...this.detailInfo.image_list.splice(0, 3)];
        });
    },
    loadmore() {
      const { image_list } = this.detailInfo;
      image_list.length >= 1 && this.contentList.push(image_list.shift());
    },
  },
  // 过滤器
  filters: {},
  // 计算属性
  computed: {
    caricatureContentLength() {
      return this.cartoonDetails.caricatureContentList?.length;
    },
  },
};
</script>
<style lang="scss">
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
.popup-title {
  height: 100rpx;
  padding: 20rpx 30rpx;
  font-size: 35rpx;
  font-weight: 510;
}
.popup-content {
  height: 500rpx;
  font-size: 30rpx;
  .chapter {
    padding: 20rpx 30rpx;
    .chapter-info {
      padding: 0 20rpx;
      color: #767a82;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
    }
  }
}
</style>
