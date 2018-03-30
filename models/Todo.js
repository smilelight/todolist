import Model from './Model'
import util from '../utils/util'

/**
 * Todo 模型类
 */
class Todo extends Model {
  constructor (model) {
    super()
    Object.assign(this, {
      title: '',
      desc: '',
      date: new Date(),
      time: new Date(),
      level: 2,//1：紧急且重要，2：重要不紧急，3：紧急不重要，4：不紧急不重要
      completed: false,
      createdAt: new Date(),
      completedAt: new Date(),
      category: 1,//1：读书，2：锻炼，3：学习，4：社交，5：编程，6：其他
      beginTime: new Date(),//todo 的开始时间
      endTime: new Date(),//todo的截止时间
      targetId: null,
      planId: null,
      summury: "",//todo 的总结
      isContinuous: false,//默认todo为不持续的
      weight: 1,//重要程度，默认为1，与level设计的有点重复，不过无所谓了
    }, model)

    // 日期格式化
    if (this.date.constructor === Date) {
      this.date = util.formatTime(this.date)
    }
    if (this.createdAt.constructor === Date) {
      this.createdAt = util.formatTime(this.createdAt)
    }
    if (this.completedAt.constructor === Date) {
      this.completedAt = util.formatTime(this.completedAt)
    }
    if (this.time.constructor === Date) {
      this.time = util.formatMyTime(this.time)
    }
  }
}

Todo.levels = ['紧急且重要', '重要不紧急', '紧急不重要', '不紧急不重要']
Todo.categories = ['读书', '锻炼', '学习', '社交', '编程', '其他']

export default Todo
