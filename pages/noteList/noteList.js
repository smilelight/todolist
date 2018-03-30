// pages/note/list.js
import Note from '../../models/Note'
import noteStore from '../../store/noteStore'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 笔记列表
    notes: [],

    // 是否动画延迟
    delay: true
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    // 为了新建后列表能更新，此逻辑必须写在 onShow 事件
    this.syncData()
  },

  /**
   * 同步数据
   */
  syncData() {
    this.data.notes = noteStore.getNotes()
    this.update()
    // 动画结束后取消动画队列延迟
    setTimeout(() => {
      this.update({ delay: false })
    }, 2000)
  },

  /**
   * 懒人函数--更新数据
   */
  update(data) {
    data = data || this.data
    this.setData(data)
  },

  /**
   * 笔记 tap 事件
   */
  handleNoteTap(e) {
    // 判断锁
    if (this.disableTap) return
    // 获取 uuid
    let uuid = e.currentTarget.dataset.uuid
    wx.navigateTo({
      url: '../addNote/addNote?uuid=' + uuid
    })
  },

  /**
   * 笔记 longtap 事件
   */
  handleNoteLongTap(e) {
    // 加锁：避免触发 tap 事件
    this.disableTap = true
    // 获取 uuid
    let uuid = e.currentTarget.dataset.uuid
    wx.showModal({
      title: '删除提示',
      content: '确定要删除这个笔记吗？',
      success: (e) => {
        if (e.confirm) {
          noteStore.removeNote(uuid)
          noteStore.save()
          this.syncData()
        }
      }
    })
  },

  /**
   * 笔记 touchend 事件
   */
  handleNoteTouchEnd() {
    setTimeout(() => {
      // 解锁 tap 事件
      this.disableTap = false
    }, 300)
  },

  /**
   * 新建按钮点击事件
   */
  handleAddNote() {
    wx.navigateTo({
      url: '../addNote/addNote'
    })
  }
})