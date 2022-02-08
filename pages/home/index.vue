<template>
  <view>
    <view class="head u-f-ac">
      <view class="avatar">
        <u-avatar :src="vk.getVuex('$user.userInfo.avatar') || '/static/default.png'" size="60"></u-avatar>
      </view>
      <view v-if="vk.getVuex('$user.userInfo._id')" class="name">
        <view class="u-f-ac">
          <text style="margin-right: 10rpx">
            {{ vk.getVuex("$user.userInfo.nickname") || "暂无昵称" }}
          </text>

          <block v-if="vk.getVuex('$user.userInfo.gender')">
            <u-icon v-if="vk.getVuex('$user.userInfo.gender') == 1" name="man" color="#2979ff" size="50rpx"></u-icon>
            <u-icon v-else name="woman" color="#dd5145" size="50rpx"></u-icon>
          </block>
        </view>
        <view class="signature">{{ vk.getVuex("$user.userInfo.signature") || "该用户还没有签名" }}</view>
      </view>
      <view v-else class="name">
        <u-tag text="登录账号" style="width: 150rpx" shape="circle" @click="toLogin"></u-tag>
      </view>
      <view class="other">
        <u-icon name="arrow-right" size="38rpx" color="#c0c4cc"></u-icon>
      </view>
    </view>

    <view>
      <u-cell-group>
        <block v-for="(item, index) in optionList" :key="index">
          <u-cell icon-size="50rpx" :icon="item.icon" :icon-style="{ color: item.color }" :title="item.text" @click="handle(index)"></u-cell>
        </block>
      </u-cell-group>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          text: "编辑信息",
          icon: "edit-pen-fill",
          url: "/pagesA/userInfo/index",
          color: "#2979ff",
        },
        {
          text: "稍后再看",
          icon: "grid-fill",
          url: "/pagesA/laterRead/index",
          color: "#f1a532",
        },
      ],
    };
  },
  methods: {
    toLogin() {
      uni.vk.navigateTo("/pages/login/index");
    },
    handle(index) {
      const { optionList } = this;
      const url = optionList[index].url;
      if (url) {
        uni.vk.navigateTo(url);
      } else {
        uni.vk.userCenter.logout({
          success: function (data) {
            // 退出成功后清楚$store的用户信息
            uni.vk.setVuex("$user.userInfo", {});
            uni.vk.alert("退出成功");
          },
        });
      }
    },
  },
  // 计算属性
  computed: {
    optionList() {
      const { list } = this;
      if (this.vk.getVuex("$user.userInfo._id")) {
        return [
          ...list,
          {
            text: "退出登录",
            icon: "setting-fill",
            url: "",
            color: "#6a6266",
          },
        ];
      } else {
        return list;
      }
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
    flex: 3;
  }
  .name {
    flex: 10;
    color: $u-main-color;
    font-weight: bold;
    .signature {
      font-weight: 500;
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
