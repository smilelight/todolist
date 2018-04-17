// pages/addPlan/addPlan.js
import Plan from '../../models/Plan'
import planStore from '../../store/planStore'
import targetStore from '../../store/targetStore.js'
import util from '../../utils/util.js'
import TodoManager from '../../utils/todoManager.js'
import wxCharts from '../../utils/wxcharts'
import TargetManager from '../../utils/targetManager.js'

var ringChart = null
var lineChart = null

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
    //用于下属todo展示
    todos: [],
    todoTitles: [],
    //用于图表计数
    todosCount: 0,
    todosUncompletedCount: 0,
    todosCompletedCount: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    planStore.read()
    this.data.targets = (new TargetManager(targetStore.getTargets())).getUncompleteds()
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

      this.data.todos = (new TodoManager()).filterByPlanId(options.uuid)
      this.data.todoTitles = this.data.todos.map(value => value.title)

      this.data.todosCount = this.data.todos.length
      if(this.data.todosCount == 0){
        this.data.todosCount = 1
      }
      this.data.todosUncompletedCount = this.data.todos.filter(value => value.completed == false).length
      this.data.todosCompletedCount = this.data.todos.filter(value => value.completed == true).length

      wx.setNavigationBarTitle({
        title: '修改计划',
      })
    } else {
      this.data.plan = new Plan()
      if (this.data.todosCount == 0) {
        this.data.todosCount = 1
      }
    }
    if (this.data.plan.targetId == null) {
      this.data.plan.targetId = this.data.targets[0].uuid
    }
    this.data.targetIndex = util.findIndexById(this.data.targets, this.data.plan.targetId)
    this.update()
    console.log(this.data.targets)
  },

  onShow: function () {
    this.randerRingChart()
    this.randerLineChart()
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
    this.updateRingChart()
    this.updateLineChart()
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
    if (this.data.todosCount > 0 && this.data.todosCount == this.data.todosCompletedCount){
      this.data.plan.completed = true
      this.update()
   } else {
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
  },

  handleDeleteTap(e) {
    if (this.data.edit) {
      let that = this;
      wx.showModal({
        title: '确认删除',
        content: '计划还没完成就要放弃吗？\n不妨再试试，为了理想！',
        showCancel: true,
        cancelText: '再试试！',
        cancelColor: '',
        confirmText: '不死不休',
        confirmColor: '',
        success: function (res) {
          if (res.confirm) {
            if (that.data.todos.length > 0) {
              wx.showToast({
                title: '请先将对应的todo删除再删除此计划！',
                icon: 'none',
                image: '',
                duration: 1000,
                mask: true,
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { },
              })
            } else {
              planStore.removePlan(that.data.plan.uuid)
              planStore.save()

              wx.navigateBack()
              wx.showToast({
                title: '同样祝君好运！',
                icon: 'none',
                image: '',
                duration: 1000,
                mask: true,
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { },
              })
            }
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

  randerRingChart() {
    ringChart = new wxCharts({
      animation: true,
      canvasId: 'ringChart',
      type: 'ring',
      extra: {
        ringWidth: 25,
      },
      title: {
        name: [Math.round((this.data.todosCompletedCount / this.data.todosCount) * 100), '%'].join(''),
        color: '#7cb5ec',
        fontSize: 25
      },
      subtitle: {
        name: '完成率',
        color: '#666666',
        fontSize: 15
      },
      series: [{
        name: '进行中',
        data: this.data.todosUncompletedCount,
        stroke: false
      }, {
        name: '已完成',
        data: this.data.todosCompletedCount,
        stroke: false
      }],
      disablePieStroke: true,
      width: 200,
      height: 200,
      dataLabel: false,
      legend: true,
      background: '#f5f5f5',
      padding: 0
    })
  },
  randerLineChart() {
    var chartsData = this.getLineChartData()
    lineChart = new wxCharts({
      canvasId: 'lineChart',
      type: 'line',
      categories: chartsData.categories,
      animation: true,
      series: [{
        name: '任务完成量',
        data: chartsData.data,
        format: function (val, name) {
          return [val, '个'].join('')
        }
      }],
      xAxis: {
        disableGrid: false
      },
      yAxis: {
        title: '完成数量 (个)',
        format: function (val) {
          return val;
        },
        min: 0
      },
      width: 200,
      height: 200,
      dataLabel: true,
      dataPointShape: true,
      enableScroll: true,
      extra: {
        lineStyle: 'curve'
      }
    });
  },
  
  updateRingChart() {
    ringChart && ringChart.updateData({
      title: {
        name: [Math.round((this.data.todosCompletedCount / this.data.todosCount) * 100), '%'].join('')
      },
      series: [{
        name: '进行中',
        data: this.data.todosUncompletedCount,
        stroke: false
      }, {
        name: '已完成',
        data: this.data.todosCompletedCount,
        stroke: false
      }]
    })
  },

  updateLineChart() {

  },

  getLineChartData() {
    var categories = [];
    var data = [];

    let statistics = (new TodoManager(this.data.todos.filter(value => value.completed == true))).getStatisticsByDate()
    //如果不加入以下的填充代码，那么程序就会因为canvas绘制失败而死掉，进而将这个开发者工具也干掉了！
    if(statistics.length == 0){
      categories.push(util.formatTime(new Date()))
      data.push(0)
    }

    statistics.forEach((item) => {
      categories.push(util.formatTime(new Date(item.completedAt)))
      data.push(item.count)
    })
    return {
      categories: categories,
      data: data
    }
  }

})