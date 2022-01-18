<template>
  <view>
    <view class="head"></view>
    <view class="list u-f-ac">
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
      list: uni.vk.getVuex('$user.userStars'),
    };
  },
  // 监听 - 页面每次【加载时】执行(如：前进)
  onLoad(options = {}) {

  },
  methods: {
    // 页面数据初始化函数
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
</style>