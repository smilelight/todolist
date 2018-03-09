// components/todo-chart-ring/todo-chart-ring.js
import wxCharts from '../../utils/wxcharts'
var ringChart = null

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    allCount: {
      type: Number,
      default: 10
    },
    completedCount: {
      type: Number,
      default: 3
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    canvasId: Math.random().toString(32).replace('0.', ''),
    windowWidth: 320
  },

  ready() {
    // 获取系统消息
    try {
      var res = wx.getSystemInfoSync();
      this.data.windowWidth = res.windowWidth;
    } catch (e) {
      console.error('err: getSystemInfoSync failed!');
    }

    setTimeout(() => {
      this.render()
    }, 500)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    render () {
      console.info(this.data)
      ringChart = new wxCharts({
        animation: true,
        canvasId: 'ringCanvas',
        type: 'ring',
        extra: {
          ringWidth: 25,
          pie: {
            offsetAngle: -45
          }
        },
        title: {
          name: '70%',
          color: '#7cb5ec',
          fontSize: 25
        },
        subtitle: {
          name: '收益率',
          color: '#666666',
          fontSize: 15
        },
        series: [{
          name: '成交量1',
          data: 15,
          stroke: false
        }, {
          name: '成交量2',
          data: 35,
          stroke: false
        }, {
          name: '成交量3',
          data: 78,
          stroke: false
        }, {
          name: '成交量4',
          data: 63,
          stroke: false
        }],
        disablePieStroke: true,
        width: this.data.windowWidth,
        height: 200,
        dataLabel: false,
        legend: false,
        background: '#f5f5f5',
        padding: 0
      })
    }
  }
})
