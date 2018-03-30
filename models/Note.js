import Model from './Model'
import util from '../utils/util'

/**
 * Note 模型类
 */
class Note extends Model {
  constructor(model) {
    super()
    Object.assign(this, {
      title: '',
      content: '',
      createdAt: util.formatTime(new Date()),
      planId: null,
      targetId: null,
    }, model)

    // 日期格式化
    if (this.createdAt.constructor === Date) {
      this.createdAt = util.formatTime(this.createdAt)
    }
  }
}

export default Note
