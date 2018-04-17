const app = getApp()

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
    // setTimeout(() => {
    //   // 打开主页面
    //   this.openPage()
    // }, 1500)
    this.openPage()
  },

  /**
   * 导航到主页面
   */
  openPage (replace) {
    let options = { url: '../calendar/calendar' }
    // 导航
    wx.switchTab(options)
  }
})