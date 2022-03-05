<template>
  <view :class="showList ? 'mask-show' : ''">
    <block v-for="(item, index) in contentList" :key="index">
      <u--image class="img" :src="item" width="100%" mode="widthFix" :customStyle="{ height: 'auto' }" @click="showPopup = !showPopup">
        <template v-slot:loading>
          {{ index + 1 }}
        </template>
      </u--image>
      <!-- <image :src="item" style="width: 100%" bgColor="#616161" mode="widthFix" @click="showPopup = !showPopup"> </image> -->
    </block>

    <u-popup :show="showPopup" @close="showPopup = false" mode="top" :overlay="false" bgColor="rgba(30, 30, 30, 0.7)">
      <view class="head u-f-ac">
        <u-icon size="50rpx" name="arrow-left" color="#fff" @click="back"></u-icon>
        <text>{{ detailInfo.current_number }}话 {{ detailInfo.current_name }}</text>
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
        <u-icon
          size="50rpx"
          name="arrow-left-double"
          :color="location === 0 ? '#bfbfbf' : '#fff'"
          label="上一章"
          labelPos="bottom"
          labelSize="24rpx"
          @click="
            () => {
              if (location === 0) {
                return;
              }
              jump('last');
            }
          "
          :labelColor="location === 0 ? '#bfbfbf' : '#fff'"
          space="20rpx"
        ></u-icon>
        <u-icon
          size="50rpx"
          name="arrow-right-double"
          :color="location === cartoonDetails.caricatureContentList.length - 1 ? '#bfbfbf' : '#fff'"
          label="下一章"
          labelPos="bottom"
          labelSize="24rpx"
          @click="
            () => {
              if (location === cartoonDetails.caricatureContentList.length - 1) {
                return;
              }
              jump('next');
            }
          "
          :labelColor="location === cartoonDetails.caricatureContentList.length - 1 ? '#bfbfbf' : '#fff'"
          space="20rpx"
        ></u-icon>
      </view>
    </u-popup>

    <!--目录-->
    <u-popup :show="showList" @close="showList = false">
      <view class="popup-title u-f-ac">
        全部章节
        <block v-if="cartoonDetails.caricatureContentList">({{ cartoonDetails.caricatureContentList.length }})</block>
      </view>
      <scroll-view :scroll-y="true" class="popup-content">
        <block v-for="(item, index) in cartoonDetails.caricatureContentList" :key="index">
          <view class="chapter u-f" @click="choose(item, index)">
            <u--image :src="cartoonDetails.avatar" width="250rpx" height="120rpx" radius="10rpx" mode="aspectFill"></u--image>
            <view class="chapter-info">
              <view :class="{ active: index == location }">
                <text>{{ item.current_number }} </text>
                <text>{{ item.current_name }} </text>
              </view>
              <view>{{ item.create_date | date("yyyy-mm-dd") }}</view>
            </view>
            <view class="map" v-if="location === index">
              <u-icon size="40rpx" color="#25aef3" name="map"></u-icon>
            </view>
          </view>
        </block>
      </scroll-view>
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
    console.log("s", options);
    this.getCaricatureContent(options.id);
    //储存观看到 某 漫画的 哪一章
    const userId = uni.vk.getVuex("$user.userInfo._id");
    const data = uni.getStorageSync("lastReatChapter") || {};
    data[userId] = data[userId] || {};
    data[userId][options.cartoonId] = {
      currentNumber: options.currentNumber,
      currentId: options.id,
    };
    uni.setStorageSync("lastReatChapter", data);
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
    back() {
      const { cartoonDetails } = this;
      uni.vk.navigateTo(`/pagesA/cartoonDetails/index?id=${cartoonDetails._id}`);
    },
    // 页面数据初始化函数获取漫画数据
    getCaricatureContent(id) {
      uni.vk
        .callFunction({
          url: "client/caricature/pub/getCaricatureContent",
          title: "加载中资源中...",
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
    choose(data, index) {
      if (this.location === index) {
        return;
      }
      console.log(data);
      this.clearList();
      this.getCaricatureContent(data._id);
    },
    jump(type) {
      const { caricatureContentList } = this.cartoonDetails;
      this.clearList();
      this.getCaricatureContent(caricatureContentList[this.location + (type == "next" ? 1 : -1)]._id);
    },
    clearList() {
      this.contentList = [];
    },
  },
  // 过滤器
  filters: {},
  // 计算属性
  computed: {
    //判断当前集数所在位置是否在最前或最后
    location() {
      const { caricatureContentList } = this.cartoonDetails;
      const { _id } = this.detailInfo;
      return caricatureContentList.findIndex((v) => v._id == _id);
    },
  },
};
</script>
<style lang="scss">
page {
  background: $u-bg-color;
  font-size: 24rpx;
  letter-spacing: 3rpx;
}
.mask-show {
  overflow: hidden;
  position: fixed;
  height: 100%;
  width: 100%;
}
text {
  padding: 5rpx;
}
.img {
  border-bottom: 2rpx solid #ccc;
}
.head {
  height: 120rpx;
  padding: 0 20rpx;
  color: #fff;
  font-size: 40rpx;
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
  height: 80rpx;
  padding: 0 20rpx;
  font-size: 35rpx;
  font-weight: 510;
}
.popup-content {
  height: 500rpx;
  font-size: 30rpx;
  padding-bottom: 50rpx;
  .chapter {
    padding: 10rpx 20rpx;
    position: relative;
    .map {
      position: absolute;
      right: 5%;
      top: 50%;
    }
    .chapter-info {
      padding: 0 20rpx;
      color: #767a82;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
    }
    .active {
      color: #22afff !important;
    }
  }
}
</style>
