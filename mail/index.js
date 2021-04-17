// Firebase
var firebase = require('firebase');
require("firebase/firestore")

// Lib
const { sendMail } = require('./lib/mailjet')
const { htmlHelper } = require('./lib/html.js')
const { signature } = require('./lib/signature')


firebase.default.initializeApp(
    // {
    //       apiKey: "AIzaSyCviOMatlinMRs5w3oo7sKM7aaIIMSrRdQ",
    //       authDomain: "drivons-local-dev.firebaseapp.com",
    //       databaseURL: "https://drivons-local-dev.firebaseio.com",
    //       projectId: "drivons-local-dev",
    //       storageBucket: "drivons-local-dev.appspot.com",
    //       messagingSenderId: "49691264372",
    //       appId: "1:49691264372:web:d744386f9679b5114c1821",
    //       measurementId: "G-G9JCVJS4W3"
    // }
    {
        apiKey: "AIzaSyAEaZuqXWchLdd1oA5MzQdaxIofE0ciz2Y",
        authDomain: "drivons-local-prod.firebaseapp.com",
        databaseURL: "https://drivons-local-prod.firebaseio.com",
        projectId: "drivons-local-prod",
        storageBucket: "drivons-local-prod.appspot.com",
        messagingSenderId: "417457181023",
        appId: "1:417457181023:web:9dbe68e4d2f35f0c8f26ea",
        measurementId: "G-DPGYVJLJ07"
    }
)
const firestore = firebase.default.firestore()

function getDate(gap) {
  var tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + gap)

  var day = String(tomorrow.getDate()).padStart(2, '0')
  var month = String(tomorrow.getMonth() + 1).padStart(2, '0')
  var year = tomorrow.getFullYear()
  var date = `${year}/${month}/${day}`
  return date
}

async function deleteAllYesterdayOrders() {
  var date = getDate(-1)

  var result = await admin
    .firestore()
    .collection('orders')
    .where('day', '==', date)
    .delete()
}

async function getAllTomorrowOrders() {
  var date = getDate(0)
  console.log(date)

  var result = await firestore
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
  // Phase de processing
  // Regrouper les commandes par même producteur
  // Regrouper les commandes par même horaire
  var hashedOrders = {}

  orders.forEach((order) => {
    if (!hashedOrders[order.producerId]) hashedOrders[order.producerId] = {}
    if (!hashedOrders[order.producerId][order.hour])
      hashedOrders[order.producerId][order.hour] = []

    hashedOrders[order.producerId][order.hour].push(order)
  })

  return hashedOrders
}

function sendAllMailToProducer(hashedOrders) {
  for (const [producerId, openings] of Object.entries(hashedOrders)) {
    // Les commandes du même producteur
    var date = getDate(0)
    let producerMail

    var html = `<h1>Vos commandes du ${date}</h1>`

    for (const [opening, orders] of Object.entries(openings)) {
      //
      html += `<div style="margin-bottom:7px">Les commandes pour ${opening} </div>`

      orders.forEach((order) => {
        producerMail = order.producerMail
        //
        var info = order.info
        // Order info
        html += `<div><strong>${info.lastname} ${info.firstname}</strong> (${info.mail})</div>`
        // Category
        html += htmlHelper.tableHeader
        html += '<tr>'

        var total = 0
        order.productCategories.forEach((category) => {
          var categoryRowSize = category.products.reduce(
            (total, product) => total + product.units.length,
            0
          )
          html += htmlHelper.categoryRow(category.name, categoryRowSize)

          category.products.forEach((product) => {
            var productRowSize = product.units.length
            html += htmlHelper.productRow(product.name, productRowSize)
            product.units.forEach((unit) => {
              // Html
              html += htmlHelper.productUnitRow(unit)
              html += '<tr></tr>'
              // Total
              total += unit.price * unit.quantity
            })
          })
        })
        html += htmlHelper.tableFooter
        html += `<div><strong>Total client : ${total / 100}€ </strong></div>`
        html += '<br />'
      })
    }
    html += signature
    sendMail(producerMail, 'Vos commandes pour demain', html, '')
  }
}


async function main() {

  var orders = await getAllTomorrowOrders()
  console.log(orders)
  if (orders.length) {
    sendAllMailToProducer(sortOrders(orders))
  }
}

main()
