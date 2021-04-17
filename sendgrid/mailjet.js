const mailjet = require ('node-mailjet')
.connect('96defd569de739bc7732e53c7d163178', 'dce5cba31104dae26260f5af287a9fa4')
const request = mailjet
.post("send", {'version': 'v3.1'})
.request({
  "Messages":[
    {
      "From": {
        "Email": "contact@drivons-local.fr",
        "Name": "Thebault"
      },
      "To": [
        {
          "Email": "contact@drivons-local.fr",
          "Name": "Thebault"
        }
      ],
      "Subject": "Greetings from Mailjet.",
      "TextPart": "My first Mailjet email",
      "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
      "CustomID": "AppGettingStartedTest"
    }
  ]
})
request
  .then((result) => {
    console.log(result.body)
  })
  .catch((err) => {
    console.log(err.statusCode)
  })
