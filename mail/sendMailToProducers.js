const { sendMail } = require('./lib/mailjet')
const { signature } = require('./lib/signature')
const fs = require('fs')

var rawText = `
Bonjour,\n
Je m'appelle Baptiste, je suis étudiant. Avec un ami, nous travaillons sur une plateforme en ligne à but non lucratif permettant de faciliter la vente directe producteur-consommateur.\n
Je serai ravi de vous présenter plus en détail la plateforme par téléphone!\n
N'hésitez pas à me joindre au 06 78 10 82 43\n
`
var body = `
<div>Bonjour,</div>
<br />
<div>
Je m'appelle Baptiste, je suis étudiant. Avec un ami, nous travaillons sur une plateforme en ligne à but non lucratif permettant de faciliter la vente directe producteur-consommateur.
</div>
<br />
<div>
Je serai ravi de vous présenter plus en détail la plateforme par téléphone!
</div>
<br />
<div>
N'hésitez pas à me joindre au 06 78 10 82 43
</div>
<br />
`
body += signature

// sendMail("contact@drivons-local.fr", "Soutien aux producteurs", body, rawText)

fs.readFile("producers.txt", 'utf8', (err, data) => {
    data.split('\n').forEach(mail => {
        sendMail(mail, "Soutien aux producteurs", body, rawText)
    })
})