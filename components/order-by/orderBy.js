// components/order-by/orderBy.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    test: {
      type: Number,
      default: 1
    },
    orders: {
      type: Array,
      default: ["时间", "类别", "优先级"]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    orderBy:function (e) {
      // console.log(e)
      let index = e.target.dataset.index
      this.triggerEvent("OrderBy",{index:index})
    },
    loghaha: function (e) {
      console.log('haha')
    }
  }
})
