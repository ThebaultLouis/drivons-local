const functions = require('firebase-functions')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const { confirmOrder } = require('./lib/functions/confirmOrder')
const { producerOrdersRecap } = require('./lib/functions/producerOrdersRecap')

exports.confirmOrder = confirmOrder
exports.producerOrdersRecap = producerOrdersRecap
