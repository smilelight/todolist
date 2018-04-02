// pages/testAnimation/testAnimation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData:{}
  
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
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
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

  handleTap: function(e) {
    let ani = wx.createAnimation({
      duration: 3000,
      timingFunction: 'linear',
      delay: 0,
      transformOrigin: '"50% 50% 0"',
    })
    ani.rotate(90).translateX(30).translateY(50).rotate(90).step()
    this.setData({
      animationData:ani.export()
    })
  }
})