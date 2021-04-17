const { htmlText } = require('../../utils/html/text')
const { htmlSpace } = require('../../utils/html/space')

exports.bodyHeader = function ({ firstname, lastname }) {
  var html = ''
  //
  text = `Bonjour ${firstname} ${lastname},`
  html += htmlText.body1(text)

  //
  text = 'Nous vous confirmons votre commande avec les produits suivants :'
  html += htmlText.body1(text)
  html += htmlSpace.br()

  return html
}

exports.producerHeader = function (producer) {
  var html = ''
  //
  var openingHours = producer.choosenOpening.openingHour.split('-')
  var adress = producer.adress

  //
  text = `${producer.name} le ${producer.choosenOpening.date} entre ${openingHours[0]} et ${openingHours[1]}`
  html += htmlText.heading6(text)

  //
  text = `${producer.producerName}`
  html += htmlText.body1(text)

  //
  var adressInfo = adress.adressInfo ? ` (${adress.adressInfo})` : ''
  text = `${adress.zipcode} - ${adress.city}, ${adress.adress}${adressInfo}`
  html += htmlText.body1(text)
  html += htmlSpace.br()

  return html
}

exports.categoryHeader = function (category) {
  text = `${category.name}`
  return htmlText.subtitle2(text)
}
exports.productHeader = function (product) {
  text = `${product.name}`
  return htmlText.body1(text)
}
