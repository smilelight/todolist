// pages/todo/todo.js

// pages/home/home.js
import Todo from '../../models/Todo'
import todoStore from '../../store/todoStore'
import TodoManager from '../../utils/todoManager'

//获取应用实例
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    // todos
    todos: [],

    // todo 计数
    uncompletedCount: 0,
    completedCount: 0,

    // 是否动画延迟
    delay: true,

    orders: ["时间", "类别", "优先级","默认"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 为了新建后列表能更新，此逻辑必须写在 onShow 事件
    this.syncData()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.syncData()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //自定义方法


  /**
   * 同步数据
   */
  syncData() {
    // 获取列表
    this.data.todos = todoStore.getTodos()
    this.update()
    // 更新置顶标题
    let uncompletedCount = todoStore.getUncompletedTodos().length
    let todayCompletedCount = todoStore.getTodayCompletedTodos().length
    let title = ['TodoList（进行中: ', uncompletedCount, ', 今日已完成: ', todayCompletedCount, '）'].join('')
    wx.setTopBarText({ text: title })
    // 动画结束后取消动画队列延迟
    setTimeout(() => {
      this.update({ delay: false })
    }, 2000)
  },

  /**
   * Todo 数据改变事件
   */
  handleTodoItemChange(e) {
    let index = e.currentTarget.dataset.index
    let todo = e.detail.data.todo
    let item = this.data.todos[index]
    Object.assign(item, todo)
    this.update()
  },

  /**
   * Todo 长按事件
   */
  handleTodoLongTap(e) {
    // 获取 index
    let index = e.currentTarget.dataset.index
    wx.showModal({
      title: '删除提示',
      content: '确定要删除这项任务吗？',
      success: (e) => {
        if (e.confirm) {
          this.data.todos.splice(index, 1)
          this.update()
        }
      }
    })
  },

  /**
   * 更新数据
   */
  update(data) {
    data = data || this.data
    data.completedCount = todoStore.getCompletedTodos().length
    data.uncompletedCount = todoStore.getUncompletedTodos().length
    this.setData(data)
  },

  /**
   * 新建事件
   */
  handleAddTodo(e) {
    wx.navigateTo({
      url: '../addTodo/addTodo'
    })
  },

  handleTap(e) {
    let uuid = e.currentTarget.dataset.uuid;
    console.log(todoStore.getTodo(uuid))
    wx.navigateTo({
      url: '../addTodo/addTodo?uuid=' + uuid,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  handOrderTap(e) {
    this.fuck = this.selectComponent("#fuck")
    console.log(this.fuck)
    console.log(this.fuck.properties == this.fuck.fata)
  },

  handleOrderBy(e) {
    let todoManager = new TodoManager(this.data.todos)
    console.log(e.detail)
    switch (e.detail.index) {
      case 0:
        this.setData({
          todos: todoManager.todoOrder(todoManager.orderTags[2], e.detail.direction)//按日期和时间排序
        })
        break
      case 1:
        this.setData({
          todos: todoManager.todoOrder(todoManager.orderTags[3], e.detail.direction)//按类别排序
        })
        break
      case 2:
        this.setData({
          todos: todoManager.todoOrder(todoManager.orderTags[4], e.detail.direction)//按优先级排序
        })
        break
      case 3:
        this.setData({
          todos: todoManager.todoOrder(todoManager.orderTags[5], e.detail.direction)//按优先级排序
        })
        break
    }
  }
})

//之前用来实现侧滑特效界面，现在弃用了

// const app = getApp()

// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     userInfo: {},
//     hasUserInfo: false,
//     canIUse: wx.canIUse('button.open-type.getUserInfo'),
//     open: false,
//     mark: 0,
//     newmark: 0,
//     startmark: 0,
//     endmark: 0,
//     windowWidth: wx.getSystemInfoSync().windowWidth,
//     staus: 1,
//     translate: ''
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
//     if (app.globalData.userInfo) {
//       this.setData({
//         userInfo: app.globalData.userInfo,
//         hasUserInfo: true
//       })
//     } else if (this.data.canIUse) {
//       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
//       // 所以此处加入 callback 以防止这种情况
//       app.userInfoReadyCallback = res => {
//         this.setData({
//           userInfo: res.userInfo,
//           hasUserInfo: true
//         })
//       }
//     } else {
//       // 在没有 open-type=getUserInfo 版本的兼容处理
//       wx.getUserInfo({
//         success: res => {
//           app.globalData.userInfo = res.userInfo
//           this.setData({
//             userInfo: res.userInfo,
//             hasUserInfo: true
//           })
//         }
//       })
//     }
//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {
  
//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {
  
//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {
  
//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {
  
//   },

//   tap_ch: function (e) {
//     if (this.data.open) {
//       this.setData({
//         translate: 'transform: translateX(0px)'
//       })
//       this.data.open = false;
//     } else {
//       this.setData({
//         translate: 'transform: translateX(' + this.data.windowWidth * 0.75 + 'px)'
//       })
//       this.data.open = true;
//     }
//   },
//   tap_start: function (e) {
//     this.data.mark = this.data.newmark = e.touches[0].pageX;
//     if (this.data.staus == 1) {
//       // staus = 1指默认状态
//       this.data.startmark = e.touches[0].pageX;
//     } else {
//       // staus = 2指屏幕滑动到右边的状态
//       this.data.startmark = e.touches[0].pageX;
//     }

//   },
//   tap_drag: function (e) {
//     /*
//      * 手指从左向右移动
//      * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标
//      */
//     this.data.newmark = e.touches[0].pageX;
//     if (this.data.mark < this.data.newmark) {
//       if (this.data.staus == 1) {
//         if (this.data.windowWidth * 0.75 > Math.abs(this.data.newmark - this.data.startmark)) {
//           this.setData({
//             translate: 'transform: translateX(' + (this.data.newmark - this.data.startmark) + 'px)'
//           })
//         }
//       }

//     }
//     /*
//      * 手指从右向左移动
//      * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标
//      */
//     if (this.data.mark > this.data.newmark) {
//       if (this.data.staus == 1 && (this.data.newmark - this.data.startmark) > 0) {
//         this.setData({
//           translate: 'transform: translateX(' + (this.data.newmark - this.data.startmark) + 'px)'
//         })
//       } else if (this.data.staus == 2 && this.data.startmark - this.data.newmark < this.data.windowWidth * 0.75) {
//         this.setData({
//           translate: 'transform: translateX(' + (this.data.newmark + this.data.windowWidth * 0.75 - this.data.startmark) + 'px)'
//         })
//       }

//     }

//     this.data.mark = this.data.newmark;

//   },
//   tap_end: function (e) {
//     if (this.data.staus == 1 && this.data.startmark < this.data.newmark) {
//       if (Math.abs(this.data.newmark - this.data.startmark) < (this.data.windowWidth * 0.2)) {
//         this.setData({
//           translate: 'transform: translateX(0px)'
//         })
//         this.data.staus = 1;
//       } else {
//         this.setData({
//           translate: 'transform: translateX(' + this.data.windowWidth * 0.75 + 'px)'
//         })
//         this.data.staus = 2;
//       }
//     } else {
//       if (Math.abs(this.data.newmark - this.data.startmark) < (this.data.windowWidth * 0.2)) {
//         this.setData({
//           translate: 'transform: translateX(' + this.data.windowWidth * 0.75 + 'px)'
//         })
//         this.data.staus = 2;
//       } else {
//         this.setData({
//           translate: 'transform: translateX(0px)'
//         })
//         this.data.staus = 1;
//       }
//     }

//     this.data.mark = 0;
//     this.data.newmark = 0;
//   }
// })