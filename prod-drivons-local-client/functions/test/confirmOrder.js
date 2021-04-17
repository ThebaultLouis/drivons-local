const {confirmOrder} = require('../lib/confirmOrder')

confirmOrder({
    info: {
        "lastname": "Thebault",
        "firstname": "Louis",
        "email": "louis.thebault@neuf.fr"
    },
    producers: [
        {
            "categories": {
                "Jus de fruits": [
                    {
                        "name": "Jus de pommes BIO",
                        "price": 1800,
                        "quantity": 1,
                        "unit": "carton de 6L"
                    }
                ]
            },
            "choosenOpening": {
                "date": "2020/11/16",
                "openingHour": "18h-19h"
            },
            "mail": "tiptopfruits04@orange.fr",
            "name": "Tip Top Fruits",

        }
    ]
}, null)