import Store from './Store'
/**
 * NoteStore 类
 */
class SettingStore extends Store {
  constructor() {
    super()
    this.config = {}
    this.key = '__setting__'
    this.__init()
  }

  /**
   * 初始化
   */
  __init() {
    // wx.setStorageSync('__todos_inited__', false)
    let isInited = wx.getStorageSync('__todos_inited__')
    if (isInited) return
    this.config = {
      todoListStyle:1
    }
    // this.todos.forEach((value)=>console.log(value.time))
    this.save()
    wx.setStorageSync('__todos_inited__', true)
  }


  /**
   * 
   */
  getConfigs(){
    return this.config
  }
  
  setConfigs(config){
    Object.assign(this.config,config)
  }
  
  /**
   * 读取
   */
  read() {
    let todos = wx.getStorageSync(this.key) || {}
  }

  /**
   * 保存
   */
  save() {
    wx.setStorageSync(this.key, this.config)
  }


}

export default new SettingStore()