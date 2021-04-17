const functions = require('firebase-functions')
const { dateToFormatYYYYMMDD } = require('../../utils/date')

const { sendAllMailToProducer } = require('./sendAllMailToProducer')

exports.producerOrdersRecap = functions
  .region('europe-west1')
  .pubsub.schedule('0 20 * * *')
  .timeZone('Europe/Paris')
  .onRun(async (context) => {
    functions.logger.info(dateToFormatYYYYMMDD(1), { structuredData: true })
    try {
      sendAllMailToProducer()
    } catch (error) {
      functions.logger.info(error, { structuredData: true })
    }
  })
