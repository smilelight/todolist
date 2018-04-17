// components/order-by/orderBy.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    orders: {
      type: Array,
      default: ["时间", "类别", "优先级","默认"]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    orderIndex: 0,
    orderDirection: true//true:up,false:down
  },

  /**
   * 组件的方法列表
   */
  methods: {
    orderBy:function (e) {
      // console.log(e)
      let index = e.target.dataset.index
      console.log(e.target.dataset)
      let orderInfo = {}
      orderInfo.orderIndex = index
      orderInfo.orderDirection = !this.data.orderDirection//这样设计后，每点击一次，排序方式总会发生改变，然而好像也无关紧要；在这里做点手脚完全可以做到如果点击的是不同的index后direction的设定方式，即实现默认的排序方向，不过这里无所谓啦
      this.setData(orderInfo)
      console.log(this.data.orderIndex)
      console.log(this.data.orderDirection)
      this.triggerEvent("OrderBy",{index:this.data.orderIndex,direction:this.data.orderDirection})
    }
  }
})
