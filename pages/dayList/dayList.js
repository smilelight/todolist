// pages/dayList/dayList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hour_titles: Array.from({ length: 24 }).map(function (value, index) {
      var hour = (index + 1) % 24;
      return ((hour < 10) ? "0" : "") + hour + ":00";
    }),
    day_hour_items: Array.from({length:24}).map((value,index)=>index+1),
    // todo_item_sizes: Array.from({length:24}).map(()=>{width:1,height:1}), 
    // bar_item_sizes: Array.from({length:24}).map(()=>{width:1,height:1})
    todo_item_sizes: Array.from({ length: 24 }).map(function(){
      return {
        width:1,
        height :1
      }
    }),
    bar_item_sizes: Array.from({ length: 24 }).map(function () {
      return {
        width: 1,
        height: 1
      }
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
    console.log(this.data.todo_item_sizes)
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

  handleTap: function (e) {
    let orderby = this.selectComponent("#orderby")
    let bar1 = this.selectComponent("#hour-bar-0")
    let todo1 = this.selectComponent("#hour-todo-0")
    this.fuck = this.selectComponent("#fuck")
    // let orr = wx.createSelectorQuery().select("#hour-bar-0").exec()
    // console.log(orr)
    // wx.createSelectorQuery().select("#hour-bar-0").exec()
    console.log(bar1)
    console.log(todo1)
    console.log(orderby)
    console.log(e)
  }
})