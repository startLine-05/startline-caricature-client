<template>
  <view>
    <u-list class="list" @scrolltolower="scrolltolower">
      <view class="head" v-if="type == 'complete'">
        <view>{{ sortType == "0" ? "热门" : "最新" }}评论（{{ commentList.length }}）</view>
        <u-icon :label="sortType == '0' ? '按热度' : '按时间'" name="list" size="38" @click="handleSort"></u-icon>
      </view>
      <u-list-item v-for="item in commentList" :key="item._id">
        <view class="comment">
          <view class="left"><image :src="item.userInfo.avatar" mode="aspectFill"></image></view>
          <view class="right">
            <view class="top">
              <view class="name">{{ item.userInfo.nickname }}</view>
              <view class="like" :class="{ highlight: item.isLike }">
                <view class="num">{{ item.like_count || "赞" }}</view>
                <u-icon v-if="!item.isLike" name="thumb-up" :size="40" color="#9a9a9a" @click="getLike(item._id)"></u-icon>
                <u-icon v-if="item.isLike" name="thumb-up-fill" :size="40" @click="getLike(item._id)"></u-icon>
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
              <view class="all-reply" @tap="toAllReply(item._id)" v-if="item.children.length">
                共{{ item.children.length }}条回复
                <u-icon class="more" name="arrow-right" :size="12"></u-icon>
              </view>
            </view>
            <view class="bottom">
              {{ item._add_time_str }}
              <view class="reply" @click="addReply(item)" v-if="type === 'complete'">回复</view>
            </view>
          </view>
        </view>
      </u-list-item>
      <view class="block"></view>
    </u-list>
  </view>
</template>

<script>
export default {
  props: {
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
      sortType: "1",
    };
  },
  created() {
    // this.getComment();
  },
  methods: {
    // 跳转到全部回复
    toAllReply(id) {
      uni.navigateTo({
        url: `/pagesA/cartoonComment/detail?id=${id}`,
      });
    },
    //回复
    addReply(data) {
      this.$emit("addReply", data);
    },
    // 点赞
    getLike(id) {
      // this.$emit('click')
      this.$emit("setLike", id);
      //   this.commentList[index].isLike = !this.commentList[index].isLike;
      //   if (this.commentList[index].isLike == true) {
      //     this.commentList[index].likeNum++;
      //   } else {
      //     this.commentList[index].likeNum--;
      //   }
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
};
</script>

<style lang="scss" scoped>
.head {
  padding: 10rpx;
  width: 100%;
  display: flex;
  justify-content: space-between;
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
      .highlight {
        color: #5677fc;
        .num {
          color: #5677fc;
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
