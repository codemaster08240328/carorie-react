import moment from 'moment'

export const getStringFromDate = (date) =>
  date ? moment(date).format('YYYY-MM-DD').toString() : undefined

export const getStringFromTime = (time) => 
  time ? moment(time, 'HH:mm:ss').format('HH:mm:ss').toString() : undefined

export const getStringFromDateTime = (datetime) => 
  datetime ? moment(datetime).format('YYYY-MM-DD HH:mm:ss').toString() : undefined


const isLeapYear = year => {
  if (year % 4 !== 0) return false
  if (year % 100 !== 0) return true
  if (year % 400 !== 0) return false
  return true
}

export const isDateField = date => {
  if (!date || typeof(date) === 'object') return undefined

  if (date.length !== 10) return 'Input valid date'

  const date_splits = date.split('-')
  if (date_splits.length !== 3) return 'Input valid date'

  let year = date_splits[0], month = date_splits[1], day = date_splits[2]
  if (year.length !== 4 || month.length !== 2 || day.length !== 2) return 'Input valid date'

  year = Number(year)
  month = Number(month)
  day = Number(day)

  if (!year || (year < 1900 || year > 2099)) return 'Input valid date'
  if (!month || (month < 1 || month > 12)) return 'Input valid date'

  const days = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  if (!day || (day < 1 || day > days[month - 1])) return 'Input valid date'

  return undefined
}

export const isTimeField = time => {
  if (!time || typeof(time) === 'object') return undefined

  if (time.length !== 8) return 'Input valid time'
  const time_splits = time.split(':')
  if (time_splits.length !== 3) return 'Input valid time'

  let hour = time_splits[0], min = time_splits[1], sec = time_splits[2]
  if (hour.length !== 2 || min.length !== 2 || sec.length !== 2) return 'Input valid time'

  hour = Number(hour)
  min = Number(min)
  sec = Number(sec)

  let flag = true
  for (let i = 0; i <= 23; i++) {
    if (hour === i) {
      flag = false
      break
    }
  }
  if (flag) return 'Input valid time'

  flag = true
  for (let i = 0; i <= 59; i++) {
    if (min === i) {
      flag = false
      break
    }
  }
  if (flag) return 'Input valid time'

  flag = true
  for (let i = 0; i <= 59; i++) {
    if (sec === i) {
      flag = false
      break
    }
  }
  if (flag) return 'Input valid time'

  return undefined
}