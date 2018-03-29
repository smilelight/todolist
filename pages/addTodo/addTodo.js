// pages/todos/addTodo.js
import Todo from '../../models/Todo'
import todoStore from '../../store/todoStore'

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
    addOrModify:false,//false表示无参数传入，为新增任务，true表示有参数传入，为修改任务
    // 级别
    levels: Todo.levels,
    categories: Todo.categories
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.addOrModify = !!options.todo;
    this.data.todo = this.data.addOrModify?JSON.parse(options.todo):new Todo();
    if(this.data.addOrModify){
      wx.setNavigationBarTitle({
        title: '修改任务',
      })
    }
    this.update()
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
    this.data.addOrModify ? todoStore.updateTodo(this.data.todo):todoStore.addTodo(this.data.todo);
    todoStore.save()
    wx.navigateBack()
  },

  /**
   * 更新数据
   */
  update(data) {
    data = data || this.data
    this.setData(data)
  }
})