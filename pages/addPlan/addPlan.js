// pages/addPlan/addPlan.js
import Plan from '../../models/Plan'
import planStore from '../../store/planStore'
import targetStore from '../../store/targetStore.js'
import util from '../../utils/util.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    edit: false,
    plan: new Plan(),
    weights: Array.from({ length: 10 }).map((value, index) => index + 1),
    targets: [],
    targetsTitles: [],
    targetIndex: 0,
    radioitems: [{title : "是",value : true},{title : "否",value : false}],
    beginDate: null,
    beginTime: null,
    endDate: null,
    endTime: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    planStore.read()
    this.data.targets = targetStore.getTargets()
    this.data.targetsTitles = this.data.targets.map(value => value.title)
    this.update()
    // 是否编辑
    if (options.uuid) {
      this.data.edit = true
      let editPlan = planStore.getPlan(options.uuid)
      this.data.plan = new Plan(editPlan)
      this.data.beginDate = util.getDate(this.data.plan.beginTime)
      this.data.endDate = util.getDate(this.data.plan.endTime)
      this.data.beginTime = util.getTime(this.data.plan.beginTime)
      this.data.endTime = util.getTime(this.data.plan.endTime)
      wx.setNavigationBarTitle({
        title: '修改计划',
      })
    } else {
      this.data.plan = new Plan()
    }
    if (this.data.plan.targetId == null) {
      this.data.plan.targetId = this.data.targets[0].uuid
    }
    this.data.targetIndex = util.findIndexById(this.data.targets, this.data.plan.targetId)
    this.update()
    console.log(this.data.targets)
  },

  onShow: function () {

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
    this.data.plan.title = e.detail.value
    this.update()
  },

  /**
   * 内容输入事件
   */
  handleContentChange(e) {
    this.data.plan.desc = e.detail.value
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
    if (this.data.plan.targetId) {
      if (this.data.edit) {
        planStore.editPlan(this.data.plan.uuid, this.data.plan)
      } else {
        planStore.addPlan(this.data.plan)
      }
      planStore.save()
      wx.navigateBack()
      wx.showToast({ title: '保存成功' })
    } else {
      wx.showModal({
        title: '无法添加计划',
        content: '计划的目标不能为空！提示：若目标列表为空，请先添加！',
        showCancel: true,
        cancelText: '',
        cancelColor: '',
        confirmText: '',
        confirmColor: '',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
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
    let [year, month, day] = e.detail.value.split('-')
    this.data.plan.beginTime.setFullYear(parseInt(year))
    this.data.plan.beginTime.setMonth(parseInt(month) - 1)//因为月份是从0开始的
    this.data.plan.beginTime.setDate(parseInt(day))
    this.setData({
      plan: this.data.plan,
      beginDate: e.detail.value
    })
    console.log(this.data.plan.beginTime)
  },

  handleBeginTimeChange(e) {
    let [hour, minute] = e.detail.value.split(':')
    this.data.plan.beginTime.setHours(parseInt(hour))
    this.data.plan.beginTime.setMinutes(parseInt(minute))
    this.setData({
      plan: this.data.plan,
      beginTime: e.detail.value
    })
    console.log(this.data.plan.beginTime)
  },

  handleEndDateChange(e) {
    console.log(e.detail.value)
    let [year, month, day] = e.detail.value.split('-')
    this.data.plan.endTime.setFullYear(parseInt(year))
    this.data.plan.endTime.setMonth(parseInt(month) - 1)//因为月份是从0开始的
    this.data.plan.endTime.setDate(parseInt(day))
    this.setData({
      plan: this.data.plan,
      endDate: e.detail.value
    })
    console.log(this.data.plan.endTime)
  },

  handleEndTimeChange(e) {
    let [hour, minute] = e.detail.value.split(':')
    this.data.plan.endTime.setHours(parseInt(hour))
    this.data.plan.endTime.setMinutes(parseInt(minute))
    this.setData({
      plan: this.data.plan,
      endTime: e.detail.value
    })
    console.log(this.data.plan.endTime)
  },

  handleWeightChange(e) {
    this.data.plan.weight = parseInt(e.detail.value) + 1
    this.update()
  },
  
  handleTargetChange(e) {
    this.data.plan.targetId = this.data.targets[parseInt(e.detail.value)].uuid
    this.data.targetIndex = parseInt(e.detail.value)
    this.update()
  },

  handleRepeatChange(e) {
    console.log(e.detail.value)
    this.data.plan.isRepeat = e.detail.value == "true"
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
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})