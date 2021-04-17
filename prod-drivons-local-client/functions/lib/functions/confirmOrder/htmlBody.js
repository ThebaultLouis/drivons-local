const { signature } = require('../../utils/html/signature')
const { htmlText } = require('../../utils/html/text')
const { htmlSpace } = require('../../utils/html/space')
const { ul } = require('../../utils/html/list')
const {
  bodyHeader,
  producerHeader,
  categoryHeader,
  productHeader,
} = require('./header')

require('dotenv').config()
const cancelOrderUrl = `${process.env.baseUrl}/order/cancel?orderId=`

exports.htmlBody = function (info, producers, orders) {
  var html = '<html>'
  var text = ''

  // HTML
  html += bodyHeader(info)

  producers.forEach((producer, index) => {
    // HTML
    html += producerHeader(producer)

    var totalProducerPrice = 0
    producer.productCategories.forEach((category) => {
      // HTML
      html += categoryHeader(category)

      var totalCategoryPrice = 0

      category.products.forEach((product) => {
        // HTML
        html += productHeader(product)

        var totalProductPrice = 0

        html += ul.start()
        product.units.forEach((unit) => {
          unitTotalPrice = unit.price * unit.quantity
          // HTML
          text = `${unit.quantity} x ${unit.unit} : ${unitTotalPrice / 100}€`
          html += ul.item(text)

          totalProductPrice += unitTotalPrice
        })
        html += ul.close()
        totalCategoryPrice += totalProductPrice
      })
      // Category total
      // HTML
      text = `Total ${category.name} : ${totalCategoryPrice / 100}€`
      html += htmlText.body1(text)

      totalProducerPrice += totalCategoryPrice
    })
    // Producer total
    // HTML
    text = `Total ${producer.name} : ${totalProducerPrice / 100}€`
    html += htmlText.heading6(text)
    html += htmlSpace.br()

    // Cancel link
    var orderId = orders.find((order) => order.producerId == producer.id)
      .orderId
    var cancelOrderLink = `${cancelOrderUrl}${orderId}`
    // HTML
    text = `Avant 20h00 la veille de la commande, cliquez ici si vous souhaitez annuler la commande pour ${producer.name}`
    html += htmlText.a(text, cancelOrderLink)
    html += htmlSpace.br()

    if (index != producers.length - 1) {
      html += `<hr style="border-top: 3px dashed #bbb;">`
      html += htmlSpace.br()
    }
  })
  // HTML
  text =
    "Afin de réduire la quantité d'emballages, pensez à emmener vos sacs ou caisses si possible !"
  html += htmlText.heading6(text)
  html += htmlSpace.br()

  html += signature

  html += '</html>'

  return html
}
