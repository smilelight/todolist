const formatTime = (date, hasTime) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  let result = [year, month, day].map(formatNumber).join('/')
  if (hasTime) {
    result = result + ' ' + [hour, minute, second].map(formatNumber).join(':')
  }
  return result
}

const formatMyTime = (date, hasSecond) =>{
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  let result = hour + ':' + minute + (hasSecond ? ":" + second :"")
  return result;
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

const findIndexById = (array,uuid) => {
  if (uuid){
    for ( let i in array) {
      if (array[i].uuid == uuid) {
        return i;
      }
    }
  }
  return -1
}

const getDate = (date) => {
  return date.getFullYear() + '-' + formatNumber(date.getMonth() + 1) + '-' + formatNumber(date.getDate())
}

const getTime = (date) => {
  return formatNumber(date.getHours()) + ':' + formatNumber(date.getMinutes())
}

const setDate = (str,date) => {
  if(typeof(date)!=typeof(Date)){
    date = new Date(date)
  }
  console.log(typeof(str),str)
  console.log(typeof(date),date)
  let [year, month, day] = str.split('-')
  date.setFullYear(parseInt(year))
  date.setMonth(parseInt(month) - 1)//因为月份是从0开始的
  date.setDate(parseInt(day))
}

const setTime = (str,date) => {
  if (typeof (date) != typeof (Date)) {
    date = new Date(date)
  }
  let [hour, minute] = str.split(':')
  date.setHours(parseInt(hour))
  date.setMinutes(parseInt(minute))
}

module.exports = {
  formatTime: formatTime,
  uuid: uuid,
  formatMyTime: formatMyTime,
  findIndexById : findIndexById,
  getDate : getDate,
  getTime : getTime,
  setDate : setDate,
  setTime : setTime
}
