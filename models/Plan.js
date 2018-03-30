import Model from './Model'
import util from '../utils/util'

/**
 * Plan 模型类
 */
class Plan extends Model{
  constructor(plan) {
    super()
    Object.assign(this, {
      title: '',
      desc: '',
      // createdAt: util.formatTime(new Date())
      createdAt: new Date(),
      completed: false,
      targetId: null,
      weight: 1,
      completedAt: new Date(),
      beginTime: new Date(),
      endTime: new Date(),
      isRepeat: false,//默认计划是不重复的
    }, plan)

    // // 日期格式化
    // if (this.createdAt.constructor === Date) {
    //   this.createdAt = util.formatTime(this.createdAt)
    // }
  }
}

export default Plan
