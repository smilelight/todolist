// components/sub-items/sub-items.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    customData: {
      type:Array,
      default:Array.from({length:10}).map((value,index)=>"fuck"+index)
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

  }
})
