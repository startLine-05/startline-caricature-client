<template>
  <view>
    <view class="logo u-f-ajc">
      <image class="img" src="@/static/dct.png" mode="widthFix"></image>
      <view>startLine-caricature</view>
    </view>
    <view class="form">
      <view class="group u-f-ac">
        <u-input v-model="email" type="text" placeholder="请输入您的账号" prefixIcon="account-fill" maxlength="20" shape="circle" />
      </view>
      <view class="group u-f-ac" style="margin-bottom: 75rpx" v-if="type == 'pasd'">
        <u-input v-model="password" :password="passwordType" type="text" prefixIcon="lock-fill" placeholder="请输入您的密码" maxlength="20" shape="circle">
          <template slot="suffix">
            <u-icon class="icon" :name="passwordType ? 'eye-off' : 'eye-fill'" color="#c0c4cc" size="45rpx" @click="passwordType = !passwordType"></u-icon>
          </template>
        </u-input>
      </view>
      <view class="group u-f-ac" style="margin-bottom: 75rpx" v-else>
        <u--input placeholder="请输入验证码" shape="circle" v-model="code">
          <template slot="suffix">
            <u-code ref="uCode" @change="codeChange" seconds="60" changeText="X秒重新获取"></u-code>
            <u-button @tap="getCode" :text="tips" type="success" size="mini"></u-button>
          </template>
        </u--input>
      </view>

      <u-button class="btn" type="primary" @click="login">登录</u-button>
    </view>

    <view class="footer u-f-ajc">
      <text v-if="type == 'pasd'" open-type="navigate" @click="type = 'code'">验证码登录</text>
      <text v-else open-type="navigate" @click="type = 'pasd'">密码登录</text>
      <text class="center-line">|</text>
      <navigator url="./register" open-type="navigate">注册账号</navigator>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      email: "startline_05@163.com",
      password: "123456",
      code: "",
      type: "pasd",
      passwordType: true,
      tips: "",
    };
  },
  onLoad() {},
  methods: {
    // 登录
    async login() {
      const { email, password, code, type } = this;
      if (!uni.vk.pubfn.checkStr(email, "email")) {
        uni.vk.toast("请输入正确的邮箱号码", "none");
        return;
      }
      if (!password) {
        uni.vk.toast("请输入密码", "none");
        return;
      }
      uni.showLoading({
        title: "登录中",
      });
      var res;
      if (type == "pasd") {
        res = await uni.vk.userCenter.login({
          data: {
            username: email,
            password,
          },
        });
      } else {
        res = await uni.vk.userCenter.loginByEmail({
          data: {
            email,
            code,
          },
        });
      }
      // console.log("res登录成功", res);
      uni.vk.setVuex("$user.userInfo", res.userInfo);
      uni.vk.vuex.dispatch("$user/getStarsCaricature");
      uni.$u.toast("登陆成功");
      setTimeout(function () {
        // 跳转到首页,或页面返回
        var pages = getCurrentPages();
        if (pages.length > 1) {
          uni.vk.navigateBack();
        } else {
          // 进入首页
          uni.vk.navigateToHome();
        }
      }, 1000);
    },
    codeChange(text) {
      this.tips = text;
    },
    getCode() {
      const { email } = this;
      if (!uni.vk.pubfn.checkStr(email, "email")) {
        uni.$u.toast("请输入正确的邮箱号码");
        return;
      }
      if (this.$refs.uCode.canGetCode) {
        // 模拟向后端请求验证码
        uni.showLoading({
          title: "正在获取验证码",
        });
        uni.vk
          .callFunction({
            url: "client/user/pub/email",
            data: {
              type: "login",
              serviceType: "163",
              email,
            },
          })
          .then((res) => {
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
};
</script>

<style lang="scss">
.logo {
  padding: 50rpx 0;
  color: #2d6de3;
  font-size: 40rpx;
  font-weight: bold;
  flex-direction: column;
  image {
    width: 300rpx;
    border-radius: 50%;
  }
}
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
.footer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 32rpx;
  margin-top: 50rpx;
  color: rgba(0, 0, 0, 0.7);
  text-align: center;
  height: 40rpx;
  line-height: 40rpx;
  .center-line {
    font-size: 24rpx;
    margin-left: 15rpx;
    margin-right: 15rpx;
  }
}
</style>
