// pages/target/create.js
import Target from '../../models/Target'
import targetStore from '../../store/targetStore'
import util from '../../utils/util.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    edit: false,
    target: new Target(),
    weights: Array.from({length:10}).map((value,index) => index+1),
    beginDate:null,
    beginTime:null,
    endDate:null,
    endTime:null,
    weightIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    targetStore.read()
    // 是否编辑
    if (options.uuid) {
      this.data.edit = true
      let editTarget = targetStore.getTarget(options.uuid)
      this.data.target = new Target(editTarget)
      this.data.beginDate = util.getDate(this.data.target.beginTime)
      this.data.endDate = util.getDate(this.data.target.endTime)
      this.data.beginTime = util.getTime(this.data.target.beginTime)
      this.data.endTime = util.getTime(this.data.target.endTime)
      wx.setNavigationBarTitle({
        title: '修改任务',
      })
    } else {
      this.data.target = new Target()
    }
    this.update()
  },

  onShow: function() {
    
  },

  /**
   * 分享
   */
  onShareAppMessage: function (options) {

  },

  /**
   * 内容输入事件
   */
  handleTitleChange(e) {
    this.data.target.title = e.detail.value
    this.update()
  },

  /**
   * 内容输入事件
   */
  handleContentChange(e) {
    this.data.target.desc = e.detail.value
    this.update()
  },

  /**
   * 取消按钮点击事件
   */
  handleCancelTap(e) {
    wx.navigateBack()
  },

  /**
   * 保存按钮点击事件
   */
  handleSaveTap(e) {
    if (this.data.edit) {
      targetStore.editTarget(this.data.target.uuid, this.data.target)
    } else {
      targetStore.addTarget(this.data.target)
    }
    targetStore.save()
    wx.navigateBack()
    wx.showToast({ title: '保存成功' })
  },

  /**
   * 更新数据
   */
  update(data) {
    data = data || this.data
    this.setData(data)
  },

  handleBeginDateChange(e) {
    console.log(e.detail.value)
    let [year,month,day] = e.detail.value.split('-')
    this.data.target.beginTime.setFullYear(parseInt(year))
    this.data.target.beginTime.setMonth(parseInt(month) -1 )//因为月份是从0开始的
    this.data.target.beginTime.setDate(parseInt(day))
    this.setData({
      target: this.data.target,
      beginDate: e.detail.value
    })
    console.log(this.data.target.beginTime)
  },

  handleBeginTimeChange(e) {
    console.log(this.data.target.beginTime)
    console.log(typeof (this.data.target.beginTime))
    console.log(Date.parse(this.data.target.beginTime))
    console.log(new Date(this.data.target.beginTime))
    console.log(typeof (new Date(this.data.target.beginTime)))
    let [hour,minute] = e.detail.value.split(':')
    this.data.target.beginTime.setHours(parseInt(hour))
    this.data.target.beginTime.setMinutes(parseInt(minute))
    this.setData({
      target: this.data.target,
      beginTime: e.detail.value
    })
    console.log(this.data.target.beginTime)
  },

  handleEndDateChange(e) {
    console.log(e.detail.value)
    let [year, month, day] = e.detail.value.split('-')
    this.data.target.endTime.setFullYear(parseInt(year))
    this.data.target.endTime.setMonth(parseInt(month) - 1)//因为月份是从0开始的
    this.data.target.endTime.setDate(parseInt(day))
    this.setData({
      target: this.data.target,
      endDate: e.detail.value
    })
    console.log(this.data.target.endTime)
  },

  handleEndTimeChange(e) {
    let [hour, minute] = e.detail.value.split(':')
    this.data.target.endTime.setHours(parseInt(hour))
    this.data.target.endTime.setMinutes(parseInt(minute))
    this.setData({
      target: this.data.target,
      endTime: e.detail.value
    })
    console.log(this.data.target.endTime)
  },

  handleWeightChange(e) {
    this.data.target.weight = parseInt(e.detail.value)
    this.update()
  },

  handleCompletedTap(e) {
    wx.showModal({
      title: '淡定',
      content: '革命尚未成功，同志仍需努力！',
      showCancel: true,
      cancelText: '嗯嗯',
      cancelColor: '',
      confirmText: '前进',
      confirmColor: '',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})