const app = getApp()

import SettingStore from '../../store/settingStore.js'

import Const from '../../utils/const.js'

// views/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    setTimeout(() => {
      // 打开主页面
      this.openTodo()
    }, 1500)
  },

  /**
   * 导航到主页面
   */
  openPage (replace) {
    var url = ''
    switch (SettingStore.getConfigs.todoListStyle){
      case 1:
          url = Const.todoListPath
        break;
      case 2:
          url = Const.todoCardPath
        break;
      case 3:
          url = Const.todoCalendarPath
        break;
      default:
    }
    // 导航
    wx.redirectTo({
      url: url,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  openTodo(){
    wx.switchTab({
      url: '../todoList/todoList',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})