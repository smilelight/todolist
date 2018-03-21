// pages/flex/index.js
var generateArray =  function (n) {
  // var array = new Array(n);
  // array.forEach((value, index, array) => (array[index] = index + 1,console.log(array[index])));
  // return array;
  //return (new Array(n)).map((value,index,array)=>index+1);
  // var array = new Array(n);
  // for(var i = 0;i<array.length;i++){
  //   array[i] = i+1;
  // }
  // console.log(array);
  // return array;
  return Array.from({length:n}).map((value,index)=>index+1);
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: generateArray(35)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.array)
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

  handleAddTodo(e) {
    wx.navigateTo({
      url: '../addTodo/addTodo'
    })
  },

})