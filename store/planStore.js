import Store from './Store'
import Plan from '../models/Plan'

/**
 * PlanStore 类
 */
class PlanStore extends Store {
  constructor() {
    super()
    this.plans = []
    this.key = '__plans__'
    this.__init()
  }

  /**
   * 初始化
   */
  __init() {
    // wx.setStorageSync('__plans_inited__', false)
    let isInited = wx.getStorageSync('__plans_inited__')
    if (isInited) return
    this.plans = this.plans.concat([
      new Plan({
        title: "多参加招聘会",
        desc: "多跑几次招聘会",
        weight: 3,
      }),
      new Plan({
        title: "多在网上刷点题",
        desc: "多在网上刷点题，如牛客网、LeetCode等",
        weight: 3,
      }),
      new Plan({
        title: "好好准备简历",
        desc: "注意简历的内容、格式",
        weight: 3,
      }),
      new Plan({
        title: "读几本商界大佬传记",
        desc: "收获经验、教训",
        weight: 3,
      }),
      new Plan({
        title: "多留意些身边的女生",
        desc: "看看有没有进一步发展关系的可能性",
        weight: 3,
      }),
      new Plan({
        title: "努力赚钱、买车、买房",
        desc: "没车没房的傻小子找个鸡儿女朋友哦~",
        weight: 3,
      }),
    ])
    this.save()
    wx.setStorageSync('__plans_inited__', true)
  }

  /**
   * 获取计划列表
   */
  getPlans() {
    this.read()
    return this.plans
  }

  /**
   * 根据UUID获取计划
   */
  getPlan(uuid) {
    this.read()
    return this.plans.find((item) => item.uuid === uuid)
  }

  /**
   * 根据索引获取计划
   */
  getPlanByIndex(index) {
    return this.plans[index]
  }

  /**
   * 获取计划索引
   */
  getIndex(plan) {
    return this.plans.indexOf(plan)
  }

  /**
   * 设置计划列表
   */
  setPlans(plans) {
    this.plans = plans
    this.save()
  }

  /**
   * 添加计划
   */
  addPlan(plan) {
    this.plans.push(plan)
  }

  /**
   * 编辑计划
   */
  editPlan(uuid, newPlan) {
    let plan = this.getPlan(uuid)
    if (plan) Object.assign(plan, newPlan)
  }

  /**
   * 删除计划
   */
  removePlan(uuid) {
    let plan = this.getPlan(uuid)
    let index = this.getIndex(plan)
    if (index < 0) return false
    return this.removePlanByIndex(index)
  }

  /**
   * 根据索引删除计划
   */
  removePlanByIndex(index) {
    this.plans.splice(index, 1)
    return true
  }

  /**
   * 读取
   */
  read() {
    let plans = wx.getStorageSync(this.key) || []
    this.plans = plans
    this.plans.forEach(plan => plan.beginTime = new Date(plan.beginTime))
    this.plans.forEach(plan => plan.endTime = new Date(plan.endTime))
  }

  /**
   * 保存
   */
  save() {
    wx.setStorageSync(this.key, this.plans)
  }
}

export default new PlanStore()