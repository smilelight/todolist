import util from '../utils/util'

/**
 * Model
 * 模型基类
 */
class Model {
  constructor () {
    this.uuid = util.uuid()
  }

  /**
   * 加载详情
   * @param  {Object} params 参数对象
   * @return {Promise}       promise
   */
  load(params) {
    return Promise.reject('未重写 load 方法')
  }

  /**
   * 删除
   * @return {Promise} promise
   */
  remove() {
    return Promise.reject('未重写 remove 方法')
  }

  /**
   * 保存
   * @return {Promise} promise
   */
  save() {
    return Promise.reject('未重写 save 方法')
  }

  /**
   * 验证模型数据
   */
  validate() {
    return Promise.reject('未重写 validate 方法')
  }

  /**
   * 从 api 数据转换为模型
   * @param  {Object} data api 数据
   * @return {Model}       this
   */
  fromApi(data) {
    return this
  }

  /**
   * 转换为 api 接口数据
   * @return {Object} data
   */
  toApi() {
    return Object.assign({}, this)
  }

  /**
   * 从 api 数据数组转换为模型数组（静态方法）
   * @param  {Array}  dataArr api 数据数组
   * @return {Array}         模型数组
   */
  static fromApiArray(dataArr = []) {
    return []
  }

  /**
   * 从模型数组转换为 api 数据数组（静态方法）
   * @param  {Array}  modelArr 模型数组
   * @return {Array}          api 数组
   */
  static toApiArray(modelArr = []) {
    return []
  }

  /**
   * 验证模型
   * @param  {Model} model 模型对象
   * @return {Promise}           验证 Promise
   */
  static validate(model) {
    return Promise.reject('未重写 validate 静态方法')
  }
}

export default Model
