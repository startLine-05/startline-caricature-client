<template>
  <view>
    <comment :commentList="commentsList" @addReply="addReply" @setLike="setLike" @scrolltolower="scrolltolower" />
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
import comment from "@/components/comment/index";
var id; //漫画id

var pageIndex = 1;
export default {
  components: {
    comment,
  },
  data() {
    // 页面数据变量
    return {
      list: [],
      show: false,
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
          url: "client/comments/pub/getComments",
          title: "请求中...",
          data: {
            caricature_id: id,
            pageIndex: 1,
            pageSize: 999,
          },
        })
        .then((res) => {
          // pageIndex++;
          // this.list.push(...res.rows);
          this.list = res.rows;
        });
    },
    addComment() {
      const { value, replyUser } = this;
      uni.vk
        .callFunction({
          url: "client/comments/kh/addComments",
          title: "请求中...",
          data: {
            caricature_id: id,
            comment_content: value,
            comment_type: replyUser.reply_user_id ? "1" : "0",
            reply_user_id: replyUser.reply_user_id, //"61e3a4ae16a4710001e824ea",
            reply_comment_id: replyUser.reply_comment_id, //"61f7a0bd9329e70001d2b2e6", // 主评论ID
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
    commentsList() {
      const { list } = this;
      if (!list) {
        return [];
      }
      const commentsList = list.reduce((arr, v1) => {
        if (v1.comment_type === "0") {
          arr.push(v1);
        } else {
          const index = arr.findIndex((v2) => v1.reply_comment_id === v2._id);
          arr[index].children ? arr[index].children.push(v1) : (arr[index].children = [v1]);
          arr[index].childrenTemporary = arr[index].children.slice(0, 2);
        }
        return arr;
      }, []);
      console.log("ggggg", commentsList);
      return commentsList;
    },
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
