// pages/note/create.js
import Note from '../../models/Note'
import noteStore from '../../store/noteStore'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    edit: false,
    note: new Note()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 是否编辑
    if (options.uuid) {
      this.data.edit = true
      let editNote = noteStore.getNote(options.uuid)
      this.data.note = new Note(editNote)
    } else {
      this.data.note = new Note()
    }
    this.update()
  },

  /**
   * 分享
   */
  onShareAppMessage: function (options) {

  },

  /**
   * 内容输入事件
   */
  handleTitleChange(e) {
    this.data.note.title = e.detail.value
    this.update()
  },

  /**
   * 内容输入事件
   */
  handleContentChange(e) {
    this.data.note.content = e.detail.value
    this.update()
  },

  /**
   * 取消按钮点击事件
   */
  handleCancelTap(e) {
    wx.navigateBack()
  },

  /**
   * 保存按钮点击事件
   */
  handleSaveTap(e) {
    if (this.data.edit) {
      noteStore.editNote(this.data.note.uuid, this.data.note)
    } else {
      noteStore.addNote(this.data.note)
    }
    noteStore.save()
    wx.navigateBack()
    wx.showToast({ title: '保存成功' })
  },

  /**
   * 更新数据
   */
  update(data) {
    data = data || this.data
    this.setData(data)
  }
})