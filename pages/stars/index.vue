<template>
  <view>
    <view class="head"></view>
    <u-empty v-if="!vk.getVuex('$user.userInfo._id')" iconSize="120" mode="history" text="登录才能知道自己追了哪些漫画哦~" marginTop="100">
      <view class="empty">
        <u-tag text="前往登录" shape="circle" @click="toLogin"></u-tag>
      </view>
    </u-empty>
    <view v-else class="list u-f-ac">
      <block v-for="item in list" :key="item._id">
        <card :cardInfo="item.starsDetail" />
      </block>
    </view>
  </view>
</template>

<script>
import card from "@/components/card/index";
export default {
  components: {
    card,
  },
  data() {
    // 页面数据变量
    return {
      list: uni.vk.getVuex("$user.userStars"),
    };
  },
  // 监听 - 页面每次【加载时】执行(如：前进)
  onLoad(options = {}) {
    const list = uni.vk.getVuex("$user.userStars");
    if (list.length == 0) {
    }
  },
  methods: {
    // 页面数据初始化函数
    toLogin() {
      uni.vk.navigateTo("/pages/login/index");
    },
  },
  // 过滤器
  filters: {},
  // 计算属性
  computed: {},
};
</script>
<style lang="less" scoped>
.list {
  padding: 30rpx;
  flex-wrap: wrap;
  justify-content: space-between;
}
.empty {
  margin-top: 50rpx;
}
</style>
