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
      level: 2,
      completed: false,
      createdAt: new Date(),
      completedAt: new Date()
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
  }
}

export default Todo
