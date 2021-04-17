const { dateToFormatYYYYMMDD } = require('../../utils/date')
const { htmlText } = require('../../utils/html/text')
const { htmlSpace } = require('../../utils/html/space')

exports.bodyHeader = function () {
  var date = dateToFormatYYYYMMDD(1)
  text = `Vos commandes du ${date}`
  return htmlText.heading6(text)
}

exports.openingHeader = function (opening) {
  var html = ''
  text = `Les commandes pour ${opening}`
  html += htmlText.body1(text)
  html += htmlSpace.br()
  return html
}

exports.orderHeader = function ({ lastname, firstname, mail }) {
  text = `<strong>${lastname} ${firstname}</strong> (${mail})`
  return htmlText.body1(text)
}
