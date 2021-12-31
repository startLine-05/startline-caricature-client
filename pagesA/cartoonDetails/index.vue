<template>
  <view>
    <u-button text="月落" @click="showList = true"></u-button>
    <u-popup :show="showList" @close="showList = false">
      <view>
        <text>出淤泥而不染，濯清涟而不妖</text>
      </view>
    </u-popup>
  </view>
</template>

<script>
export default {
  data() {
    // 页面数据变量
    return {
      detailInfo: {},
      showList: false,
    };
  },
  // 监听 - 页面每次【加载时】执行(如：前进)
  onLoad(options = {}) {
    console.log(options, "ssss");
    this.getCaricatureDetail(options.id);
  },
  // 函数
  methods: {
    // 页面数据初始化函数
    getCaricatureDetail(id) {
      uni.vk
        .callFunction({
          url: "client/caricature/pub/getCaricatureDetail",
          title: "请求中...",
          data: {
            caricature_id: id,
          },
        })
        .then((res) => {
          this.detailInfo = res.data;
          console.log(res, "s");
        });
    },
    pageTo(path) {
      vk.navigateTo(path);
    },
  },
  // 过滤器
  filters: {},
  // 计算属性
  computed: {},
};
</script>
<style lang="scss" scoped></style>
