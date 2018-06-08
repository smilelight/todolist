// pages/textAnalysis/textAnalysis.js
import WenZhi from '../../utils/qc-wenzhi.js'
import wxCharts from '../../utils/wxcharts'

WenZhi.textClassify({
  'content': '人生苦短，please Python。太祖、刘邦、朱元璋哪个更厉害？！'
}, function (data) {
  console.log(data)
}, function (error) {
  console.log(error)
})

import todoStore from '../../store/todoStore'
import noteStore from '../../store/noteStore'
import targetStore from '../../store/targetStore'
import planStore from '../../store/planStore'

let todos = todoStore.getTodos()
let notes = noteStore.getNotes()
let targets = targetStore.getTargets()
let plans = planStore.getPlans()

let textcontents = ''
let keycontents = ''
let sencontents = ''

let keywords = []

let classes = []

let positive = 0.5;
let negative = 0.5;


const app = getApp()

var textChart = null//chartA
var keyChart = null//chartB
var startPos = null
var senChart = null//chartC

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { value: "目标", name: "target" },
      { value: "计划", name: "plan" },
      { value: "任务", name: "todo" },
      { value: "笔记", name: "note" }
    ],
    windowWidth: 320,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取系统消息
    try {
      var res = wx.getSystemInfoSync();
      this.data.windowWidth = res.windowWidth;
      console.log("windowWidth:", res.windowWidth, "windowHeight:", res.windowHeight);
    } catch (e) {
      console.error('err: getSystemInfoSync failed!');
    }

    // this.update()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.renderChartsA()
    // this.renderChartsB()
    // this.renderChartsC()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.syncData()
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

  syncData() {
    // todos = todoStore.getTodos()
    // notes = noteStore.getNotes()
    // targets = targetStore.getTargets()
    // plans = planStore.getPlans()
    this.update()
  },

  update(data) {
    data = data || this.data
    this.setData(data)
    // this.updateChartsA()
    // this.updateChartsB()
    // this.updateChartsC()
  },

  renderChartsKey(){
    var chartsData = this.getChartsKeyData()
    console.log(chartsData)
    if (chartsData.length > 0) {
      keyChart = new wxCharts({
        animation: true,
        canvasId: 'keyChart',
        type: 'pie',
        series: chartsData,
        width: this.data.windowWidth,
        height: 250,
        dataLabel: true,
      });
    } else {
      //do nothing!
    }
  },
  renderChartsSen(){
    var chartsData = this.getChartsSenData()
    console.log(chartsData)
    senChart = new wxCharts({
      animation: true,
      canvasId: 'senChart',
      type: 'ring',
      extra: {
        ringWidth: 25,
        pie: {
          offsetAngle: -45
        }
      },
      title: {
        name: chartsData.title,
        color: '#7cb5ec',
        fontSize: 25
      },
      subtitle: {
        name: chartsData.subtitle,
        color: '#666666',
        fontSize: 15
      },
      series: chartsData.series,
      disablePieStroke: false,
      width: this.data.windowWidth,
      height: 250,
      dataLabel: true,
      legend: true,
      background: '#f5f5f5',
      padding: 0
    });
  },
  updateChartsText() {
    
  },
  renderChartsText() {
    var chartsData = this.getChartsTextData()
    console.log(chartsData)
    if (chartsData.data.length > 0) {
      textChart = new wxCharts({
        canvasId: 'textChart',
        type: 'radar',
        categories: chartsData.categories,
        animation: true,
        series: [{
          name: '文本类别',
          data: chartsData.data,
        }],
        width: this.data.windowWidth,
        height: 250,
        dataLabel: true,
        dataPointShape: true,
        extra: {
          radar: {
            max: 1
          }
        }
      });
    } else {
      //do nothing!
    }
  },
  getChartsTextData() {
    var categories = []
    var data = []
    var cls = classes
    if(cls.length > 0){
      cls.forEach((clas) => {
        categories.push(clas.class)
        data.push(clas.conf)
      })
    }
    return {
      categories: categories,
      data: data
    }
  },
  getChartsKeyData(){
    var keys = keywords
    console.log(keys)
    var results = []
    if(keys.length > 0){
      keys.forEach((key) => {
        if (key != null){
          results.push({ name: key.keyword, data: key.score })
        }
        else {
          results.push({ name: 'unknown', data: 0.5 })
        }
      })
    }
    else {
      results.push({name:'unknown',data:0.5})
    }
    return results
  },
  getChartsSenData(){
    return {
      title:''+Math.floor(positive*100)+"%",
      subtitle:'积极率',
      series:[{
        name:'积极',
        data:positive*100,
        stroke:true
      },{
        name:'消极',
        data:negative*100,
        stroke:true
      }]
    }
  },
  textclassify(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    textcontents = ''
    switch (e.detail.value) {
      case 'target':
        targets.forEach(item => {
          if (item.desc != '') {
            textcontents += item.title + ":"+ item.desc + ';\n'
          }
        })
        break;
      case 'plan':
        plans.forEach(item => {
          if (item.desc != '') {
            textcontents += item.title + ":" + item.desc + ';\n'
          }
        })
        break;
      case 'todo':
        todos.forEach(item => {
          if (item.desc != '') {
            textcontents += item.title + ":" + item.desc + ';\n'
          }
        })
        break;
      case 'note':
        notes.forEach(item => {
          if (item.content != '') {
            textcontents += item.title + ":" + item.content + ';\n'
          }
        })
        break;
      default:
    }
    console.log(textcontents)
    var that = this;
    WenZhi.textClassify({
      'content': textcontents
    }, function (data) {
      console.log(data)
      classes = data.classes
      that.renderChartsText()
    }, function (error) {
      console.log(error)
    }
    )
  },
  keywordsextract(e) {
    keycontents = ''
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    switch (e.detail.value) {
      case 'target':
        targets.forEach(item => {
          if (item.desc != '') {
            keycontents += item.title + item.desc+'\n'
          }
        })
        break;
      case 'plan':
        plans.forEach(item => {
          if (item.desc != '') {
            keycontents += item.title + item.desc + '\n'
          }
        })
        break;
      case 'todo':
        todos.forEach(item => {
          if (item.desc != '') {
            keycontents += item.title + item.desc + '\n'
          }
        })
        break;
      case 'note':
        notes.forEach(item => {
          if (item.content != '') {
            keycontents += item.title + item.content + '\n'
          }
        })
        break;
      default:
    }
    console.log(keycontents)
    var that = this
    WenZhi.textKeywords({
      'title': keycontents,
      'content': keycontents
    }, function (data) {
      console.log(data)
      keywords = data.keywords
      that.renderChartsKey()
    }, function (error) {
      console.log(error)
    }
    )
  },
  sentenceanalyse(e) {
    sencontents = ''
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    switch (e.detail.value) {
      case 'target':
        targets.forEach(item => {
          if (item.desc != '') {
            sencontents += item.title + ":" + item.desc + ';\n'
          }
        })
        break;
      case 'plan':
        plans.forEach(item => {
          if (item.desc != '') {
            sencontents += item.title + ":" + item.desc + ';\n'
          }
        })
        break;
      case 'todo':
        todos.forEach(item => {
          if (item.desc != '') {
            sencontents += item.title + ":" + item.desc + ';\n'
          }
        })
        break;
      case 'note':
        notes.forEach(item => {
          if (item.content != '') {
            sencontents += item.title + ":" + item.content + ';\n'
          }
        })
        break;
      default:
    }
    console.log(sencontents)
    var that = this
    WenZhi.textSentiment({
      'content': sencontents
    }, function (data) {
      console.log(data)
      positive = data.positive
      negative = data.negative
      that.renderChartsSen()
    }, function (error) {
      console.log(error)
    }
    )
  }
})