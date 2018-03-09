import Store from './Store'
import Note from '../models/Note'

/**
 * NoteStore 类
 */
class NoteStore extends Store {
  constructor() {
    super()
    this.notes = []
    this.key = '__notes__'
    this.__init()
  }

  /**
   * 初始化
   */
  __init() {
    // wx.setStorageSync('__notes_inited__', false)
    let isInited = wx.getStorageSync('__notes_inited__')
    if (isInited) return
    this.notes = this.notes.concat([new Note({
      title: '欢迎使用TodoList笔记功能',
      content: 'TodoList笔记，随时随地记录您的思考和见闻，赶快用起来吧！'
    }), new Note({
      title: '如何新建笔记？',
      content: '点击下方 + 按钮，输入标题和内容后点击保存就可以新建一个笔记啦！'
    }), new Note({
      title: '如何编辑笔记？',
      content: '点击笔记卡片即可进入编辑页面编辑您的笔记'
    }), new Note({
      title: '《登鹳雀楼》',
      content: '白日依山尽，黄河入海流。欲穷千里目，更上一层楼。'
    })])
    this.save()
    wx.setStorageSync('__notes_inited__', true)
  }

  /**
   * 获取笔记列表
   */
  getNotes() {
    return this.notes
  }

  /**
   * 根据UUID获取笔记
   */
  getNote(uuid) {
    return this.notes.find((item) => item.uuid === uuid)
  }

  /**
   * 根据索引获取笔记
   */
  getNoteByIndex( index ) {
    return this.notes[index]
  }

  /**
   * 获取笔记索引
   */
  getIndex (note) {
    return this.notes.indexOf(note)
  }

  /**
   * 设置笔记列表
   */
  setNotes(notes) {
    this.notes = notes
  }

  /**
   * 添加笔记
   */
  addNote(note) {
    this.notes.push(note)
  }

  /**
   * 编辑笔记
   */
  editNote(uuid, newNote) {
    let note = this.getNote(uuid)
    if (note) Object.assign(note, newNote)
  }

  /**
   * 删除笔记
   */
  removeNote(uuid) {
    let note = this.getNote(uuid)
    let index = this.getIndex(note)
    if (index < 0) return false
    return this.removeNoteByIndex(index)
  }

  /**
   * 根据索引删除笔记
   */
  removeNoteByIndex(index) {
    this.notes.splice(index, 1)
    return true
  }

  /**
   * 读取
   */
  read() {
    let notes = wx.getStorageSync(this.key) || []
    this.notes = notes
  }

  /**
   * 保存
   */
  save() {
    wx.setStorageSync(this.key, this.notes)
  }
}

export default new NoteStore()