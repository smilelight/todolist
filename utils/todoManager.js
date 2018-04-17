import Todo from '../models/Todo'
import todoStore from '../store/todoStore'
import targetStore from '../store/targetStore.js'
import planStore from '../store/planStore.js'

class TodoManager {

  static DEFAULT_TARGET_WEIGHT = 3;
  static DEFAULT_PLAN_WEIGHT = 2;
  //coefficient 系数的意思，因为权重已经使用了weight了。
  //下面CNT即coefficient的缩写
  static DEFAULT_TARGET_CNT = 10;
  static DEFAULT_PLAN_CNT = 5;
  static DEFAULT_TODO_CNT = 1;

  constructor(todos){
    this.todos = null
    if(todos){
      this.todos = todos
    } else {
      this.todos = todoStore.getTodos()
    }
  }

  filterTags = ["date","completed","timeblock","target","plan"]
  orderTags = ["time","date","dateAndtime","category","level","weight"]

  timeFilter(time,value) {
    time = time.substring(0,time.indexOf(':'))
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
    return (this.dateOrder(a, b) != 0) ? this.dateOrder(a, b): this.timeOrder(a, b)
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
        return this.todos.filter(todo => this.timeFilter(todo.time, value))
        break;
      case this.filterTags[3]://通过目标过滤
        return this.todos.filter(todo => todo.targetId == value)
        break;
      case this.filterTags[4]://通过计划过滤
        return this.todos.filter(todo => todo.planId == value)
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
      case this.orderTags[5]://通过权重排序
        planStore.getPlans().forEach((item)=>{console.log(item.weight)})
        this.todos.sort(this.orderByWeight)
        break;
    }
    if (value) {
      this.todos.reverse()
    }
    return this.todos
  }

//还未经过测试
  orderByWeight(a,b) {
    let targetWeightA = TodoManager.DEFAULT_TARGET_WEIGHT
    console.log("targetWeightA:",targetWeightA)
    let planWeightA = TodoManager.DEFAULT_PLAN_WEIGHT;
    console.log("planWeightA:",planWeightA)
    let targetWeightB = TodoManager.DEFAULT_TARGET_WEIGHT
    let planWeightB = TodoManager.DEFAULT_PLAN_WEIGHT
    let resultA
    let resultB;

    //以下代码当然也可以写成这种简短形式。
    //targetWeightA = a.targetId ? targetStore.getTarget(a.targetId).weight : TodoManager.DEFAULT_TARGET_WEIGHT;

    if(a.targetId){
      targetWeightA = targetStore.getTarget(a.targetId).weight;
    }

    if (a.planId) {
      planWeightA = planStore.getPlan(a.planId).weight;
      console.log("shit:",planWeightA)
    }
    console.log("defaultPlanWeight:",TodoManager.DEFAULT_PLAN_WEIGHT)
    console.log("planIdA == null",a.planId == null)
    console.log("planIdA",a.planId)
    console.log("planA:",planWeightA);

    if (b.targetId) {
      targetWeightB = targetStore.getTarget(b.targetId).weight;
    }

    if (b.planId) {
      planWeightB = planStore.getPlan(b.planId).weight;
    }
    resultA = TodoManager.DEFAULT_TARGET_CNT * targetWeightA + TodoManager.DEFAULT_PLAN_CNT * planWeightA + 
      TodoManager.DEFAULT_TODO_CNT * a.weight;
    resultB = TodoManager.DEFAULT_TARGET_CNT * targetWeightB + TodoManager.DEFAULT_PLAN_CNT * planWeightB +
      TodoManager.DEFAULT_TODO_CNT * b.weight;
    console.log("a:", resultA, "targetA:", targetWeightA, "planA:", planWeightA, "todoA:",a.weight,
      "b:", resultB, "targetB:", targetWeightB, "planB:", planWeightB,"todoB:",b.weight);
    return resultA - resultB;
  }

  filterByTargetId(uuid) {
    return this.todos.filter(todo => todo.targetId == uuid)
  }

  filterByPlanId(uuid) {
    return this.todos.filter(todo => todo.planId == uuid)
  }

  getStatisticsByDate() {
    let result = []
    let todos = this.todos
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
  
}

export default TodoManager