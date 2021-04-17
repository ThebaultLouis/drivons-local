function docsToArray(docs) {
  let array = []
  docs.forEach((doc) => {
    array.push({
      id: doc.id,
      ...doc.data(),
    })
  })
  return array
}

const firestore = {
  async getAllDepartments(firestore) {
    var docs = await firestore.collection('departments').get()
    return docsToArray(docs)
  },
  async getAllProducersFromDepartment(firestore, departmentCode) {
    var docs = await firestore
      .collection('producers')
      .where('departmentCode', '==', departmentCode)
      .get()

    return docsToArray(docs)
      .sort((a, b) => (a.name.toLowerCase() <= b.name.toLowerCase() ? -1 : 1))
      .sort((a, b) => (a.zipcode <= b.zipcode ? -1 : 1))
  },
  async getProducerById(firestore, id) {
    var doc = await firestore.collection('producers').doc(id).get()
    if (doc.empty) {
      return null
    }
    return {
      id: doc.id,
      ...doc.data(),
    }
  },
  async addOrder(firestore, info, producers) {
    var orders = []
    for (var i = 0; i < producers.length; i++) {
      var producer = producers[i]

      var docRef = await firestore.collection('orders').add({
        //
        info: info,
        productCategories: producer.productCategories,
        //
        producerId: producer.id,
        producerMail: producer.mail,
        //
        day: producer.choosenOpening.date,
        hour: producer.choosenOpening.openingHour,
      })
      orders.push({
        producerId: producer.id,
        orderId: docRef.id,
      })
    }
    return orders
  },
}

export default firestore
