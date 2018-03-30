import todoStore from './todoStore'
import noteStore from './noteStore'
import targetStore from './targetStore'
import planStore from './planStore'

/**
 * store 管理类
 */
export default {
  /**
   * 读取
   */
  read() {
    targetStore.read()
    planStore.read()
    todoStore.read()
    noteStore.read()
  },

  /**
   * 保存
   */
  save() {
    targetStore.save()
    planStore.save()
    todoStore.save()
    noteStore.save()
  }
}
