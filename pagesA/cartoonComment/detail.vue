<template>
  <view>
    <commentReply v-if="commentDetail._id" :commentDetail="commentDetail" @addReply="addReply" @setLike="setLike" @scrolltolower="scrolltolower" />
    <u-overlay
      :show="show"
      @click="
        () => {
          replyUser = {};
          show = false;
        }
      "
    ></u-overlay>
    <view class="input u-f-ac">
      <u--textarea class="text" :focus="show" @focus="show = true" v-model="value" shape="circle" :placeholder="placeholder" autoHeight></u--textarea>
      <u-tag text="发表" type="warning" shape="circle" @click="addComment"></u-tag>
    </view>
  </view>
</template>

<script>
import commentReply from "@/components/comment/reply";
var id; //评论id
var pageIndex = 1;
export default {
  components: {
    commentReply,
  },
  data() {
    // 页面数据变量
    return {
      commentDetail: {},
      show: false,
      addReplyLoading: false,
      value: "",
      replyUser: {},
    };
  },
  // 监听 - 页面每次【加载时】执行(如：前进)
  onLoad(options = {}) {
    id = options.id;
    this.getCartoonComment();
  },
  // 函数
  methods: {
    // 页面数据初始化函数
    getCartoonComment() {
      uni.vk
        .callFunction({
          url: "client/comments/pub/getCommentDetail",
          title: "请求中...",
          data: {
            commentId: id,
            pageIndex: 1,
            pageSize: 999,
          },
        })
        .then((res) => {
          this.commentDetail = res.rows[0];
          this.addReplyLoading = false;
        });
    },
    addComment() {
      const { value, commentDetail, replyUser, addReplyLoading } = this;
      if (!addReplyLoading) {
        this.addReplyLoading = true;
      } else {
        return;
      }
      uni.vk
        .callFunction({
          url: "client/comments/kh/addComments",
          title: "",
          data: {
            caricature_id: commentDetail.caricature_id,
            parent_comment_id: commentDetail._id, // 父评论 主评论ID
            comment_content: value,
            comment_type: "1",
            reply_user_id: replyUser.reply_user_id || commentDetail.userInfo._id, //被回复的用户ID
            reply_comment_id: replyUser.reply_comment_id || commentDetail._id, // 被回复评论ID
          },
        })
        .then((res) => {
          console.log(res, "s");
          this.value = "";
          this.show = false;
          this.replyUser = {};
          this.getCartoonComment();
        });
    },
    addReply(data) {
      console.log("data", data);
      this.show = true;
      this.replyUser = {
        reply_user_id: data.user_id,
        reply_user_name: data.userInfo.nickname,
        reply_comment_id: data._id,
      };
    },
    setLike(id) {},
    scrolltolower() {},
  },
  // 过滤器
  filters: {},
  // 计算属性
  computed: {
    placeholder() {
      const { replyUser } = this;
      if (!replyUser.reply_user_name) {
        return "发一条友善的评论";
      } else {
        return `回复 @${replyUser.reply_user_name}：`;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.input {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 20rpx;
  z-index: 99999999;
  background: #fff;
  .text {
    margin-right: 20rpx;
    background: #f2f2f2;
  }
}
</style>
