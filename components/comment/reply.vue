<template>
  <view class="wrap">
    <view class="comment">
      <view class="top">
        <view class="left">
          <view class="heart-photo"><image :src="commentDetail.userInfo.avatar" mode="aspectFill"></image></view>
          <view class="user-info u-f-ac">
            <view class="name">{{ commentDetail.userInfo.nickname }}</view>
          </view>
        </view>
        <view class="right" :class="{ highlight: commentDetail.isLike }">
          {{ commentDetail.like_count || "赞" }}
          <u-icon
            :name="commentDetail.isLike ? 'thumb-up-fill' : 'thumb-up'"
            :color="commentDetail.isLike ? '#e45656' : ''"
            class="like"
            :size="25"
            @click="getLike('1', commentDetail._id, commentDetail.isLike)"
          ></u-icon>
        </view>
      </view>
      <view class="bottom">
        <view class="content">{{ commentDetail.comment_content }}</view>
        <view class="date">{{ commentDetail.comment_date | date("yyyy-mm-dd") }} </view>
      </view>
    </view>
    <view class="all-reply">
      <view class="all-reply-top">全部回复（{{ commentDetail.children.length }}）</view>
      <view class="item" v-for="(item, index) in commentDetail.children" :key="item._id">
        <view class="comment">
          <view class="top">
            <view class="left">
              <view class="heart-photo"><image :src="item.userInfo.avatar" mode="aspectFill"></image></view>
              <view class="user-info u-f-ac">
                <view class="name">{{ item.userInfo.nickname }}</view>
                <text v-if="item.reply_comment_id !== commentDetail._id" style="color: #999999; padding: 0 10rpx">回复</text>
                <view v-if="item.reply_comment_id !== commentDetail._id" class="name">{{ item.replyUserInfo.nickname }}</view>
              </view>
            </view>
            <view class="right" :class="{ highlight: item.isLike }">
              <view class="num">{{ item.like_count || "赞" }}</view>
              <u-icon
                :name="item.isLike ? 'thumb-up-fill' : 'thumb-up'"
                :color="item.isLike ? '#e45656' : ''"
                class="like"
                :size="25"
                @click="getLike('0', item._id, item.isLike, index)"
              ></u-icon>
            </view>
          </view>
          <view class="bottom">
            <view class="content">{{ item.comment_content }}</view>
            <view class="date"
              >{{ item.comment_date | date("yyyy-mm-dd") }}
              <text class="reply" @click="addReply(item)"> 回复 </text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="block"></view>
  </view>
</template>

<script>
export default {
  props: {
    commentDetail: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    addReply(data) {
      this.$emit("addReply", data);
    },
    // 点赞
    getLike(type, id, isLike, index) {
      this.$emit("setLike", { type, id, index, isLike });
    },
  },
};
</script>

<style lang="scss" scoped>
page {
  background-color: #f2f2f2;
}
.block {
  width: 100%;
  height: 120rpx;
}
.comment {
  padding: 30rpx;
  font-size: 32rpx;
  background-color: #ffffff;

  .top {
    display: flex;
    justify-content: space-between;
  }
  .left {
    display: flex;
    .heart-photo {
      image {
        width: 64rpx;
        height: 64rpx;
        border-radius: 50%;
        background-color: #f2f2f2;
      }
    }
    .user-info {
      margin-left: 20rpx;
      .name {
        color: #5677fc;
        font-size: 30rpx;
        margin-bottom: 4rpx;
      }
    }
  }
  .right {
    display: flex;
    font-size: 20rpx;
    align-items: center;
    color: #9a9a9a;
    .like {
      margin-left: 6rpx;
    }
    .num {
      font-size: 26rpx;
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
.bottom {
  padding-left: 80rpx;
  .date {
    margin-top: 20rpx;
    font-size: 26rpx;
    color: $u-light-color;
    .reply {
      font-size: 26rpx;
      margin-left: 20rpx;
      color: #5677fc;
    }
  }
}
.all-reply {
  margin-top: 10rpx;
  padding-top: 20rpx;
  background-color: #ffffff;
  .all-reply-top {
    margin-left: 20rpx;
    padding-left: 20rpx;
    border-left: solid 4rpx #5677fc;
    font-size: 30rpx;
    font-weight: bold;
  }
  .item {
    border-bottom: solid 2rpx $u-border-color;
  }
}
</style>
