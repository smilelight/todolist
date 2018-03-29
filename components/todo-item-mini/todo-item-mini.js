import Todo from '../../models/Todo'
import util from '../../utils/util'

// components/todo-item/todo-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    todo: {
      type: Todo,
      default: new Todo()
    },

    autoFocus: {
      type: Boolean,
      default: false
    },
    disAbled: {
      type: Boolean,
      default: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    categories: Todo.categories,
    categories_images:["read","exercise","study","social","programming","other"]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleCompletedChange(e) {
      let index = e.detail.dataset.index
      let checked = e.detail.data.checked
      this.data.todo.completed = checked
      this.data.todo.completedAt = util.formatTime(new Date())
      this.update()
    },

    handleTitleChange (e) {
      this.data.todo.title = e.detail.value
      this.update()
    },

    handleDateClick (e) {
      console.info(e)
    },
    
    handleTimeClick (e) {
      console.info(e)
    },

    handleDateChange (e) {
      this.data.todo.date = e.detail.value.replace(/\-/g, '/')
      this.update()
    },

    handleTimeChange(e) {
      this.data.todo.time = e.detail.value
      this.update()
    },

    update(data) {
      data = data || this.data
      this.setData(data)
      this.triggerEvent('change', this)
    },

    handleTap(e){
      wx.navigateTo({
        url: 'pages/addTodo/addTodo',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  }
})
