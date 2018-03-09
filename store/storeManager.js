import todoStore from './todoStore'
import noteStore from './noteStore'

/**
 * store 管理类
 */
export default {
  /**
   * 读取
   */
  read() {
    todoStore.read()
    noteStore.read()
  },

  /**
   * 保存
   */
  save() {
    todoStore.save()
    noteStore.save()
  }
}
