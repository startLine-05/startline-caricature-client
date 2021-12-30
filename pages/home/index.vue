<template>
  <view>
    <u-row justify="space-between" gutter="10">
      <u-col span="4">
        <u-avatar :src="vk.getVuex('$user.userInfo.avatar') || '/static/default.png'" size="50"></u-avatar>
      </u-col>

      <u-col span="4" class="u-f-ac">
        <view>
          <text>{{ vk.getVuex("$user.userInfo.nickname") }} · 置业顾问</text>
          <u-icon name="/static/gs.png" size="25" style="margin-left: 10rpx"></u-icon>
        </view>
        <view class="">{{ 22 }}</view>
      </u-col>

      <u-col span="2">
        <u-icon name="arrow-right" color="#969799" size="28"></u-icon>
      </u-col>
    </u-row>

    <u-gap height="10" bgColor="#ededed"></u-gap>

    <view>
      <u-cell-group>
        <block v-for="(item, index) in list" :key="item.id">
          <u-cell icon-size="38" :icon="item.icon" :icon-style="{ color: item.color }" :title="item.text" @click="handle(index)"></u-cell>
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
          text: "绑定推送",
          icon: "attach",
          url: "/pagesB/bindPush/index",
          color: "#6a6266",
        },
        {
          id: 2,
          text: "我的收藏",
          icon: "star-fill",
          url: "/pagesB/myStar/index",
          color: "#dc4c3f",
        },
        {
          id: 5,
          text: "声纹采集",
          icon: "fingerprint",
          url: "/pagesB/collection/index",
          color: "#272822",
        },
        {
          id: 6,
          text: "工牌绑定",
          icon: "mic",
          url: "/pagesB/BLE/index",
          color: "#2d6de3",
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
      if (this.list[index].id < 6) {
        uni.navigateTo({
          url: `${this.list[index].url}`,
        });
      }
    },
  },
};
</script>

<style lang="scss">
pages {
  background: #ededed;
}
</style>
