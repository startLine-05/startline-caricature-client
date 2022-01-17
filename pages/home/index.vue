<template>
  <view>
    <view class="head u-f-ac">
      <view class="avatar">
        <u-avatar :src="vk.getVuex('$user.userInfo.avatar') || '/static/default.png'" size="60"></u-avatar>
      </view>
      <view class="name">
        <view> {{ vk.getVuex("$user.userInfo.nickname") || "暂无昵称" }}</view>
        <view class="signature">该用户还没有签名</view>
      </view>
      <view class="other">
        <u-icon name="arrow-right" size="38rpx" color="#c0c4cc"></u-icon>
      </view>
    </view>

    <!-- <u-gap height="10" bgColor="#ededed"></u-gap> -->

    <view>
      <u-cell-group>
        <block v-for="(item, index) in list" :key="item.id">
          <u-cell icon-size="50rpx" :icon="item.icon" :icon-style="{ color: item.color }" :title="item.text" @click="handle(index)"></u-cell>
        </block>
      </u-cell-group>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    list: function () {
      //前往的功能模块
      return [
        {
          id: 1,
          text: "编辑信息",
          icon: "edit-pen-fill",
          url: "/pagesB/bindPush/index",
          color: "#2979ff",
        },
        {
          id: 5,
          text: "稍后再看",
          icon: "grid-fill",
          url: "/pagesB/collection/index",
          color: "#f1a532",
        },
        {
          id: 7,
          text: "退出登录",
          icon: "setting-fill",
          url: "",
          color: "#6a6266",
        },
      ];
    },
  },
  methods: {
    toLogin() {
      uni.navigateTo({
        url: "/pages/login/index",
      });
    },
    handle(index) {
      // console.log(index)
      //路由跳转
      // if (this.list[index].id < 6) {
      //   uni.navigateTo({
      //     url: `${this.list[index].url}`,
      //   });
      // }
      uni.vk.navigateTo("/pages/login/index");
    },
  },
};
</script>

<style lang="scss">
pages {
  background: $u-bg-color;
}
.head {
  height: 200rpx;
  margin: 40rpx 30rpx;
  padding: 20rpx;
  border-radius: 15rpx;
  box-shadow: 2rpx 2rpx 10rpx #e6e6e6;
  .avatar {
    flex: 4;
  }
  .name {
    flex: 10;
    color: $u-main-color;
    .signature {
      margin-top: 10rpx;
      color: $u-tips-color;
      font-size: 24rpx;
    }
  }
  .other {
    flex: 1;
  }
}
</style>
