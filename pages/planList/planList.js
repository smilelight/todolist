// pages/planList/planList.js
import planStore from '../../store/planStore.js'

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    plans: planStore.getPlans(),
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
    this.data.plans = planStore.getPlans()
    this.update()
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

  update(data) {
    data = data || this.data
    this.setData(data)
  },

  handleItemTap: function (e) {
    let uuid = e.currentTarget.dataset.uuid
    console.log(uuid)
    wx.navigateTo({
      url: '../addPlan/addPlan?uuid=' + uuid
    })
  },

  /**
 * 新建事件
 */
  handleAddPlan(e) {
    wx.navigateTo({
      url: '../addPlan/addPlan'
    })
  },
})