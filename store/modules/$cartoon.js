/**
 * vuex 漫画管理模块
 */
let lifeData = uni.getStorageSync("lifeData") || {};
let $cartoon = lifeData.$cartoon || {};
export default {
  // 通过添加 namespaced: true 的方式使其成为带命名空间的模块
  namespaced: true,
  /**
   * vuex的基本数据，用来存储变量
   */
  state: {
    cartoonDetails: {}, //漫画详情
    categoryList: $cartoon.categoryList || [], //分类详情
  },
  /**
   * 从基本数据(state)派生的数据，相当于state的计算属性
   */
  getters: {
    getUserInfo: (state) => {
      return state.cartoonDetails;
    },
  },
  /**
   * 提交更新数据的方法，必须是同步的(如果需要异步使用action)。
   * 每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。
   * 回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数，提交载荷作为第二个参数。
   */
  mutations: {},
  /**
   * 和mutation的功能大致相同，不同之处在于 ==》
   * 1. Action 提交的是 mutation，而不是直接变更状态。
   * 2. Action 可以包含任意异步操作。
   */
  actions: {},
};
