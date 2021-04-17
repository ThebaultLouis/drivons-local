const functions = require('firebase-functions')
const { sendMail } = require('../../utils/mail/mailjet')
const { htmlBody } = require('./htmlBody')

exports.confirmOrder = functions
  .region('europe-west1')
  .https.onCall((data, context) => {
    functions.logger.info(data, { structuredData: true })

    var mail = data.info.mail
    var subject = 'Confirmation de votre commande'
    var html = htmlBody(data.info, data.producers, data.orders)

    sendMail(mail, subject, html, '')

    return {
      data,
      html,
    }
  })
