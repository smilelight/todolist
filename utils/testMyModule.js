// const QCloud = require('./qclooud')
// QCloud.init({
//     module:'wenzhi',
//     secretId: 'AKIDujTEsMDuthKn7UrIVjny4ziFajXFot7D',
//     secretKey:'IEJSXTTEH6vc7Wnv1yoV4SrcIn2A6qUx'
// })

// let params = {
//     'content':'人生苦短，please Python。太祖、刘邦、朱元璋哪个更厉害？！'
// }

// QCloud.use('TextClassify',params,function (data) {
//     console.log(data)
// },function (error) {
//     console.log(error)
// })

import WenZhi from './qc-wenzhi.js'

WenZhi.textClassify({
  'content': '人生苦短，please Python。太祖、刘邦、朱元璋哪个更厉害？！'
}, function (data) {
  console.log(data)
}, function (error) {
  console.log(error)
})

import todoStore from '../store/todoStore'
import noteStore from '../store/noteStore'
import targetStore from '../store/targetStore'
import planStore from '../store/planStore'

let todos = todoStore.getTodos()
let notes = noteStore.getNotes()
let targets = targetStore.getTargets()
let plans = planStore.getPlans()

let contents = ''
// notes.forEach(item => {
//   if (item.content != ''){
//     contents += item.content+'\n'
//   }
// })

plans.forEach(item => {
  if (item.desc != '') {
    contents += item.desc + '\n'
  }
})

console.log(contents)

WenZhi.textClassify({
  'content':contents
  }, function (data) {
    console.log(data)
  }, function (error) {
    console.log(error)
  }
)

WenZhi.textSentiment({
  'content': contents
}, function (data) {
  console.log(data)
}, function (error) {
  console.log(error)
}
)

WenZhi.textKeywords({
  'title':contents,
  'content': contents
}, function (data) {
  console.log(data)
}, function (error) {
  console.log(error)
}
)

// notes.forEach(item => {
//   if (item.content != ''){
//     WenZhi.textClassify(
//       {
//         'content': item.content
//       }, function (data) {
//         console.log(item.content,data)
//       }, function (error) {
//         console.log(error)
//       }
//     )
//     WenZhi.textSentiment(
//       {
//         'content': item.content
//       }, function (data) {
//         console.log(item.content, data)
//       }, function (error) {
//         console.log(error)
//       }
//     )
//     WenZhi.textKeywords(
//       {
//         'title': item.content,
//         'content': item.content
//       }, function (data) {
//         console.log(item.content, data)
//       }, function (error) {
//         console.log(error)
//       }
//     )
//   }
// })

// notes.forEach(item => {
//   if (item.desc != '') {
//     WenZhi.textClassify(
//       {
//         'content': item.desc
//       }, function (data) {
//         console.log(item.desc, data)
//       }, function (error) {
//         console.log(error)
//       }
//     )
//     WenZhi.textSentiment(
//       {
//         'content': item.desc
//       }, function (data) {
//         console.log(item.desc, data)
//       }, function (error) {
//         console.log(error)
//       }
//     )
//   }
// })