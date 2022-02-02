<template>
  <view class="wrap">
    <view class="comment">
      <view class="top">
        <view class="left">
          <view class="heart-photo"><image :src="commentDetail.userInfo.avatar" mode="aspectFill"></image></view>
          <view class="user-info">
            <view class="name">{{ commentDetail.userInfo.nickname }}</view>
            <view class="date">{{ commentDetail._add_time_str }}</view>
          </view>
        </view>
        <view class="right" :class="{ highlight: commentDetail.isLike }">
          {{ commentDetail.like_count || "赞" }}
          <u-icon v-if="!commentDetail.isLike" name="thumb-up" class="like" color="#9a9a9a" :size="30" @click="getLike"></u-icon>
          <u-icon v-if="commentDetail.isLike" name="thumb-up-fill" class="like" :size="30" @click="getLike"></u-icon>
        </view>
      </view>
      <view class="content">{{ commentDetail.comment_content }}</view>
    </view>
    <view class="all-reply">
      <view class="all-reply-top">全部回复（{{ commentDetail.children.length }}）</view>
      <view class="item" v-for="item in commentDetail.children" :key="item._id">
        <view class="comment">
          <view class="top">
            <view class="left">
              <view class="heart-photo"><image :src="item.userInfo.avatar" mode="aspectFill"></image></view>
              <view class="user-info">
                <view class="name">{{ item.userInfo.nickname }}</view>
                <view class="date">{{ item._add_time_str }}</view>
              </view>
            </view>
            <view class="right" :class="{ highlight: item.isLike }">
              <view class="num">{{ item.like_count || "赞" }}</view>
              <u-icon v-if="!item.isLike" name="thumb-up" class="like" :size="30" color="#9a9a9a" @click="getLike(index)"></u-icon>
              <u-icon v-if="item.isLike" name="thumb-up-fill" class="like" :size="30" @click="getLike(index)"></u-icon>
            </view>
          </view>
          <view class="content">{{ item.comment_content }}</view>
        </view>
      </view>
    </view>
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
    return {
      commentList: [],
      comment: "",
    };
  },
  created() {},
  methods: {
    // 点赞
    getLike(index) {},
  },
};
</script>

<style lang="scss" scoped>
page {
  background-color: #f2f2f2;
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
      .date {
        font-size: 26rpx;
        color: $u-light-color;
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
