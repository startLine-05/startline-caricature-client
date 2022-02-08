<template>
  <view>
    <view class="form">
      <u--form labelPosition="left" :model="model" ref="form" :rules="rules">
        <u-form-item label="头像" prop="avatar" borderBottom>
          <view v-if="!model.avatar" class="img u-f-ajc" @click="chooseImage">
            <u-icon size="50rpx" name="plus" color="#fff"></u-icon>
          </view>
          <image v-else :src="model.avatar" mode="scaleToFill" class="img" @click="chooseImage" />
        </u-form-item>
        <u-form-item label="昵称" prop="nickname" borderBottom>
          <u--input v-model="model.nickname" border="none" :maxlength="10"></u--input>
        </u-form-item>
        <u-form-item label="签名" prop="signature" borderBottom>
          <u--textarea autoHeight v-model="model.signature" border="none" :maxlength="30"></u--textarea>
        </u-form-item>
        <u-form-item label="性别" prop="userInfo.gender" borderBottom @click="showSex = true">
          <u--input :value="gender" disabled disabledColor="#ffffff" placeholder="请选择性别" border="none"></u--input>
          <u-icon slot="right" name="arrow-right"></u-icon>
        </u-form-item>
      </u--form>
    </view>
    <u-button class="btn" type="primary" @click="submit">提交</u-button>
    <u-action-sheet :show="showSex" :actions="actions" title="请选择性别" @close="showSex = false" @select="sexSelect" />
  </view>
</template>

<script>
export default {
  data() {
    return {
      model: uni.vk.getVuex("$user.userInfo"),
      showSex: false,
      actions: [
        {
          name: "男",
          id: 1,
        },
        {
          name: "女",
          id: 2,
        },
        {
          name: "保密",
          id: 0,
        },
      ],
      rules: {
        nickname: {
          type: "string",
          required: true,
          message: "请输入昵称",
          trigger: ["blur", "change"],
        },
      },
    };
  },
  // 计算属性
  computed: {
    gender() {
      const { gender } = this.model;
      return !gender ? "未知" : gender == 1 ? "男" : "女";
    },
  },
  onload() {},
  methods: {
    sexSelect(e) {
      console.log(e);
      this.model.gender = e.id;
    },
    chooseImage() {
      uni.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        success: (res) => {
          // 上传至 unicloud云储存
          this.model.avatar = res.tempFilePaths[0];
        },
      });
    },
    submit() {
      const { avatar } = this.model;
      this.$refs.form
        .validate()
        .then(async (res) => {
          const reg = /^blob/g;
          uni.showLoading({
            title: "保存信息中",
          });
          if (reg.test(avatar)) {
            let res = await uni.vk.callFunctionUtil.uploadFile({
              filePath: avatar,
              suffix: "png", // 不传suffix会自动获取，但H5环境下获取不到后缀，但可以通过file.name 获取
              provider: "unicloud",
            });
            this.model.avatar = res.url;
          }
          uni.vk
            .callFunction({
              url: "client/user/kh/update",
              data: this.model,
            })
            .then((res) => {
              // 这里此提示会被this.start()方法中的提示覆盖
              uni.$u.toast("用户信息更新成功");
              uni.vk.vuex.dispatch("$user/getCurrentUserInfo");
              console.log(res);
            })
            .finally(() => {
              uni.hideLoading();
            });
        })
        .catch((errors) => {});
    },
  },
};
</script>

<style lang="scss">
.form {
  padding: 20rpx;
  margin-bottom: 50rpx;
}
.img {
  width: 120rpx;
  height: 120rpx;
  background: #c6c6c6;
  border-radius: 15rpx;
}
.btn {
  width: 600rpx;
  border-radius: 50rpx;
}
</style>
