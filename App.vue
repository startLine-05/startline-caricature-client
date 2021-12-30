<script>
import config from "@/app.config.js";
export default {
  methods: {},
  // 监听 - 页面404
  onPageNotFound: function (e) {
    uni.redirectTo({
      url: config.error.url,
    });
  },
  onLaunch: function () {
    if (config.debug) console.log("App Launch");
    let that = this;
  },
  onShow: function () {
    if (config.debug) console.log("App Show");
  },
  onHide: function () {
    if (config.debug) console.log("App Hide");
  },
};
</script>

<style lang="scss">
/*每个页面公共css */
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import "@/uni_modules/uview-ui/index.scss";
@import "./common/css/app.scss";
</style>
