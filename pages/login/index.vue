<template>
  <view>
    <view class="log u-f-ajc">
      <image src="@/static/logo.png" mode="widthFix"></image>
      <view>startLine-caricature</view>
    </view>
    <view class="form">
      <view class="group u-f-ac">
        <u-input v-model="username" type="text" placeholder="请输入您的账号" prefixIcon="account-fill" maxlength="20" shape="circle" />
      </view>
      <view class="group u-f-ac" style="margin-bottom: 75rpx">
        <u-input v-model="password" :password="passwordType" type="text" prefixIcon="lock-fill" placeholder="请输入您的密码" maxlength="20" shape="circle">
          <template slot="suffix">
            <u-icon class="icon" :name="passwordType ? 'eye-off' : 'eye-fill'" color="#c0c4cc" size="45rpx" @click="passwordType = !passwordType"></u-icon>
          </template>
        </u-input>
      </view>

      <u-button class="btn" type="primary" @click="login">登录</u-button>
    </view>

    <view class="footer u-f-ajc">
      <navigator url="../forget/forget" open-type="navigate">找回密码</navigator>
      <text class="center-line">|</text>
      <navigator url="./register" open-type="navigate">注册账号</navigator>
    </view>
    <u-toast ref="uToast" />
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

<style lang="scss">
.log {
  padding: 50rpx 0;
  color: #2d6de3;
  font-size: 40rpx;
  font-weight: bold;
  flex-direction: column;
  image {
    width: 300rpx;
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
