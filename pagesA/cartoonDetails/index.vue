<template>
  <view :class="showList ? 'mask-show' : ''">
    <u-navbar :autoBack="true" fixed :placeholder="false" bgColor="rgba(255,255,255,0)"
      ><view class="u-nav-slot" slot="left">
        <u-icon name="arrow-left" size="19"></u-icon>
      </view>
    </u-navbar>
    <view class="head">
      <u--image :src="detailInfo.avatar" errorIcon="photo" width="100%" height="450rpx" mode="aspectFill"></u--image>
    </view>
    <view class="info">
      <view class="store u-f-ajc">
        <u-icon
          size="40rpx"
          :name="isStars ? 'star-fill' : 'star'"
          color="#fff"
          :label="isStars ? '已追' : '追漫'"
          labelPos="bottom"
          labelSize="24rpx"
          labelColor="#fff"
          space="3rpx"
          @click="addStar"
        ></u-icon>
      </view>

      <view class="base">
        <u-skeleton :loading="!detailInfo._id" :animate="true" rows="4">
          <view></view>
          <view class="name">
            <text>{{ detailInfo.name }}</text>
          </view>
          <view class="notability">
            <text> <text style="color: #9aa089">人气</text>: {{ detailInfo.view_count * 10 }} 热力值 </text>
          </view>
          <view class="start">
            <text>{{ detailInfo.caricature_status == "0" ? "连载中" : "已完结" }}</text>
            <text> | </text>
            <text v-if="detailInfo.caricatureContentList"> 已更新至{{ detailInfo.caricatureContentList.length }}话 </text>
          </view>
          <view class="other">
            <text>作者：{{ detailInfo.author }}</text>
            <text> | </text>
            <text>{{ category }}</text>
          </view>
        </u-skeleton>
      </view>

      <u-collapse class="excerpt" :border="false">
        <u-collapse-item style="padding: 0rpx" align="right" value="简介" name="Docs guide" :border="false">
          {{ detailInfo.excerpt }}
        </u-collapse-item>
      </u-collapse>
    </view>

    <view class="comment">
      <view class="top" @click="readComment">
        <view> 讨论区</view>
        <u-icon :label="`更多精彩评论`" name="arrow-right" labelPos="left" size="14"></u-icon>
      </view>
      <comment v-if="detailInfo.commentsList" type="plain" :commentList="commentsList" />
    </view>

    <view class="tabbar u-f-ac">
      <view class="catalogue">
        <u-icon
          size="60rpx"
          name="file-text"
          color="#9aa089"
          label="目录"
          labelPos="bottom"
          labelSize="24rpx"
          labelColor="#9aa089"
          space="5rpx"
          @click="showList = true"
        ></u-icon>
      </view>

      <scroll-view :scroll-x="true" class="scroll-list">
        <view class="u-f-ac">
          <view class="scroll-block u-f-ajc" v-for="(item, index) in detailInfo.caricatureContentList" :key="index" @click="readDetail(item)">
            {{ item.current_number }}
          </view>
        </view>
      </scroll-view>

      <view class="continue u-f-ajc" @click="readDetails()"> 续看 {{ currentObj.currentNumber }} 话</view>
    </view>

    <!--目录-->
    <u-popup :show="showList" @close="showList = false">
      <view class="popup-title u-f-ac">
        全部章节
        <block v-if="detailInfo.caricatureContentList">({{ detailInfo.caricatureContentList.length }})</block>
      </view>
      <scroll-view :scroll-y="true" class="popup-content">
        <block v-for="(item, index) in detailInfo.caricatureContentList" :key="index">
          <view class="chapter u-f" @click="readDetail(item)">
            <u--image :src="detailInfo.avatar" width="200rpx" height="112rpx" radius="10rpx" mode="aspectFill"></u--image>
            <view class="chapter-info">
              <view>
                <text style="color: #303133">{{ item.current_number }} </text>
                <text></text>
                <text>{{ item.current_name }} </text>
              </view>
              <view>{{ item.create_date | date("yyyy-mm-dd") }}</view>
            </view>
          </view>
        </block>
      </scroll-view>
    </u-popup>
  </view>
</template>

