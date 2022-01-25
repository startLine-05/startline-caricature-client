<template>
  <view>
    <view class="head">
      <view class="search">
        <u-search class="search" bgColor="#fff" :show-action="true" actionText="搜索" :animation="true"></u-search>
      </view>

      <u-swiper
        :list="stickyList"
        keyName="avatar"
        indicator
        circular
        previousMargin="30"
        nextMargin="30"
        :autoplay="false"
        radius="5"
        bgColor="#ffffff"
      ></u-swiper>
    </view>

    <view class="list u-f-ac">
      <block v-for="item in list" :key="item._id">
        <card :cardInfo="item" />
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
      list: [],
      stickyList: [],
    };
  },
  // 监听 - 页面每次【加载时】执行(如：前进)
  onLoad(options = {}) {
    this.init(options);
    this.getCategory();
    this.getCaricatureSticky();
  },
  methods: {
    // 页面数据初始化函数
    init(options) {
      // promise方式
      uni.vk
        .callFunction({
          url: "client/caricature/pub/getCaricatureList",
          title: "请求中...",
          data: {
            pageIndex: 1,
            pageSize: 10,
          },
        })
        .then((res) => {
          this.list = res.rows;
        });
    },
    //查询分类
    getCategory() {
      uni.vk
        .callFunction({
          url: "common/pub/getCategory",
          title: "请求中...",
          data: {
            pageIndex: 1,
            pageSize: 10,
          },
        })
        .then((res) => {
          uni.vk.setVuex("$cartoon.categoryList", res.data);
        });
    },
    //获取置顶漫画
    getCaricatureSticky() {
      uni.vk
        .callFunction({
          url: "client/caricature/pub/getCaricatureSticky",
          title: "请求中...",
          data: {
            pageIndex: 1,
            pageSize: 10,
          },
        })
        .then((res) => {
          this.stickyList = res.data;
        });
    },
  },
  // 过滤器
  filters: {},
  // 计算属性
  computed: {},
};
</script>
<style lang="less">
.head {
  margin-bottom: 20rpx;
  .search {
    padding: 10rpx;
    margin-bottom: 40rpx;
    background: #f2f2f2;
  }
}
.list {
  padding: 30rpx;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
