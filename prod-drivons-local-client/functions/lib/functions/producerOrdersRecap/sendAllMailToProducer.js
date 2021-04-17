const { getSortedOrdersDueToTomorrow } = require('./firestore')
const { sendMail } = require('../../utils/mail/mailjet')

const { htmlTable } = require('../../utils/html/table')
const { htmlText } = require('../../utils/html/text')
const { htmlSpace } = require('../../utils/html/space')
const { signature } = require('../../utils/html/signature')
const { bodyHeader, openingHeader, orderHeader } = require('./header')

exports.sendAllMailToProducer = async function () {
  var orders = await getSortedOrdersDueToTomorrow()

  var text = ''
  var html = ''
  for (const [producerId, openings] of Object.entries(orders)) {
    let producerMail

    // HTML
    html += bodyHeader()

    for (const [opening, orders] of Object.entries(openings)) {
      // HTML
      html += openingHeader(opening)

      orders.forEach((order) => {
        producerMail = order.producerMail

        // HTML
        html += orderHeader(order.info)
        html += htmlTable.tableHeader

        var total = 0
        order.productCategories.forEach((category) => {
          var categoryRowSize = category.products.reduce(
            (total, product) => total + product.units.length,
            0
          )
          html += htmlTable.categoryRow(category.name, categoryRowSize)

          category.products.forEach((product) => {
            var productRowSize = product.units.length
            html += htmlTable.productRow(product.name, productRowSize)
            product.units.forEach((unit) => {
              // HTML
              html += htmlTable.productUnitRow(unit)
              // Total
              total += unit.price * unit.quantity
            })
          })
        })
        html += htmlTable.tableFooter
        text = `<strong>Total client : ${total / 100}€ </strong>`
        html += htmlText.body1(text)
        html += htmlSpace.br()
      })
    }
    html += signature

    var to = producerMail
    var subject = 'Vos commandes pour demain'
    sendMail(to, subject, html, '')
  }
}
