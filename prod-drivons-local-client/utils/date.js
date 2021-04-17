const days = [
  'dimanche',
  'lundi',
  'mardi',
  'mercredi',
  'jeudi',
  'vendredi',
  'samedi',
]

function dateToFormatYYYYMD(date) {
  var day = String(date.getDate())
  var month = String(date.getMonth() + 1)
  var year = date.getFullYear()
  return `${year}/${month}/${day}`
}

function dateToFormatYYYYMMDD(date) {
  var day = String(date.getDate()).padStart(2, '0')
  var month = String(date.getMonth() + 1).padStart(2, '0')
  var year = date.getFullYear()
  return `${year}/${month}/${day}`
}

function dateWithOpeningToString(date, openingHour) {
  return (
    'Le ' +
    days[date.getDay()] +
    ' ' +
    date.getUTCDate() +
    '/' +
    (date.getMonth() + 1) +
    ' de ' +
    openingHour.split('-').join(' à ')
  )
}

export default {
  dateToFormatYYYYMD,
  dateToFormatYYYYMMDD,
  dateWithOpeningToString,
}
