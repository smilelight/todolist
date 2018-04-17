// pages/note/create.js
import Note from '../../models/Note'
import noteStore from '../../store/noteStore'
import util from '../../utils/util.js'
import targetStore from '../../store/targetStore.js'
import planStore from '../../store/planStore.js'
import PlanManager from '../../utils/planManager.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    edit: false,
    note: new Note(),
    targets: [],
    plans: [],
    targetIndex: 0,
    planIndex: 0,
    targetsTitles: [],
    plansTitles: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    noteStore.read()

    this.data.targets = targetStore.getTargets()
    this.data.plans = planStore.getPlans()
    this.data.targetsTitles = this.data.targets.map(value => value.title)
    this.data.plansTitles = this.data.plans.map(value => value.title)

    // 是否编辑
    if (options.uuid) {
      this.data.edit = true
      let editNote = noteStore.getNote(options.uuid)
      this.data.note = new Note(editNote)
      wx.setNavigationBarTitle({
        title: '修改笔记',
      })
    } else {
      this.data.note = new Note()
    }

    if (this.data.note.targetId == null) {
      if (this.data.targets.length == 0) {
        this.data.note.targetId = null
      } else {
        this.data.note.targetId = this.data.targets[0].uuid
      }
    }

    this.data.plans = (new PlanManager()).filterByTargetId(this.data.note.targetId)
    this.data.plansTitles = this.data.plans.map(value => value.title)
    if (this.data.note.planId == null) {
      if (this.data.plans.length == 0) {
        this.data.note.planId = null
      } else {
        this.data.note.planId = this.data.plans[0].uuid
      }
    }

    this.data.targetIndex = util.findIndexById(this.data.targets, this.data.note.targetId)
    this.data.planIndex = util.findIndexById(this.data.plans, this.data.note.planId)

    this.update()
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
    this.data.note.title = e.detail.value
    this.update()
  },

  /**
   * 内容输入事件
   */
  handleContentChange(e) {
    this.data.note.content = e.detail.value
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
    if (this.data.note.targetId && this.data.note.planId) {
      if (this.data.edit) {
        noteStore.editNote(this.data.note.uuid, this.data.note)
      } else {
        noteStore.addNote(this.data.note)
      }
      noteStore.save()
      wx.navigateBack()
      wx.showToast({ title: '保存成功' })
    } else {
      wx.showModal({
        title: '无法添加笔记',
        content: '笔记的目标和计划不能为空！提示：若目标和计划列表为空，请先添加！',
        showCancel: true,
        cancelText: 'ojbk',
        cancelColor: '',
        confirmText: '好的',
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

  handleTargetChange(e) {
    this.data.note.targetId = this.data.targets[parseInt(e.detail.value)].uuid
    this.data.targetIndex = parseInt(e.detail.value)
    this.data.plans = (new PlanManager()).filterByTargetId(this.data.note.targetId)
    this.data.plansTitles = this.data.plans.map(value => value.title)
    if (this.data.plans.length == 0){
      this.data.note.planId = null
    } else {
      this.data.note.planId = this.data.plans[0].uuid
    }
    this.data.planIndex = util.findIndexById(this.data.plans, this.data.note.planId)
    this.update()
  },

  handlePlanChange(e) {
    this.data.note.targetId = this.data.plans[parseInt(e.detail.value)].uuid
    this.data.planIndex = parseInt(e.detail.value)
    this.update()
  },
  handleDeleteTap(e) {
    if (this.data.edit) {
      let that = this;
      wx.showModal({
        title: '确认删除',
        content: '坚持就是胜利，确定要放弃吗？\n不妨再试试，为了理想！',
        showCancel: true,
        cancelText: '再试试！',
        cancelColor: '',
        confirmText: '不死不休',
        confirmColor: '',
        success: function (res) {
          if (res.confirm) {
            noteStore.removeNote(that.data.note.uuid)
            noteStore.save()
            wx.navigateBack({
              delta: 1,
            })
            wx.showToast({
              title: '同样祝君好运！',
              icon: '',
              image: '',
              duration: 1000,
              mask: true,
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
          } else if (res.cancel) {
            wx.showToast({
              title: '好样的老铁！',
              icon: '',
              image: '',
              duration: 1000,
              mask: true,
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
          }
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else {
      wx.navigateBack()
    }
  },
})