const functions = require('firebase-functions')

require('dotenv').config()

const mailjet = require('node-mailjet').connect(
  process.env.MAILJET_PUBLIC_KEY,
  process.env.MAILJET_PRIVATE_KEY
)

exports.sendMail = function sendMail(to, subject, html, rawText) {
  const request = mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: 'contact@drivons-local.fr',
          Name: 'DrivonsLocal',
        },
        To: [
          {
            Email: to,
          },
        ],
        Subject: subject,
        TextPart: rawText,
        HTMLPart: html,
        CustomID: subject,
      },
    ],
  })
  request
    .then((result) => {
      functions.logger.info('Email sent to ' + to, { structuredData: true })
    })
    .catch((error) => {
      functions.logger.info(error, { structuredData: true })
    })
}
