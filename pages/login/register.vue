<template>
  <view class="app register">
    <!-- 页面内容开始 -->
    <view class="content">
      <!-- 头部logo -->
      <view class="header"><image class="logo" src="/static/logo.png"></image></view>
      <view class="form">
        <view class="group u-f-ac">
          <u-input v-model="form.email" type="text" placeholder="请输入您的邮箱" prefixIcon="account-fill" maxlength="20" shape="circle" />
        </view>
        <view class="group u-f-ac">
          <u-input v-model="form.password" type="text" password placeholder="请输入您的密码" prefixIcon="lock-fill" maxlength="20" shape="circle" />
        </view>
        <view class="group u-f-ac">
          <u-input v-model="form.password2" type="text" password placeholder="请再次输入您的密码" prefixIcon="lock-fill" maxlength="20" shape="circle" />
        </view>

        <view class="group u-f-ac">
          <u--input placeholder="请输入验证码" shape="circle" v-model="form.code">
            <template slot="suffix">
              <u-code ref="uCode" @change="codeChange" seconds="60" changeText="X秒重新获取"></u-code>
              <u-button @tap="getCode" :text="tips" type="success" size="mini"></u-button>
            </template>
          </u--input>
        </view>
      </view>

      <view class="login-btn">
        <button class="btn success circle" hover-class="hover" shape="circle" @click="loginBySms" :plain="false" :hair-line="false" type="success">
          注 册
        </button>
      </view>

      <!-- 底部信息 -->
      <view class="footer">
        <label>
          <checkbox-group @change="checkboxChange">
            <checkbox class="footer-checkbox" value="true" :checked="form.agreement" active-color="#737373" shape="circle"></checkbox><text>同意</text>
          </checkbox-group>
        </label>

        <!-- 协议 -->
        <text style="color: #007aff" @click="show = true">《用户协议》</text>
      </view>

      <u-modal
        :show="show"
        :closeOnClickOverlay="true"
        @close="show = false"
        @confirm="show = false"
        title="免责声明"
        content="该项目遵循MIT开源协议，漫画素材均来自网络，请勿用于商业，违者概不负责"
      ></u-modal>
    </view>
  </view>
</template>

<script>
var vk; // vk依赖
export default {
  data() {
    // 页面数据变量
    return {
      // 表单请求数据
      form: {
        agreement: true,
        email: "startline_05@163.com",
        password: "qq430482",
        password2: "qq430482",
        code: "",
        type: "register",
      },
      isRotate: false, //是否已经请求
      tips: "",
      show: false,
    };
  },
  // 监听 - 页面每次【加载时】执行(如：前进)
  onLoad(options) {
    vk = this.vk;
  },
  // 函数
  methods: {
    checkboxChange(e) {
      let value = e.detail.value || [];
      if (value.length > 0 && value[0]) {
        this.form.agreement = true;
      } else {
        this.form.agreement = false;
      }
    },
    // 登录(手机号+验证码) 不存在会自动注册
    loginBySms() {
      if (this.isRotate) {
        //判断是否加载中，避免重复点击请求
        return false;
      }
      const { agreement, email, code, password, password2 } = this.form;
      if (!agreement) {
        vk.toast("请阅读并同意用户服务及隐私协议", "none");
        return;
      }
      if (!vk.pubfn.checkStr(email, "email")) {
        vk.toast("请输入正确的邮箱号码", "none");
        return;
      }
      if (!vk.pubfn.checkStr(password, "pwd")) {
        vk.toast("密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线", "none");
        return;
      }
      if (!vk.pubfn.checkStr(password2, "pwd")) {
        vk.toast("密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线", "none");
        return;
      }
      if (password != password2) {
        vk.toast("两次密码必须相同!", "none");
        return;
      }
      if (!vk.pubfn.checkStr(code, "emailCode")) {
        vk.toast("验证码格式为6位数字", "none");
        return;
      }
      this.isRotate = true;
      vk.userCenter.loginByEmail({
        data: this.form,
        success: function (data) {
          vk.vuex.dispatch("$user/getStoreCaricature");
          this.isRotate = false;
          vk.toast("注册成功!");
          setTimeout(function () {
            // 跳转到首页,或页面返回
            var pages = getCurrentPages();
            if (pages.length > 1) {
              vk.navigateBack();
            } else {
              // 进入首页
              vk.navigateToHome();
            }
          }, 1000);
        },
        complete: function () {
          this.isRotate = false;
        },
      });
    },
    codeChange(text) {
      this.tips = text;
    },
    getCode() {
      const { email } = this.form;
      if (!vk.pubfn.checkStr(email, "email")) {
        vk.toast("请输入正确的邮箱号码", "none");
        return;
      }
      if (this.$refs.uCode.canGetCode) {
        // 模拟向后端请求验证码
        uni.showLoading({
          title: "正在获取验证码",
        });
        vk.callFunction({
          url: "client/user/pub/email",
          data: {
            type: "register",
            serviceType: "163", //默认写死163 邮箱配置
            email: email,
          },
        }).then((res) => {
          // 这里此提示会被this.start()方法中的提示覆盖
          uni.$u.toast("验证码已发送");
          // 通知验证码组件内部开始倒计时
          this.$refs.uCode.start();
        });
      } else {
        uni.$u.toast("倒计时结束后再发送");
      }
    },
  },
  // 过滤器
  filters: {},
  // 计算属性
  computed: {},
};
</script>
<style lang="scss" scoped>
@import url("./main.css");

.form {
  padding: 30rpx;
  .group {
    margin: 20rpx 0;
  }
  .btn {
    width: 600rpx;
    border-radius: 50rpx;
  }
}
.mode {
  width: 600rpx;
  height: 400rpx;
  padding: 15rpx;
}
</style>
