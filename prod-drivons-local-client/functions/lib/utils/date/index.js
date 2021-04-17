exports.dateToFormatYYYYMD = function (NumberOfDayAfterToday) {
  var tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + NumberOfDayAfterToday)

  var day = String(tomorrow.getDate())
  var month = String(tomorrow.getMonth() + 1)
  var year = tomorrow.getFullYear()
  var date = `${year}/${month}/${day}`
  return date
}
exports.dateToFormatYYYYMMDD = function (NumberOfDayAfterToday) {
  var tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + NumberOfDayAfterToday)

  var day = String(tomorrow.getDate()).padStart(2, '0')
  var month = String(tomorrow.getMonth() + 1).padStart(2, '0')
  var year = tomorrow.getFullYear()
  var date = `${year}/${month}/${day}`
  return date
}
