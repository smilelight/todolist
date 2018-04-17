// pages/target/create.js
import Target from '../../models/Target'
import targetStore from '../../store/targetStore'
import util from '../../utils/util.js'
import PlanManager from '../../utils/planManager.js'
import wxCharts from '../../utils/wxcharts'

var ringChart = null
var lineChart = null

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
    plans:[],
    planTitles:[],
    //用于图表计数
    plansCount: 0,
    plansUncompletedCount: 0,
    plansCompletedCount: 0,
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
      let planManager = new PlanManager()
      this.data.plans = planManager.filterByTargetId(this.options.uuid)
      this.data.planTitles = this.data.plans.map(value => value.title)

      this.data.plansCount = this.data.plans.length
      if (this.data.plansCount == 0) {
        this.data.plansCount = 1
      }
      this.data.plansUncompletedCount = this.data.plans.filter(value => value.completed == false).length
      this.data.plansCompletedCount = this.data.plans.filter(value => value.completed == true).length

      wx.setNavigationBarTitle({
        title: '修改任务',
      })

    } else {
      this.data.target = new Target()
      if (this.data.plansCount == 0) {
        this.data.plansCount = 1
      }
    }
    this.update()
  },

  onShow: function() {
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
    this.updateRingChart()
    this.updateLineChart()
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
    this.data.target.weight = this.data.weights[parseInt(e.detail.value)]
    this.update()
  },

  handleCompletedTap(e) {
    if (this.data.plansCount > 0 && this.data.plansCount == this.data.plansCompletedCount){
      this.data.target.completed = true
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
        content: '目标还未达成就要放弃吗？\n不妨再试试，为了理想！',
        showCancel: true,
        cancelText: '再试试！',
        cancelColor: '',
        confirmText: '不死不休',
        confirmColor: '',
        success: function (res) {
          if (res.confirm) {
            if(that.data.plans.length > 0){
              wx.showToast({
                title: '请先将对应的计划删除再删除此目标！',
                icon: 'none',
                image: '',
                duration: 1000,
                mask: true,
                success: function(res) {},
                fail: function(res) {},
                complete: function(res) {},
              })
            } else {
              targetStore.removeTarget(that.data.target.uuid)
              targetStore.save()

              wx.navigateBack({
                delta: 1,
              })
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
        name: [Math.round((this.data.plansCompletedCount / this.data.plansCount) * 100), '%'].join(''),
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
        data: this.data.plansUncompletedCount,
        stroke: false
      }, {
        name: '已完成',
        data: this.data.plansCompletedCount,
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
        name: [Math.round((this.data.plansCompletedCount / this.data.plansCount) * 100), '%'].join('')
      },
      series: [{
        name: '进行中',
        data: this.data.plansUncompletedCount,
        stroke: false
      }, {
        name: '已完成',
        data: this.data.plansCompletedCount,
        stroke: false
      }]
    })
  },

  updateLineChart() {

  },

  getLineChartData() {
    var categories = [];
    var data = [];

    let statistics = (new PlanManager(this.data.plans.filter(value => value.completed == true))).getStatisticsByDate()
    
    //如果不加入以下的填充代码，那么程序就会因为canvas绘制失败而死掉，进而将这个开发者工具也干掉了！
    if (statistics.length == 0) {
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