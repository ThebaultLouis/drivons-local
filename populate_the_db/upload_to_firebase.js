import firebase from "@firebase/app"
import "@firebase/firestore"
import * as fs from 'fs';

let rawdata = fs.readFileSync('bdd.json')
let producers = JSON.parse(rawdata)
rawdata = fs.readFileSync('departments.json')
let departments = JSON.parse(rawdata)

const dev = false
const devMail = "contact@drivons-local.fr"

let config
if (dev) {
    config =     {
          apiKey: "AIzaSyCviOMatlinMRs5w3oo7sKM7aaIIMSrRdQ",
          authDomain: "drivons-local-dev.firebaseapp.com",
          databaseURL: "https://drivons-local-dev.firebaseio.com",
          projectId: "drivons-local-dev",
          storageBucket: "drivons-local-dev.appspot.com",
          messagingSenderId: "49691264372",
          appId: "1:49691264372:web:d744386f9679b5114c1821",
          measurementId: "G-G9JCVJS4W3"
    }
} else {
    config =     {
        apiKey: "AIzaSyAEaZuqXWchLdd1oA5MzQdaxIofE0ciz2Y",
        authDomain: "drivons-local-prod.firebaseapp.com",
        databaseURL: "https://drivons-local-prod.firebaseio.com",
        projectId: "drivons-local-prod",
        storageBucket: "drivons-local-prod.appspot.com",
        messagingSenderId: "417457181023",
        appId: "1:417457181023:web:9dbe68e4d2f35f0c8f26ea",
        measurementId: "G-DPGYVJLJ07"
    }
}

firebase.default.initializeApp(config)

const firestore = firebase.default.firestore()
// Upload departments
for (var i = 0; i < departments.length; i++) {
    var {id, name} = departments[i]
    await firestore.collection('departments').doc(id).set({
        name
    })
}

// Upload producers
for (var i = 0; i < producers.length; i++) {
    var producer = producers[i]
    console.log("Processing " + producer.name)
    var categories = []
    for (const [categoryName, categoryProducts] of Object.entries(producer.productCategories)) {
        var products = []
        for (const [productName, product] of Object.entries(categoryProducts)) {
            products.push({
                name: productName,
                units: product.units,
                info: product.info ? product.info : ""
            })
        }
        // Sort by name
        products.sort((a, b) => a.name < b.name ? -1 : 1)
        categories.push({
            name: categoryName,
            products: products
        })
    }
    // Sort by categories
    categories.sort((a, b) => a.name < b.name ? -1 : 1)
    var data = {
        name: producer.name,
        //
        producerName: producer.producerName,
        //
        mail: dev ? devMail : producer.mail,
        website: producer.website,
        //
        productCategories: categories,
        openingDays: producer.openingDays,
        // Adress
        departmentCode: producer.dep,
        zipcode: producer.zipcode,
        city: producer.city,
        adress: producer.adress,
        adressInfo: producer.adressInfo
    }
    // console.log(data)

    var result = await firestore
    .collection('producers')
    .where('name', '==', producer.name)
    .get()

    if (result.empty) {
        firestore.collection('producers').add(data)
    } else {
        var producerId;
        result.forEach(doc => {
            producerId = doc.id
        })
        firestore.collection('producers').doc(producerId).set(data, {merge: true})
    }
    
}

// producers.forEach(({productCategories, openingDays, name, dep, mail, zipcode, city, adress}) => {
//     console.log("Uploading : " + name)
//     var result
//     firestore
//     .collection('producers')
//     .add({
//         name,
//         mail,
//         dep,
//         productCategories,
//         openingDays,
//         zipcode,
//         city,
//         adress
//     })
// })