<script>
import comment from "@/components/comment/index";
var userId;
export default {
  components: {
    comment,
  },
  data() {
    // 页面数据变量
    return {
      categoryList: uni.vk.getVuex("$cartoon.categoryList") || [],
      detailInfo: {},
      showList: false,
      currentObj: {},
    };
  },
  // 监听 - 页面每次【加载时】执行(如：前进)
  onLoad(options = {}) {
    this.getCaricatureDetail(options.id);
    userId = uni.vk.getVuex("$user.userInfo._id");
    this.addViewCount(options.id);
  },
  onShow() {
    this.setCurrentNumbe();
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
          uni.vk.setVuex("$cartoon.cartoonDetails", res.data);
          this.setCurrentNumbe();
        });
    },
    //阅读详情
    readDetail(data) {
      // console.log(data);
      uni.vk.navigateTo(`/pagesA/cartoonContent/index?id=${data._id}&cartoonId=${this.detailInfo._id}&currentNumber=${data.current_number}`);
    },
    readDetails() {
      const { detailInfo, currentObj } = this;
      uni.vk.navigateTo(`/pagesA/cartoonContent/index?id=${currentObj.currentId}&cartoonId=${this.detailInfo._id}&currentNumber=${currentObj.currentNumber}`);
    },
    //阅读评论
    readComment() {
      const { _id } = this.detailInfo;
      uni.vk.navigateTo(`/pagesA/cartoonComment/index?id=${_id}`);
    },
    //设置集数
    setCurrentNumbe() {
      const { _id, caricatureContentList } = this.detailInfo;
      if (!_id) {
        return;
      }
      const data = uni.getStorageSync("lastReatChapter") || {};
      data[userId] = data[userId] || {};
      this.currentObj = data[userId][_id] || {
        currentNumber: caricatureContentList[0].current_number,
        currentId: caricatureContentList[0]._id,
      };
    },
    //追漫
    addStar() {
      const {
        detailInfo: { _id },
        isStars,
      } = this;

      uni.vk
        .callFunction({
          url: "client/caricature/kh/addStarsCaricature",
          title: "请求中...",
          data: {
            caricature_id: _id,
            option: isStars ? "remove" : "add",
          },
        })
        .then((res) => {
          uni.vk.toast(isStars ? "添加收藏成功" : "取消收藏成功", "none");
          uni.vk.vuex.dispatch("$user/getStarsCaricature");
        });
    },
    //添加阅读数量
    addViewCount(id) {
      uni.vk
        .callFunction({
          url: "client/caricature/kh/addViewCount",
          data: {
            caricature_id: id,
          },
        })
        .then((res) => {});
    },
  },
  // 过滤器
  filters: {},
  // 计算属性
  computed: {
    //分类
    category() {
      const {
        detailInfo: { category_id },
        categoryList,
      } = this;
      const index = categoryList.findIndex((v) => v.value == category_id);
      return index >= 0 ? categoryList[index].label : "";
    },
    //评论
    commentsList() {
      const { commentsList } = this.detailInfo;
      if (!commentsList) {
        return [];
      }
      const list = commentsList.map((v) => {
        return {
          ...v,
          childrenTemporary: v.children.slice(0, 2),
        };
      });
      return list;
    },
    //是否收藏
    isStars() {
      const {
        detailInfo: { _id },
      } = this;
      const list = uni.vk.getVuex("$user.userStars");
      if (list.length == 0) {
        return false;
      }
      const index = list.findIndex((v) => {
        return v.caricature_id === _id;
      });
      return index >= 0;
    },
  },
};
</script>
<style lang="scss" scoped>
page {
  // background: $u-bg-color;
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
.head {
  width: 100%;
  height: 300rpx;
  overflow: hidden;
}
.info {
  position: relative;
  view {
    margin-bottom: 20rpx;
  }
  .store {
    width: 110rpx;
    height: 90rpx;
    background: #f9ae3d;
    position: absolute;
    top: -50rpx;
    right: 40rpx;
    border-radius: 20rpx 0;
  }
  .base {
    padding: 35rpx 35rpx 0 35rpx;
    position: relative;
    z-index: 99;
    width: 80%;
    .name {
      font-size: 40rpx;
      font-weight: bold;
      letter-spacing: 5rpx;
    }
    .notability {
      text {
        background: #e7e6e4;
      }
    }
    .start {
      font-size: 26rpx;
    }
    .other {
      text {
        color: #9aa089;
      }
    }
  }
  .excerpt {
    position: relative;
    top: -90rpx;
  }
}
.comment {
  position: relative;
  top: -120rpx;
  margin-bottom: -120rpx;
  .top {
    margin: 20rpx;
    padding: 30rpx;
    font-size: 30rpx;
    font-weight: bold;
    background: #e7e6e4;
    display: flex;
    justify-content: space-between;
  }
}

.tabbar {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  height: 120rpx;
  box-shadow: 5rpx 5rpx 10rpx #616161;
  background: #fff;
  view {
    padding: 10rpx;
  }
  .catalogue {
    flex: 2;
  }
  .scroll-list {
    flex: 10;
    width: 400rpx;
    .scroll-block {
      width: 120rpx;
      height: 80rpx;
      background: #f3f2f1;
      margin: 10rpx;
      color: #616161;
    }
  }
  .continue {
    height: 100%;
    font-size: 28rpx;
    font-weight: bold;
    flex: 4;
    color: #fff;
    background: #0095f8;
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
