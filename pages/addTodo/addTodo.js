// pages/todos/addTodo.js
import Todo from '../../models/Todo'
import todoStore from '../../store/todoStore'
import util from '../../utils/util.js'
import targetStore from '../../store/targetStore.js'
import planStore from '../../store/planStore.js'
import PlanManager from '../../utils/planManager.js'
import TargetManager from '../../utils/targetManager.js'

/**
 * 该页面添加或者修改任务，具体视是否传入页面参数而定
 */

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // todo
    todo: null,
    edit: false,
    // 级别
    levels: Todo.levels,
    categories: Todo.categories,
    weights: Array.from({ length: 10 }).map((value, index) => index + 1),
    beginDate: null,
    beginTime: null,
    endDate: null,
    endTime: null,
    weightIndex: 0,
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
    todoStore.read()

    this.data.targets = (new TargetManager(targetStore.getTargets())).getUncompleteds()
    this.data.plans = (new PlanManager(planStore.getPlans())).getUncompleteds()
    this.data.targetsTitles = this.data.targets.map(value => value.title)
    this.data.plansTitles = this.data.plans.map(value => value.title)

    if (options.uuid){
      this.data.edit = true
      let edittodo =  todoStore.getTodo(options.uuid)
      console.log(edittodo)
      console.log(edittodo.category)
      this.data.todo = new Todo(edittodo)
      console.log(this.data.todo.category)
      console.log(this.data.todo)
      this.data.beginDate = util.getDate(this.data.todo.beginTime)
      this.data.endDate = util.getDate(this.data.todo.endTime)
      this.data.beginTime = util.getTime(this.data.todo.beginTime)
      this.data.endTime = util.getTime(this.data.todo.endTime)
      wx.setNavigationBarTitle({
        title: '修改todo',
      })
    } else {
      this.data.todo = new Todo()
    }
    if (this.data.todo.targetId == null) {
      if (this.data.targets.length == 0) {
        this.data.todo.targetId = null
      } else {
        this.data.todo.targetId = this.data.targets[0].uuid
      }
      
    }

    this.data.plans = (new PlanManager()).filterByTargetId(this.data.todo.targetId)
    this.data.plans = (new PlanManager(this.data.plans)).getUncompleteds()
    this.data.plansTitles = this.data.plans.map(value => value.title)
    if (this.data.todo.planId == null) {
      if (this.data.plans.length == 0) {
        this.data.todo.planId = null
      } else {
        this.data.todo.planId = this.data.plans[0].uuid
      }
    }

    this.data.targetIndex = util.findIndexById(this.data.targets, this.data.todo.targetId)
    this.data.planIndex = util.findIndexById(this.data.plans, this.data.todo.planId)

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
   * Todo 改变事件
   */
  handleTodoItemChange(e) {
    let todo = e.detail.data.todo
    Object.assign(this.data.todo, todo)
    this.update()
  },

  /**
   * 级别改变事件
   */
  handleLevelChange(e) {
    this.data.todo.level = parseInt(e.detail.value) + 1
    this.update()
  },

  /**
   * 类别改变事件
   */
  handleCategoryChange(e) {
    this.data.todo.category = parseInt(e.detail.value) + 1
    this.update()
  },

  /**
   * 描述输入事件
   */
  handleDescChange(e) {
    this.data.todo.desc = e.detail.value
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
    if (this.data.todo.targetId && this.data.todo.planId) {
      if (this.data.edit) {
        todoStore.editTodo(this.data.todo.uuid, this.data.todo)
      } else {
        todoStore.addTodo(this.data.todo)
      }
      todoStore.save()
      wx.navigateBack()
      wx.showToast({ title: '保存成功' })
    } else {
      wx.showModal({
        title: '无法添加todo',
        content: 'todo的目标和计划不能为空！提示：若目标和计划列表为空，请先添加！',
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

  handleBeginDateChange(e) {
    util.setDate(e.detail.value,this.data.todo.beginTime)
    this.setData({
      todo: this.data.todo,
      beginDate: e.detail.value
    })
  },

  handleBeginTimeChange(e) {
    util.setTime(e.detail.value,this.data.todo.beginTime)
    this.setData({
      todo: this.data.todo,
      beginTime: e.detail.value
    })
  },

  handleEndDateChange(e) {
    util.setDate(e.detail.value, this.data.todo.endTime)
    this.setData({
      todo: this.data.todo,
      endDate: e.detail.value
    })

  },

  handleEndTimeChange(e) {
    util.setTime(e.detail.value, this.data.todo.endTime)
    this.setData({
      todo: this.data.todo,
      endTime: e.detail.value
    })
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
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  handleWeightChange(e) {
    this.data.todo.weight = parseInt(e.detail.value) + 1
    this.update()
  },

  handleTargetChange(e) {
    this.data.todo.targetId = this.data.targets[parseInt(e.detail.value)].uuid
    this.data.targetIndex = parseInt(e.detail.value)
    this.data.plans = (new PlanManager()).filterByTargetId(this.data.todo.targetId)
    this.data.plansTitles = this.data.plans.map(value => value.title)
    if (this.data.plans.length == 0) {
      this.data.todo.planId = null
    } else {
      this.data.todo.planId = this.data.plans[0].uuid
    }
    this.data.planIndex = util.findIndexById(this.data.plans, this.data.todo.planId)
    this.update()
  },

  handlePlanChange(e) {
    this.data.todo.planId = this.data.plans[parseInt(e.detail.value)].uuid
    this.data.planIndex = parseInt(e.detail.value)
    this.update()
  },
  handleDeleteTap(e) {
    if(this.data.edit){
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
            todoStore.removeTodo(that.data.todo.uuid)
            todoStore.save()
            wx.navigateBack({
              delta: 1,
            })
            wx.showToast({
              title: '同样祝君好运！',
              icon: '',
              image: '',
              duration: 1000,
              mask: true,
              success: function(res) {},
              fail: function(res) {},
              complete: function(res) {},
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