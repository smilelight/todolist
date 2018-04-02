// pages/animationTest/animationTest.js

let offset = 0
let touchStartX
let touchStartY
let touchEndX
let touchEndY
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animation: {},
    items:[1,2,3,4,5,6,7,8,9,10],
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

  handleLButTap: function (e) {
    let animation = wx.createAnimation(
      {
        duration: 400,
        timingFunction: 'ease'
      })
    // animation.rotate(90 * i).step()
    // i++
    if (offset > 1 - this.data.items.length) offset--
    // animation.translateX( wx.getSystemInfoSync().screenWidth*offset).rotate(90*offset).step()
    animation.translateX( wx.getSystemInfoSync().screenWidth*offset).step()
    this.setData({
      animation: animation.export()
    })
  },

   handleRButTap: function (e) {
    let animation = wx.createAnimation(
      {
        duration: 400,
        timingFunction: 'ease',
      })
    // animation.rotate(90 * i).step()
    // i++
    if(offset < 0 ) offset++
    // animation.translateX(wx.getSystemInfoSync().screenWidth * offset).rotate(90 * offset).step()
    animation.translateX(wx.getSystemInfoSync().screenWidth * offset).step()
    this.setData({
      animation: animation.export()
    })
  },

   handleTouchStart: function (e) {
    //  console.log(wx.getSystemInfoSync())
    //  console.log(e)
    touchStartX = e.changedTouches[0].clientX
    touchStartY = e.changedTouches[0].clientY

   },

   handleTouchMove: function (e) {
    //  console.log(e);
   },

   handleTouchEnd: function (e) {
    //  console.log(e);
     touchEndX = e.changedTouches[0].clientX
     touchEndY = e.changedTouches[0].clientY

     if (touchEndX > touchStartX + 20) this.handleRButTap()
     else if (touchEndX < touchStartX - 20) this.handleLButTap()
   }
})