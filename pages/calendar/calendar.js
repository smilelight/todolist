// pages/others/this.calendar/this.calendar.js
import Todo from '../../models/Todo'
import todoStore from '../../store/todoStore'
import TodoManager from '../../utils/todoManager'

//获取应用实例
const app = getApp()

Page({
  data: {
    selectedDate: '',//选中的几月几号
    selectedWeek: '',//选中的星期几
    curYear: 2017,//当前年份
    curMonth: 0,//当前月份
    daysCountArr: [// 保存各个月份的长度，平年
      31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
    ],
    weekArr: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    dateList: [],

    todos: [],

    // todo 计数
    uncompletedCount: 0,
    completedCount: 0,

    // 是否动画延迟
    delay: false,

    orders: ["时间", "类别", "优先级"]
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },

  onShow: function () {
    var today = new Date();//当前时间  
    var y = today.getFullYear();//年  
    var mon = today.getMonth() + 1;//月  
    var d = today.getDate();//日  
    var i = today.getDay();//星期  
    this.setData({
      curYear: y,
      curMonth: mon,
      selectedDate: y + '-' + mon + '-' + d,
      selectedWeek: this.data.weekArr[i]
    });
    this.syncData()
    this.getDateList(y, mon - 1);
  },
  onHide: function () {
    this.syncData()
  },
  getDateList: function (y, mon) {
    var vm = this;
    //如果是否闰年，则2月是29日
    var daysCountArr = this.data.daysCountArr;
    if (y % 4 == 0 && y % 100 != 0) {
      // this.data.daysCountArr[1] = 29;
      daysCountArr[1] = 29;
      this.setData({
        daysCountArr: daysCountArr
      });
    }
    //第几个月；下标从0开始实际月份还要再+1  
    var dateList = [];
    // console.log('本月', vm.data.daysCountArr[mon], '天');
    dateList[0] = [];
    var weekIndex = 0;//第几个星期
    for (var i = 0; i < vm.data.daysCountArr[mon]; i++) {
      var week = new Date(y, mon, (i + 1)).getDay();
      // 如果是新的一周，则新增一周
      if (week == 0) {
        weekIndex++;
        dateList[weekIndex] = [];
      }
      // 如果是第一行，则将该行日期倒序，以便配合样式居右显示
      if (weekIndex == 0) {
        dateList[weekIndex].unshift({
          value: y + '-' + (mon + 1) + '-' + (i + 1),
          date: i + 1,
          week: week
        });
      } else {
        dateList[weekIndex].push({
          value: y + '-' + (mon + 1) + '-' + (i + 1),
          date: i + 1,
          week: week
        });
      }
    }
    // console.log('本月日期', dateList);
    vm.setData({
      dateList: dateList
    });
  },
  selectDate: function (e) {
    var vm = this;
    // console.log('选中', e.currentTarget.dataset.date.value);
    vm.setData({
      selectedDate: e.currentTarget.dataset.date.value,
      selectedWeek: vm.data.weekArr[e.currentTarget.dataset.date.week]
    });
    vm.setData({
      todos: vm.todosFilter()
    })
  },
  preMonth: function () {
    // 上个月
    var vm = this;
    var curYear = vm.data.curYear;
    var curMonth = vm.data.curMonth;
    curYear = curMonth - 1 ? curYear : curYear - 1;
    curMonth = curMonth - 1 ? curMonth - 1 : 12;
    // console.log('上个月', curYear, curMonth);
    vm.setData({
      curYear: curYear,
      curMonth: curMonth
    });

    vm.getDateList(curYear, curMonth - 1);
  },
  nextMonth: function () {
    // 下个月
    var vm = this;
    var curYear = vm.data.curYear;
    var curMonth = vm.data.curMonth;
    curYear = curMonth + 1 == 13 ? curYear + 1 : curYear;
    curMonth = curMonth + 1 == 13 ? 1 : curMonth + 1;
    // console.log('下个月', curYear, curMonth);
    vm.setData({
      curYear: curYear,
      curMonth: curMonth
    });

    vm.getDateList(curYear, curMonth - 1);
  },

  syncData() {
    // 获取列表
    this.data.todos = todoStore.getTodos()
    this.data.todos = this.todosFilter()
    this.update()
    // 更新置顶标题
    let uncompletedCount = todoStore.getUncompletedTodos().length
    let todayCompletedCount = todoStore.getTodayCompletedTodos().length
    let title = ['TodoList（进行中: ', uncompletedCount, ', 今日已完成: ', todayCompletedCount, '）'].join('')
    wx.setTopBarText({ text: title })
    // 动画结束后取消动画队列延迟
    // setTimeout(() => {
    //   this.update({ delay: false })
    // }, 2000)
  },

  /**
   * Todo 数据改变事件
   */
  handleTodoItemChange(e) {
    let index = e.currentTarget.dataset.index
    let todo = e.detail.data.todo
    let item = this.data.todos[index]
    Object.assign(item, todo)
    this.update()
  },

  /**
   * Todo 长按事件
   */
  handleTodoLongTap(e) {
    // 获取 index
    let index = e.currentTarget.dataset.index
    wx.showModal({
      title: '删除提示',
      content: '确定要删除这项任务吗？',
      success: (e) => {
        if (e.confirm) {
          this.data.todos.splice(index, 1)
          this.update()
        }
      }
    })
  },

  /**
   * 更新数据
   */
  update(data) {
    data = data || this.data
    data.completedCount = todoStore.getCompletedTodos().length
    data.uncompletedCount = todoStore.getUncompletedTodos().length
    this.setData(data)
  },
  /**
   * 新建事件
   */
  handleAddTodo(e) {
    wx.navigateTo({
      url: '../addTodo/addTodo'
    })
  },

  handleTap(e) {
    let index = e.currentTarget.dataset.index;
    let todo = this.data.todos[index];
    let todo_str = JSON.stringify(todo);
    wx.navigateTo({
      url: '../addTodo/addTodo?todo=' + todo_str,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  
  todosFilter() {
    //let todos = todoStore.getTodos()
    // console.log(this.data.selectedDate)
    // console.log(todos[0].date)
    // console.log(todos[0].date.replace(/\//g, '-').replace(/\-0/,"-"))
    return todoStore.getTodos().filter(todo => todo.date.replace(/\//g, '-').replace(/\-0/g, "-") == this.data.selectedDate)
  },

  handOrderTap(e) {
    // this.fuck = this.selectComponent("#fuck")
    // console.log(this.fuck)
    // console.log(this.fuck.properties == this.fuck.fata)
    // this.fuck.loghaha()

  },

  handleOrderBy(e) {
    let todoManager = new TodoManager(this.data.todos)
    console.log(e.detail)
    switch (e.detail.index) {
      case 0:
        this.setData({
          todos: todoManager.todoOrder(todoManager.orderTags[2], e.detail.direction)//按日期和时间排序
        })
        break
      case 1:
        this.setData({
          todos: todoManager.todoOrder(todoManager.orderTags[3], e.detail.direction)//按类别排序
        })
        break
      case 2:
        this.setData({
          todos: todoManager.todoOrder(todoManager.orderTags[4], e.detail.direction)//按优先级排序
        })
        break
    }
  }
})