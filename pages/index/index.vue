<template>
  <view>
    <view class="head">
      <view class="search">
        <u-search
          class="search"
          bgColor="#fff"
          :show-action="true"
          actionText="搜索"
          :animation="true"
          v-model="searchvalue"
          @search="getCaricatureList"
        ></u-search>
      </view>
      <u-sticky class="tabs" bgColor="#f2f2f2">
        <u-tabs :list="categoryList" keyName="label" @change="change"></u-tabs>
      </u-sticky>
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
        @click="toPage"
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
var pageIndex = 1;
var tabs = {
  label: "推荐",
  value: "",
};
import card from "@/components/card/index";
export default {
  components: {
    card,
  },
  data() {
    // 页面数据变量
    return {
      isEmpty: false,
      list: [], //漫画列表
      stickyList: [], //置顶漫画列表
      categoryList: [
        {
          label: "推荐",
          value: "",
        },
      ], //分类
      searchvalue: "",
    };
  },
  // 监听 - 页面每次【加载时】执行(如：前进)
  onLoad() {
    this.getCaricatureList();
    this.getCategory();
    this.getCaricatureSticky();
  },
  onPullDownRefresh() {
    pageIndex = 1;
    this.reset();
    this.getCaricatureList();
  },

  methods: {
    // 页面数据初始化函数
    getCaricatureList() {
      const { searchvalue, isEmpty } = this;
      if (isEmpty) {
        return;
      }
      uni.vk
        .callFunction({
          url: "client/caricature/pub/getCaricatureList",
          title: "获取漫画列表...",
          data: {
            pageIndex,
            pageSize: 10,
            searchvalue,
            category_id: tabs.value,
            is_essence: tabs.value ? false : true,
          },
        })
        .then((res) => {
          if (res.rows.length < 10) {
            this.isEmpty = true;
          }
          pageIndex == 1 ? (this.list = res.rows) : this.list.push(...res.rows);
          pageIndex++;
        })
        .finally(() => {
          uni.stopPullDownRefresh();
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
          this.categoryList.push(...res.data);
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
    //跳转页面
    toPage(index) {
      const { stickyList } = this;
      const id = stickyList[index]._id;
      uni.vk.navigateTo(`/pagesA/cartoonDetails/index?id=${id}`);
    },
    //重置
    reset() {
      pageIndex = 1;
      this.isEmpty = false;
    },
    change(data) {
      this.reset();
      tabs = data;
      console.log(data);
      this.getCaricatureList();
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
  background: #f2f2f2;
  .search {
    padding: 10rpx 10rpx 0rpx 10rpx;
  }
  .tabs {
    padding: 10rpx;
  }
}
.list {
  padding: 30rpx;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
