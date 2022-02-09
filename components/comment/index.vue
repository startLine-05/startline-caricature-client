<template>
  <view>
    <u-list class="list" @scrolltolower="scrolltolower">
      <view class="head" v-if="type == 'complete'">
        <view class="u-f-ac">
          <view>{{ sortType == "0" ? "热门" : "最新" }}评论</view>
          <view class="tag" v-if="total">{{ total }}</view>
        </view>
        <u-icon :label="sortType == '0' ? '按热度' : '按时间'" name="list" size="25" @click="handleSort"></u-icon>
      </view>
      <u-list-item v-for="(item, index) in commentList" :key="item._id">
        <view class="comment">
          <view class="left"><image :src="item.userInfo.avatar" mode="aspectFill"></image></view>
          <view class="right">
            <view class="top">
              <view class="name">{{ item.userInfo.nickname }}</view>
              <view class="like">
                <view class="num">{{ item.like_count || "赞" }}</view>
                <u-icon
                  :name="item.isLike ? 'thumb-up-fill' : 'thumb-up'"
                  :color="item.isLike ? '#e45656' : ''"
                  size="25"
                  @click="getLike(item._id, index, item.isLike)"
                ></u-icon>
              </view>
            </view>
            <view class="content">{{ item.comment_content }}</view>
            <view class="reply-box">
              <view class="item" v-for="item1 in item.childrenTemporary" :key="item1._id">
                <view class="username"
                  >{{ item1.userInfo.nickname }}
                  <text style="color: #999999; padding: 0 10rpx">回复</text>
                  {{ item1.replyUserInfo.nickname }}
                </view>
                <view class="text">{{ item1.comment_content }}</view>
              </view>
              <view class="all-reply u-f-ac" @tap="toAllReply(item._id)" v-if="item.children.length">
                共{{ item.children.length }}条回复
                <u-icon class="more" name="arrow-right" size="12" top="5rpx" color="#5677fc"></u-icon>
              </view>
            </view>
            <view class="bottom">
              {{ item.comment_date | date("yyyy-mm-dd") }}
              <view class="reply" @click="addReply(item)" v-if="type === 'complete'">回复</view>
            </view>
          </view>
        </view>
      </u-list-item>
      <!-- <u-loadmore status="nomore" class="load" :height="100" /> -->
      <view class="block"></view>
    </u-list>
  </view>
</template>

<script>
var userId; //用户id
export default {
  props: {
    total: {
      type: Number,
    },
    commentList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    type: {
      type: String,
      default: "complete",
    },
  },

  data() {
    return {
      sortType: "0",
    };
  },
  created() {
    userId = uni.vk.getVuex("$user.userInfo._id");
  },
  methods: {
    isLike(list = []) {
      return list.includes(userId);
    },
    // 跳转到全部回复
    toAllReply(id) {
      console.log("this");
      if (this.type === "complete") {
        uni.navigateTo({
          url: `/pagesA/cartoonComment/detail?id=${id}`,
        });
      }
    },
    //回复
    addReply(data) {
      this.$emit("addReply", data);
    },
    // 点赞
    getLike(id, index, isLike) {
      this.$emit("setLike", { id, index, isLike });
    },
    //排序处理
    handleSort() {
      const { sortType } = this;
      this.sortType = sortType == "1" ? "0" : "1";
      this.$emit("handleSort", sortType);
    },
    scrolltolower() {
      this.$emit("scrolltolower");
    },
  },
  // 过滤器
  filters: {},
};
</script>

<style lang="scss" scoped>
.head {
  padding: 10rpx;
  width: 100%;
  display: flex;
  justify-content: space-between;
  .tag {
    margin-left: 20rpx;
    color: #5677fc;
    font-size: 24rpx;
    padding: 5rpx 10rpx;
    border: 1rpx solid #5677fc;
    border-radius: 10rpx;
  }
}
.block {
  width: 100%;
  height: 120rpx;
}
.comment {
  display: flex;
  padding: 30rpx;
  .left {
    image {
      width: 64rpx;
      height: 64rpx;
      border-radius: 50%;
      background-color: #f2f2f2;
    }
  }
  .right {
    flex: 1;
    padding-left: 20rpx;
    font-size: 30rpx;
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10rpx;
      .name {
        color: #5677fc;
      }
      .like {
        display: flex;
        align-items: center;
        color: #9a9a9a;
        font-size: 26rpx;
        .num {
          margin-right: 4rpx;
          color: #9a9a9a;
        }
      }
    }
    .content {
      margin-bottom: 10rpx;
    }
    .reply-box {
      background-color: rgb(242, 242, 242);
      border-radius: 12rpx;
      .item {
        padding: 20rpx;
        border-bottom: solid 2rpx $u-border-color;
        .username {
          font-size: 24rpx;
          color: #5677fc;
        }
      }
      .all-reply {
        padding: 20rpx;
        display: flex;
        color: #5677fc;
        align-items: center;
        .more {
          margin-left: 6rpx;
        }
      }
    }
    .bottom {
      margin-top: 20rpx;
      display: flex;
      font-size: 24rpx;
      color: #9a9a9a;
      .reply {
        color: #5677fc;
        margin-left: 10rpx;
      }
    }
  }
}
</style>
