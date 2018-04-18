// pages/testLeanCloud/testLeanCloud.js
import utils from '../../utils/util.js'

const AV = require('../../utils/av-live-query-weapp-min');

const app = getApp()

import targetStore from '../../store/targetStore.js'
import planStore from '../../store/planStore.js'
import todoStore from '../../store/todoStore.js'
import noteStore from '../../store/noteStore.js'

import server from '../../utils/server.js'

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

  bindTap:function (){
    server.dataBackUp(this.backUpCallbackS, this.backUpCallbackF)
    server.dataRestore(this.restoreCallbackS, this.restoreCallbackF)
    
    // // 声明一个 Todo 类型
    // var Todo = AV.Object.extend('Todo');
    // // 新建一个 Todo 对象
    // var todo = new Todo();
    // todo.set('title', '工程师周会');
    // todo.set('content', '每周工程师会议，周一下午2点');
    // todo.save().then(function (todo) {
    //   // 成功保存之后，执行其他逻辑.
    //   console.log('New object created with objectId: ' + todo.id);
    // }, function (error) {
    //   // 异常处理
    //   console.error('Failed to create new object, with error message: ' + error.message);
    // });

    // console.log(app.globalData.userInfo)
    // var targets = targetStore.getTargets()
    // var plans = planStore.getPlans()
    // var todos = todoStore.getTodos()
    // var notes = noteStore.getNotes()
    // var Info = AV.Object.extend('Info')
    // var info = new Info()
    // info.set('userId', app.globalData.userInfo.avatarUrl)
    // info.set("info", { "targets": targets, "plans": plans, "todos": todos, "notes": notes })
    // info.save().then(function (info) {
    //   // 成功保存之后，执行其他逻辑.
    //   console.log('New object created with objectId: ' + info.id);
    // }, function (error) {
    //   // 异常处理
    //   console.error('Failed to create new object, with error message: ' + error.message);
    // });

    // var query = new AV.Query('Info');
    // query.equalTo('userId', app.globalData.userInfo.avatarUrl);
    // query.find().then(function (results) {
    //   console.log(results)
    //   // 如果这样写，第二个条件将覆盖第一个条件，查询只会返回 priority = 1 的结果
    //   if(results.length > 0){
    //     console.log(results[0].attributes.info)
    //   }
    // }, function (error) {
    // });
  },
  bindDataBackUp:function(){
    server.dataBackUp(this.backUpCallbackS, this.backUpCallbackF)
  },
  bindDataRestore:function(){
    server.dataRestore(this.restoreCallbackS, this.restoreCallbackF)
  },
  backUpCallbackS:function(that){
    wx.showToast({
      title: '数据备份成功！',
      icon: '',
      image: '',
      duration: 1000,
      mask: true,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  backUpCallbackF:function(that){
    wx.showToast({
      title: '数据备份失败！',
      icon: '',
      image: '',
      duration: 1000,
      mask: true,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  restoreCallbackS:function(that){
    wx.showToast({
      title: '数据还原成功！',
      icon: '',
      image: '',
      duration: 1000,
      mask: true,
      success: function(res) {},
      fail: function(res) {
        console.log(res)
      },
      complete: function(res) {},
    })

  },
  restoreCallbackF:function(that){
    wx.showToast({
      title: '数据还原失败或为空！',
      icon: '',
      image: '',
      duration: 1000,
      mask: true,
      success: function(res) {},
      fail: function(res) {
        console.log(res)
      },
      complete: function(res) {},
    })
  }

})