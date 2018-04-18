const app = getApp()

const AV = require('av-live-query-weapp-min');

import targetStore from '../store/targetStore.js'
import planStore from '../store/planStore.js'
import todoStore from '../store/todoStore.js'
import noteStore from '../store/noteStore.js'

//数据备份
const dataBackUp = function(funcS,funcF) {
  var targets = targetStore.getTargets()
  var plans = planStore.getPlans()
  var todos = todoStore.getTodos()
  var notes = noteStore.getNotes()

  var query = new AV.Query('Info');
  query.equalTo('userId', app.globalData.userInfo.avatarUrl);
  query.find().then(function (results) {
    console.log(results)
    if (results.length > 0) {//如果已有备份则更新
      console.log(results[0].attributes.info)
      results[0].set("info", { "targets": targets, "plans": plans, "todos": todos, "notes": notes })
      results[0].save().then(function (info) {
        // 成功保存之后，执行其他逻辑.
        console.log('data back up successfully!');
        funcS()
      }, function (error) {
        // 异常处理
        console.error('Failed to back up the data,please try again!');
        funcF()
      });
    } else {//没有备份，则新建备份
      var Info = AV.Object.extend('Info')
      var info = new Info()
      console.log('此次备份是第一次，正在新建备份！')
      info.set('userId', app.globalData.userInfo.avatarUrl)
      info.set("info", { "targets": targets, "plans": plans, "todos": todos, "notes": notes })
      info.save().then(function (info) {
        // 成功保存之后，执行其他逻辑.
        console.log('data back up successfully!');
        funcS()
      }, function (error) {
        // 异常处理
        console.error('Failed to back up the data,please try again!');
        funcF()
      });
    }
  }, function (error) {
  });
}

//数据还原
const dataRestore = function(funcS,funcF) {
  var query = new AV.Query('Info');
  query.equalTo('userId', app.globalData.userInfo.avatarUrl);
  query.find().then(function (results) {
    console.log(results)
    if (results.length > 0) {
      console.log(results[0].attributes.info)
      var info = results[0].attributes.info
      targetStore.setTargets(info.targets)
      planStore.setPlans(info.plans)
      todoStore.setTodos(info.todos)
      noteStore.setNotes(info.notes)
      funcS()
    } else {
      funcF()
    }
  }, function (error) {
      funcF()
  });
}

module.exports = {
  dataBackUp: dataBackUp,
  dataRestore: dataRestore
}

// console.log(app.globalData.userInfo)
// var targets = targetStore.getTargets()
// var plans = planStore.getPlans()
// var todos = todoStore.getTodos()
// var notes = noteStore.getNotes()
// var Info = AV.Object.extend('Info')
// var info = new Info()
// info.set('userId', app.globalData.userInfo.avatarUrl)
// info.set("info", { "targets": targets, "plans": plans, "todos": todos, "notes": notes })
// info.save().then(function (info) {
//   // 成功保存之后，执行其他逻辑.
//   console.log('New object created with objectId: ' + info.id);
// }, function (error) {
//   // 异常处理
//   console.error('Failed to create new object, with error message: ' + error.message);
// });

// var query = new AV.Query('Info');
// query.equalTo('userId', app.globalData.userInfo.avatarUrl);
// query.find().then(function (results) {
//   console.log(results)
//   // 如果这样写，第二个条件将覆盖第一个条件，查询只会返回 priority = 1 的结果
//   if (results.length > 0) {
//     console.log(results[0].attributes.info)
//   }
// }, function (error) {
// });