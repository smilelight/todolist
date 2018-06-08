const AV = require('./utils/av-live-query-weapp-min');

AV.init({
  appId: '5ySG2ladeBsE7leajrAHcwRC-gzGzoHsz',
  appKey: 'T3U8iPCKN5vIXEf9ry8M8YgT',
});


import storeManager from './store/storeManager'
import todoStore from './store/todoStore'


/**
 * 这里自己作为数据的测试工作
 */
// import todoStore from '../../store/todoStore'
import noteStore from './store/noteStore'
import targetStore from './store/targetStore'
import planStore from './store/planStore'


import TodoManager from './utils/todoManager.js'
import NoteManager from './utils/noteManager.js'
import TargetManager from '/utils/targetManager.js'
import PlanManager from '/utils/planManager.js'


storeManager.read()
let todos = todoStore.getTodos()
let notes = noteStore.getNotes()
let targets = targetStore.getTargets()
let plans = planStore.getPlans()


let todomanager = new TodoManager(todos)
let notemanager = new NoteManager(notes)
let targetmanager = new TargetManager(targets)
let planmanager = new PlanManager(plans)

console.log(todos)
console.log(notes)
console.log(targets)
console.log(plans)

// console.log(typeof(TodoManager.filterTags[0]))

console.log(todomanager.todoFilter("date","2018/03/30"))//根据日期过滤
console.log(todomanager.todoFilter("completed",true))//根据是否完成过滤
console.log(todomanager.todoFilter("timeblock",20))//根据时间段过滤
console.log(todomanager.todoFilter("target",null))//根据目标过滤
console.log(todomanager.todoFilter("plan",null))//根据计划过滤

import test from 'utils/testMyModule.js'

















//app.js
App({
  onLaunch: function () {

    // 读取数据
    storeManager.read()

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              // console.log(res)
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },
  
  /**
   * 小程序隐藏事件
   */
  onHide() {
    storeManager.save()
  },

  /**
   * 小程序错误事件
   */
  onError() {
    storeManager.save()
  }
})

