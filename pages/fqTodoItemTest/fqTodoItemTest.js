// pages/fqTodoItemTest/fqTodoItemTest.js
import Todo from '../../models/Todo'
import todoStore from '../../store/todoStore'

//获取应用实例
const app = getApp

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
    delay: true
  
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
    this.syncData();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.syncData();
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

  syncData() {
    // 获取列表
    this.data.todos = todoStore.getTodos()
    this.data.todos.forEach(todo => console.log(todo.level));
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

  update(data) {
    data = data || this.data
    data.completedCount = todoStore.getCompletedTodos().length
    data.uncompletedCount = todoStore.getUncompletedTodos().length
    this.setData(data)
  },
})