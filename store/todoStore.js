import util from '../utils/util'
import Store from './Store'
import Todo from '../models/Todo'

/**
 * NoteStore 类
 */
class TodoStore extends Store {
  constructor() {
    super()
    this.todos = []
    this.key = '__todos__'
    this.__init()
  }

  /**
   * 初始化
   */
  __init() {
    // wx.setStorageSync('__todos_inited__', false)
    let isInited = wx.getStorageSync('__todos_inited__')
    if (isInited) return
    this.todos = this.todos.concat([new Todo({
      title: '欢迎使用TodoList',
      completed: false,
      level: 1,
      category: 1,
      createdAt: new Date(),
      time: new Date()
    }), new Todo({
      title: '点击左边勾选框完成一项任务',
      completed: false,
      level: 1,
      category: 1,
      createdAt: new Date(),
      time: new Date()
    }), new Todo({
      title: '点击标题可以编辑任务哦',
      completed: false,
      level: 2,
      category: 1,
      createdAt: new Date(),
      time: new Date()
    }), new Todo({
      title: '点击右边日期可修改日期',
      completed: false,
      level: 3,
      category: 1,
      createdAt: new Date(),
      time: new Date()
    }), new Todo({
      title: '点击下面的 + 新建一项任务吧',
      completed: false,
      level: 4,
      category: 1,
      createdAt: new Date(),
      time: new Date()
    }), new Todo({
      title: '长按可删除任务',
      completed: false,
      level: 4,
      category: 1,
      createdAt: new Date(),
      time: new Date()
    }), new Todo({
      title: '这是一条已完成的任务1',
      completed: true,
      level: 4,
      category: 1,
      date: new Date('2017/11/18'),
      createdAt: new Date(),
      completedAt: new Date('2017/11/18'),
      time: new Date()
    }), new Todo({
      title: '这是一条已完成的任务2',
      completed: true,
      level: 4,
      category: 1,
      date: new Date('2017/11/19'),
      createdAt: new Date(),
      completedAt: new Date('2017/11/19'),
      time: new Date()
    }), new Todo({
      title: '这是一条已完成的任务3',
      completed: true,
      level: 4,
      category: 1,
      date: new Date('2017/11/20'),
      createdAt: new Date(),
      completedAt: new Date('2017/11/20'),
      time: new Date()
    }), new Todo({
      title: '这是一条已完成的任务4',
      completed: true,
      level: 4,
      category: 1,
      date: new Date('2017/11/20'),
      createdAt: new Date(),
      completedAt: new Date('2017/11/20'),
      time: new Date()
    })])
    // this.todos.forEach((value)=>console.log(value.time))
    this.save()
    wx.setStorageSync('__todos_inited__', true)
  }

  /**
   * 获取 todos
   */
  getTodos() {
    return this.todos
  }

  /**
   * 获取 Todo
   */
  getTodo(uuid) {
    return this.todos.find((item) => item.uuid === uuid)
  }

  /**
   * 获取索引
   */
  getIndex(todo) {
    return this.todos.indexOf(todo)
  }

  /**
   * 获取未完成的 todos
   */
  getUncompletedTodos () {
    return this.todos.filter(item => !item.completed)
  }

  /**
   * 获取已完成的 todos
   */
  getCompletedTodos() {
    return this.todos.filter(item => item.completed)
  }

  /**
   * 获取今天完成的 todos
   */
  getTodayCompletedTodos () {
    let todos = this.getCompletedTodos()
    let date = util.formatTime(new Date())
    return todos.filter(item => item.completedAt === date)
  }

  /**
   * 设置
   */
  setTodos(todos) {
    this.todos = todos
  }

  /**
   * 清空
   */
  clearTodos() {
    this.todos = []
  }

  /**
   * 添加
   */
  addTodo(todo) {
    this.todos.push(todo)
  }

  /**
   * 根据uuid删除
   */
  removeTodo(uuid) {
    let todo = this.getTodo(uuid)
    let index = this.getIndex(todo)
    if (index < 0) return false
    return this.removeTodoByIndex(index)
  }

  /**
   * 根据索引删除
   */
  removeTodoByIndex(index) {
    this.todos.splice(index, 1)
    return true
  }

  /**
   * 获取日期统计数据
   */
  getStatisticsByDate () {
    let result = []
    let todos = this.getCompletedTodos()
    let temp = {}
    todos.forEach((item) => {
      temp[item.completedAt] = temp[item.completedAt] ? temp[item.completedAt] + 1 : 1
    })
    for (let key in temp) {
      result.push({
        completedAt: key,
        count: temp[key]
      })
    }
    result = result.sort((a, b) => (a.completedAt > b.completedAt))
    return result
  }

  /**
   * 读取
   */
  read() {
    let todos = wx.getStorageSync(this.key) || []
    this.todos = todos
  }

  /**
   * 保存
   */
  save() {
    wx.setStorageSync(this.key, this.todos)
  }

  updateTodo(todo) {
    Object.assign(this.todos.find((item) => item.uuid === todo.uuid),todo);
  }

}

export default new TodoStore()