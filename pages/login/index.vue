<template>
  <view class="page">
    <view class="log u-f-ajc">
      <image src="@/static/logo.png" mode="widthFix"></image>
      <view>startLine-caricature</view>
    </view>
    <view class="form">
      <view class="group u-f-ac">
        <u-icon class="icon" name="account-fill" color="#c0c4cc" size="38"></u-icon>
        <u-input
          class="input"
          v-model="username"
          type="text"
          height="90"
          placeholder="请输入您的账号"
          style="width: 100%"
          placeholder-style="color: #999999;"
          maxlength="20"
        />
      </view>
      <view class="group u-f-ac" style="margin-bottom: 75rpx">
        <u-icon class="icon" name="lock-fill" color="#c0c4cc" size="38"></u-icon>
        <input class="input" :password="passwordType" placeholder="请输入您的密码" placeholder-class="place" v-model="password" maxlength="20" />
        <u-icon class="icon" :name="passwordType ? 'eye-off' : 'eye-fill'" color="#c0c4cc" size="38" @click="passwordType = !passwordType"></u-icon>
      </view>

      <u-button class="btn" type="primary" @click="login">登录</u-button>
	  <!-- <u-button class="btn" type="primary" @click="register">登录</u-button> -->
    </view>
    <u-toast ref="uToast" />
    <image class="bottom" src="@/static/loginbg.png" mode="widthFix"></image>
  </view>
</template>

<script>
import { commonTest } from "@/utils/rules.js";
export default {
  data() {
    return {
      //13399908887 13399908889 经理13399958881 !QAZ2wsx 18933334445
      username: "qq430482",
      password: "qq430482",
      passwordType: true,
    };
  },
  onLoad() {},
  methods: {
    // 登录
    login() {
      if (!(commonTest(this.username, "请输入账号") && commonTest(this.password, "请输入密码"))) return;
      uni.showLoading({
        title: "登录中",
      });

      const { username, password } = this;
      uni.vk.userCenter.login({
        data: {
          username,
          password,
        },
        success: function (data) {
          // 登录成功后将用户信息写入$store
          uni.vk.setVuex("$user.userInfo", data.userInfo);
          uni.vk.alert("登陆成功!");
        },
      });
    },
    // 用户注册
    register() {
      const { username, password } = this;
      uni.vk.userCenter.register({
        data: {
          username,
          password,
        },
        success: function (data) {
          console.log("ssss", data);
          uni.vk.alert("注册成功!");
        },
      });
    },
  },
};
</script>

<style lang="less">
page {
  background-color: #ffffff;
}
.log {
  margin: 100rpx 0;
  color: #2d6de3;
  font-size: 40rpx;
  font-weight: bold;
  flex-direction: column;
  image {
    width: 30%;
  }
}
.form {
  padding: 30rpx;
  .group {
    border-bottom: 1rpx solid #dbdbdb;
    .input {
      height: 90rpx;
      width: 555rpx;
      padding: 0 20rpx;
      font-size: 30rpx;
    }
  }
}
.bottom {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
