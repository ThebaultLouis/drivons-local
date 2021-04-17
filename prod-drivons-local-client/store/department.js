import dateHelper from '../utils/date'

const state = () => ({
  dep: null,
  producers: [],
})

const mutations = {
  setDep(state, dep) {
    state.dep = dep
  },
  setProducers(state, producers) {
    state.producers = producers
  },
}

function getAllOpeningsFromProducer(producer) {
  var openings = []

  const hourLimit = 20 - 1

  var now = new Date(Date.now().valueOf())
  var currentDay = now.getDay()

  producer.openingDays.forEach((openingDay) => {
    var dayDifference = openingDay.value - currentDay
    var inNumberOfDays = dayDifference
    if (dayDifference < 0) {
      inNumberOfDays = 7 + dayDifference
    }
    if (dayDifference == 0) {
      inNumberOfDays = 7
    }
    if (inNumberOfDays == 1 && now.getHours() > hourLimit) {
      inNumberOfDays = 8
    }
    // Adding date
    var date = new Date(now.valueOf())
    date.setDate(date.getDate() + inNumberOfDays)

    openingDay.openingHours.forEach((openingHour) => {
      openings.push({
        value: {
          date: dateHelper.dateToFormatYYYYMD(date),
          openingHour: openingHour,
        },
        text: dateHelper.dateWithOpeningToString(date, openingHour),
      })
    })
  })
  return openings.sort((a, b) => a.value.date >= b.value.date)
}

const actions = {
  setDep({ state, commit }, dep) {
    if (state.dep && dep != state.dep) {
      commit('cart/resetCart', null, { root: true })
    }
    commit('setDep', dep)
  },
  setProducers({ commit }, producers) {
    for (var i = 0; i < producers.length; i++) {
      producers[i].openings = getAllOpeningsFromProducer(producers[i])
      producers[i].choosenOpening = {}
    }
    commit('setProducers', producers)
  },
  getProducerById({ state }, producerId) {
    return state.producers.find((producer) => producer.id == producerId)
  },
  getAllSelectedProducers({ state }, selectedProducers) {
    return selectedProducers.map((cartProducer) => {
      var producer = state.producers.find(
        (prod) => prod.name == cartProducer.name
      )
      return {
        ...cartProducer,
        id: producer.id,
        mail: producer.mail,
        producerName: producer.producerName,
        openings: producer.openings,
        adress: {
          zipcode: producer.zipcode,
          city: producer.city,
          adress: producer.adress,
          adressInfo: producer.adressInfo,
        },
      }
    })
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
