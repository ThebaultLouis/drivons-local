const { dateToFormatYYYYMD } = require('../../utils/date')

const admin = require('firebase-admin')
admin.initializeApp()

async function getOrdersDueToTomorrow() {
  var date = dateToFormatYYYYMD(1)

  var result = await admin
    .firestore()
    .collection('orders')
    .where('day', '==', date)
    .get()

  var orders = []
  result.docs.forEach((doc) => {
    orders.push({ id: doc.id, ...doc.data() })
  })

  return orders
}

function sortOrders(orders) {
  var hashedOrders = {}

  orders.forEach((order) => {
    // Regrouper les commandes par même producteur
    if (!hashedOrders[order.producerId]) hashedOrders[order.producerId] = {}
    // Regrouper les commandes par même horaire
    if (!hashedOrders[order.producerId][order.hour])
      hashedOrders[order.producerId][order.hour] = []

    hashedOrders[order.producerId][order.hour].push(order)
  })

  return hashedOrders
}

exports.getSortedOrdersDueToTomorrow = async function () {
  return sortOrders(await getOrdersDueToTomorrow())
}
