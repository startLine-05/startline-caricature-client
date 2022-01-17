<template>
  <view>
    <view class="head"></view>
    <view class="list u-f-ac">
      <block v-for="item in list" :key="item._id">
        <view class="card">
          <u--image
            :showLoading="true"
            @click="toDeatail(item._id)"
            mode="aspectFill"
            :src="item.avatar || '/static/noLogin.png'"
            width="100%"
            height="400rpx"
          ></u--image>
          <view class="info u-f-ac">
            <view>
              {{ item.name }}
            </view>
            <u-icon size="28" name="list-dot" @click="handle(item)"></u-icon>
          </view>
        </view>
      </block>
    </view>
    <u-action-sheet :actions="actionList" round="5" @select="selectClick" @close="show = false" :show="show"></u-action-sheet>
  </view>
</template>

<script>
var that; // 当前页面对象
var vk; // vk依赖
var row = {};
export default {
  data() {
    // 页面数据变量
    return {
      list: [],
      show: false,
      actionList: [
        {
          option: "add",
          name: "稍后再看",
          color: "#ffaa7f",
          fontSize: "20",
        },
        {
          option: "addStars",
          name: "加入书架",
          color: "#ffaa7f",
          fontSize: "20",
        },
      ],
    };
  },
  onPageScroll(e) {
    that.scrollTop = e.scrollTop;
  },
  // 监听 - 页面每次【加载时】执行(如：前进)
  onLoad(options = {}) {
    that = this;
    vk = that.vk;
    that.options = options;
    that.init(options);
  },
  // 监听 - 页面【首次渲染完成时】执行。注意如果渲染速度快，会在页面进入动画完成前触发
  onReady() {},
  // 监听 - 页面每次【显示时】执行(如：前进和返回) (页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面)
  onShow() {},
  // 监听 - 页面每次【隐藏时】执行(如：返回)
  onHide() {},
  // 监听 - 页面触底部
  onReachBottom() {},
  // 监听 - 页面创建时
  created() {},
  // 函数
  methods: {
    // 页面数据初始化函数
    init(options) {
      // promise方式
      vk.callFunction({
        url: "client/caricature/pub/getCaricatureList",
        title: "请求中...",
        data: {
          pageIndex: 1,
          pageSize: 10,
        },
      }).then((res) => {
        this.list = res.rows;
        console.log(res, "s", this.list);
      });
    },
    handle(data) {
      row = data;
      this.show = true;
    },
    selectClick(data) {
      console.log(data);
      if (data.option === "addStars") {
        vk.callFunction({
          url: "client/caricature/kh/addStarsCaricature",
          title: "请求中...",
          data: {
            caricature_id: row._id,
            option: "add",
          },
        }).then((res) => {
          vk.vuex.dispatch("$user/getStoreCaricature");
        });
      } else {
        //测试获取详情
        // vk.callFunction({
        // 	url: "client/caricature/pub/getCaricatureDetail",
        // 	title: "请求中...",
        // 	data: {
        // 		caricature_id:row._id,
        // 	},
        // }).then((res) => {
        // 	console.log(res, "s");
        // });
        //测试添加评论
        // vk.callFunction({
        // 	url: "client/comments/kh/addComments",
        // 	title: "请求中...",
        // 	data: {
        // 		caricature_id:row._id,
        // 		comment_content:'测试回复能力3',
        // 		comment_type:'1',
        // 		reply_user_id:'61cc323e2c35190001dc3dc2',
        // 		reply_comment_id:"61ce6095ec096d00014bf80b" // 主评论ID
        // 	},
        // }).then((res) => {
        // 	console.log(res, "s");
        // });
        //测试获取评论内容
        vk.callFunction({
          url: "client/comments/pub/getComments",
          title: "请求中...",
          data: {
            caricature_id: row._id,
          },
        }).then((res) => {
          console.log(res, "s");
        });
      }
    },
    //查看详情页面
    toDeatail(id) {
      vk.navigateTo(`/pagesA/cartoonDetails/index?id=${id}`);
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
<style lang="less" scoped>
.list {
  padding: 30rpx;
  flex-wrap: wrap;
  justify-content: space-between;
  .card {
    width: 335rpx;
    height: 500rpx;
    margin-bottom: 25rpx;
    border: 1rpx solid #bebebe;
    border-radius: 15rpx;
    box-shadow: 2rpx 2rpx 10rpx #e6e6e6;
    overflow: hidden;
  }
  .info {
    padding: 10rpx 20rpx;
    color: #616161;
    font-size: 26rpx;
    font-weight: bold;
    justify-content: space-between;
  }
}
</style>
