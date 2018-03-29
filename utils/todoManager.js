import Todo from '../models/Todo'
import todoStore from '../store/todoStore'

class TodoManager {
  constructor(todos){
    this.todos = null
    if(todos){
      this.todos = todos
    } else {
      this.todos = todoStore.getTodos()
    }
  }
  filterTags = ["date","completed","timeblock"]
  orderTags = ["time","date","dateAndtime","category","level"]

  timeFilter(time,value) {
    time = time.subString(0,time.indexOf(':'))
    return (value - 1) == parseInt(time)
  }

  timeOrder(a,b) {
    let miniteA,secondA = a.time.split(":")
    let miniteB,secondB = b.time.split(":")
    // return (parseInt(miniteA) <= parseInt(miniteB) && parseInt(secondA) <= parseInt(secondB)) ? -1:1
    return (parseInt(miniteA) - parseInt(miniteB) != 0) ? parseInt(miniteA) - parseInt(miniteB) : 
            parseInt(secondA) - parseInt(secondB)
  }

  dateOrder(a,b) {
    let yearA,monthA,dayA = a.date.split("/")
    let yearB,monthB,dayB = b.date.split("/")
    return (parseInt(yearA) - parseInt(yearB) != 0) ? parseInt(yearA) - parseInt(yearB) : 
            (parseInt(monthA) - parseInt(monthB) != 0) ? parseInt(monthA) - parseInt(monthB) : 
              parseInt(dayA) - parseInt(dayB)
  }

  dateAndtimeOrder(a,b) {
    return (this._dateOrder(a, b) != 0) ? this._dateOrder(a, b): this._timeOrder(a, b)
  }
  todoFilter(tag, value) {
    switch (tag) {
      case this.filterTags[0]://通过日期过滤
        return this.todos.filter(todo => todo.date == value)
        break;
      case this.filterTags[1]://通过是否完成过滤
        return this.todos.filter(todo => todo.completed == value)
        break;
      case this.filterTags[2]://通过时间段过滤，目前主要用于日视图的显示工作
        return this.todos.filter(todo => this._timeFilter(todo.time, value))
        break;
      default:
        return this.todos
    }
  }
  todoOrder(tag, value) {
    switch (tag) {
      case this.orderTags[0]://通过时间排序
        this.todos.sort(this._timeOrder)
        break;
      case this.orderTags[1]://通过日期排序
        this.todos.sort(this._dateOrder)
        break;
      case this.orderTags[2]://通过时间加日期排序
        this.todos.sort(this._dateAndtimeOrder)
        break;
      case this.orderTags[3]://通过类别排序
        this.todos.sort((a, b) => a.category - b.category)
        break;
      case this.orderTags[4]://通过优先级排序
        this.todos.sort((a, b) => a.level - b.level)
        break;
    }
    if (value) {
      this.todos.reverse()
    }
    return this.todos
  }
}

export default TodoManager