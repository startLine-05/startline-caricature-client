<template>
  <view>
    <view class="card">
      <u--image
        :showLoading="true"
        @click="toDeatail(cardInfo._id)"
        mode="aspectFill"
        :src="cardInfo.avatar || '/static/noLogin.png'"
        width="100%"
        height="400rpx"
      ></u--image>
      <view class="info">
        <view class="u-line-1">
          {{ cardInfo.name }}
        </view>
        <view class="other u-f-ac">
          <view>{{ cardInfo.author }}</view>
          <u-icon size="40rpx" name="list-dot" @click="handle(cardInfo)"></u-icon>
        </view>
      </view>
    </view>
    <u-action-sheet :actions="actionList" round="5" @select="selectClick" @close="show = false" :show="show"></u-action-sheet>
  </view>
</template>

<script>
var vk; // vk依赖
var row = {};
export default {
  props: {
    cardInfo: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      show: false,
      actionList: [
        {
          option: "add",
          name: "稍后再看",
          color: "#ffaa7f",
          fontSize: "20",
        },
        {
          option: "addStars",
          name: "加入书架",
          color: "#ffaa7f",
          fontSize: "20",
        },
      ],
    };
  },
  created() {
    vk = this.vk;
  },
  methods: {
    handle(data) {
      row = data;
      this.show = true;
    },
    selectClick(data) {
      //加入书架
      console.log(data);
      if (data.option === "addStars") {
        vk.callFunction({
          url: "client/caricature/kh/addStarsCaricature",
          title: "请求中...",
          data: {
            caricature_id: row._id,
            option: "add",
          },
        }).then((res) => {
          vk.vuex.dispatch("$user/getStarsCaricature");
        });
      } else {
        //稍后再看
        const userId = vk.getVuex("$user.userInfo._id");
        const laterRead = uni.getStorageSync("laterRead") || {};
        if (!laterRead[userId]) {
          laterRead[userId] = [row];
        } else {
          const index = laterRead[userId].findIndex((v) => v._id === row._id);
          if (index < 0) {
            laterRead[userId].push(row);
          }
        }
        uni.setStorageSync("laterRead", laterRead);
        //测试添加评论
        // vk.callFunction({
        //   url: "client/comments/kh/addComments",
        //   title: "请求中...",
        //   data: {
        //     caricature_id: row._id,
        //     comment_content: `测试评论${new Date().getTime()}`,
        //     comment_type: "0",
        //     reply_user_id: "61e3a4ae16a4710001e824ea",
        //     reply_comment_id: "61f7a0bd9329e70001d2b2e6", // 主评论ID
        //   },
        // }).then((res) => {
        //   console.log(res, "s");
        // });
        //测试获取评论内容
        // vk.callFunction({
        //   url: "client/comments/pub/getComments",
        //   title: "请求中...",
        //   data: {
        //     caricature_id: row._id,
        //   },
        // }).then((res) => {
        //   console.log(res, "s");
        // });
      }
    },
    //查看详情页面
    toDeatail(id) {
      uni.vk.navigateTo(`/pagesA/cartoonDetails/index?id=${id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 335rpx;
  margin-bottom: 25rpx;
  border: 1rpx solid #bebebe;
  border-radius: 15rpx;
  box-shadow: 2rpx 2rpx 10rpx #e6e6e6;
  overflow: hidden;
}
.info {
  padding: 10rpx 15rpx;
  font-size: 28rpx;
  font-weight: bold;
  .other {
    margin-top: 10rpx;
    font-weight: 500;
    font-size: 24rpx;
    color: #616161;
    justify-content: space-between;
  }
}
</style>
