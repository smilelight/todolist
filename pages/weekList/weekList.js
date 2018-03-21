// pages/weekList/weekList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   weeks:Array.from({length:7*24*2}).map((value,index)=>index+1),
   week_titles:[{
      day: 1,
      week: "周日"
   },{
       day: 2,
       week: "周一"
   },{
       day: 3,
       week: "周二"
   },{
       day: 4,
       week: "周三"
   },{
       day: 5,
       week: "周四"
   },{
       day: 6,
       week: "周五"
   },{
       day: 7,
       week: "周六"
   }],
   hour_titles :Array.from({length:24}).map(function(value,index){
     var hour = (index +1) % 24;
     return ((hour < 10 )? "0":"")+hour+":00";
   })
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
  
  }
})