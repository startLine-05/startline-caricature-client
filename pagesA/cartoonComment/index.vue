<template>
  <view :class="show ? 'mask-show': ''">
    <comment :commentList="list" :total="total" @addReply="addReply" @setLike="setLike" @scrolltolower="scrolltolower" @handleSort="handleSort" />
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
var userId; //用户id
var id; //漫画id
var pageIndex = 1; //页数
var type = "1"; //排序类型
export default {
  components: {
    comment,
  },
  data() {
    // 页面数据变量
    return {
      list: [],
      total: 0,
      isEmpty: false,
      show: false,
      loading: false,
      addReplyLoading: false,
      value: "",
      replyUser: {},
    };
  },
  // 监听 - 页面每次【加载时】执行(如：前进)
  onLoad(options = {}) {
    id = options.id;
    pageIndex = 1;
    userId = uni.vk.getVuex("$user.userInfo._id");
    this.getCartoonComment();
  },
  // 函数
  methods: {
    // 页面数据初始化函数
    getCartoonComment() {
      const { isEmpty, loading } = this;
      if (isEmpty || loading) {
        return;
      }
      this.loading = true;
      uni.vk
        .callFunction({
          url: "client/comments/pub/getComments",
          title: "获取评论中...",
          data: {
            caricature_id: id,
            type,
            pageIndex,
            pageSize: 10,
          },
        })
        .then((res) => {
          this.total = res.total;
          res.rows = res.rows.map((v) => {
            return {
              ...v,
              childrenTemporary: v.children.slice(0, 2),
              isLike: v.isLike || v.like_user?.includes(userId),
            };
          });
          if (res.rows.length < 10) {
            this.isEmpty = true;
          }
          pageIndex == 1 ? (this.list = res.rows) : this.list.push(...res.rows);
          pageIndex++;
          this.loading = false;
          this.addReplyLoading = false;
          // this.list.push(...res.rows);
          // this.list = res.rows;
        });
    },
    addComment() {
      const { value, replyUser, addReplyLoading } = this;
      if (!addReplyLoading) {
        this.addReplyLoading = true;
      } else {
        return;
      }
      uni.vk
        .callFunction({
          url: "client/comments/kh/addComments",
          title: "发表评论中",
          data: {
            caricature_id: id,
            comment_content: value,
            comment_type: replyUser.reply_user_id ? "1" : "0",
            reply_user_id: replyUser.reply_user_id, //被回复的用户ID,
            reply_comment_id: replyUser.reply_comment_id, // 被回复评论ID
            parent_comment_id: replyUser.parent_comment_id, // 父评论 主评论ID
          },
        })
        .then((res) => {
          setTimeout(() => {
            pageIndex = 1;
            this.getCartoonComment();
          }, 100);
        })
        .finally(() => {
          this.reset();
        });
    },
    addReply(data) {
      console.log("data", data);
      this.show = true;
      this.replyUser = {
        reply_user_id: data.user_id,
        reply_user_name: data.userInfo.nickname,
        reply_comment_id: data._id,
        parent_comment_id: data._id,
      };
    },
    //重置
    reset() {
      pageIndex = 1;
      this.isEmpty = false;
      this.value = "";
      this.show = false;
      this.replyUser = {};
    },
    //排序
    handleSort(data) {
      type = data;
      this.reset();
      this.getCartoonComment();
    },
    //点赞
    setLike(data) {
      const { id, index, isLike } = data;
      const { list } = this;

      if (isLike) {
        list[index].like_count--;
        list[index].isLike = false;
      } else {
        list[index].like_count++;
        list[index].isLike = true;
      }

      uni.$u.debounce(() => {
        uni.vk
          .callFunction({
            url: "client/comments/kh/setCommentLike",
            data: {
              comments_id: id,
              type: list[index].isLike ? "1" : "0",
            },
          })
          .then((res) => {});
      }, 1000);
    },
    //加载
    scrolltolower() {
      this.getCartoonComment();
    },
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
.mask-show{
  overflow: hidden;
  position:fixed;
  height: 100%;
  width: 100%;
}
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
