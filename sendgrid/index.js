import sgMail from "@sendgrid/mail"

sgMail.setApiKey('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')

const msg = {
  to: 'maariedrn@gmail.com', // Change to your recipient
  from: 'contact@drivons-local.fr', // Change to your verified sender
  subject: 'Avoue que je suis un peu le boss',
  text: 'and easy to do anywhere, even with Node.js',
  html: "T'es belle",
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })