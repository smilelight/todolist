# todolist
我的微信小程序-微计划日程管理

本小程序为本人的毕设设计项目：微计划-日程管理类微信小程序，也不知道直接放在GitHub上好不好，毕竟还在做，还没有完成。

本微信小程序的设计来源：
* 想法：
  * 生命格子（人生格子）、
  * 自己对计划类APP的理解、
  * target对应为plan、plan分解为todo等
* 应用：
  * 高效Todo（四象限和时间轴）、
  * 滴答清单（日视图、月视图、年视图、周视图等等）等
* demo：
  * 微信小程序官方demo（"我的"页面借鉴）、
  * 任务清单demo（主体采用，GitHub：charleslo1/wxapp-todo）、
  * 侧滑特效demo（GitHub：didiaohu/xiaoxiaoxiao/sideslip）(已弃用)、
  * 日历demo（GitHub：youzouzou/wxapp）、
  * 图表demo（GitHub：xiaolin3303/wx-charts）等

目前项目中已经拥有：
* 界面：
  * 关于
  * 增加笔记
  * 增加计划
  * 增加目标
  * 增加todo
  * 动画测试
  * 日历
  * 日视图（框架已有，丑）
  * 四象限
  * 四象限测试
  * 历史（以时间轴形式展现）
  * 主页
  * 一生视图（类似生命格子，实现的很丑陋~）
  * 我的
  * 月视图（框架已有，丑）
  * 笔记列表
  * 计划列表
  * 设置（未实现）
  * 分享（未实现）
  * 统计（以图表形式展现）
  * 同步（未实现，目前做的只是单机版）
  * 目标列表
  * todo列表
  * todo小卡片（可以滑动上下翻的，具体框架已有，不过同样超级丑陋，看来自己的艺术细胞和审美、UI设计方面还是太薄弱了！！！）
  * 周视图（框架已有，丑）
  * 年视图（框架已有，丑）
* 组件
  * 复选框
  * mini-复选框（四象限专用，已弃）
  * mini-todo列表项（四象限专用，已弃）
  * 笔记列表项
  * 排序组件（自主实现，同样超级丑陋）
  * 提示信息
  * todo-图表-环
  * todo列表项
  * todo列表项Pro（在todo列表项的基础上完善了丰富了一些）
* 模型
  * Model 模型基类
  * Note 笔记
  * Plan 计划
  * Target 目标
  * Todo todo
* 存储管理（提供相关数据的文件读取和写入接口函数，供项目其他页面调用）
  * Store 存储基类
  * noteStore 笔记存储
  * planstore 计划存储
  * StoreManage r存储管理
  * targetStore 目标存储
  * todoStore todo存储
* 工具类
  * util 基本工具类，提供格式化数字、日期、生成uuid等方法
  * wxcharts 提供绘制图表的接口函数
  * todoManager 自定义todo管理类，进行todo的筛选、排序等工作
  * planManager 自定义plan管理类，目前没什么方法
  * targetManager 自定义target管理类，目前没什么方法
  * noteManager 自定义note管理类，目前没什么方法
  
部分项目开展计划todo（M、V、C分别对应模型、视图、控制）：
* [x] 增加todo时可以选择plan和target（V）
* [x] 增加note的展示工作（V）
* [x] 增加note时可以选择plan和target（V）
* [ ] 增加管理plan和target的界面（V）(暂弃)
* [x] 增加一句targetId筛选plan、note、todo的功能（C）
* [x] 增加一句planId筛选note、todo的功能（C）
* [x] 增加target列表南片面（V）
* [x] 增加target下的plan的显示界面（V）
* [x] 增加plan下的下属todo界面（V）
* [x] 增加plan列表界面（V）
* [x] 历史（时间轴、功能暂弃）（V）
* [x] 增加按日期/目标统计图表功能（V）（按目标暂弃）
* [x] 小卡片功能（V）
* [x] 增加todo、note、plan、target的删除功能（V）（C）(目前已实现界面，逻辑实现暂弃，算了还是实现了，不过如果要删除target得先把关联的plan全删了，如果要删除plan得先把下属的todo全删了)
* [x] 增加todo的智能排序算法（C）
* [x] 采用进度条，增加计划完成度、目标完成度（V）（M）（也可以采用图表）
* [ ] 增加todo-item的滑动删除功能（V）(不打算实现了，因为每项todo的制定都应经过考虑，不能轻易说删就删，如果删除请进入详情页再删！)
* [ ] 增加排序中按类别、按优先级的下拉菜单（V）（暂弃）
* [ ] 完善小卡片界面，如名人名言、任务总结、是否已完成等
* [x] 增加页面分享功能
* [x] 增加后台，增加数据备份和数据还原功能
