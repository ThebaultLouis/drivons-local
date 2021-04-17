const state = () => ({
  producers: [],
})

// getters
const getters = {
  isCartEmpty: (state) => {
    return state.producers.length == 0
  },
  allProductUnit: (state) => {
    var units = []
    state.producers.forEach((producer) => {
      producer.productCategories.forEach((category) => {
        category.products.forEach((product) => {
          product.units.forEach((unit) => {
            units.push(unit)
          })
        })
      })
    })
    return units
  },
  totalPrice: (state, getters) => {
    return (
      getters.allProductUnit.reduce(
        (total, unit) => total + unit.price * unit.quantity,
        0
      ) / 100
    )
  },
  itemCount: (state, getters) => {
    return getters.allProductUnit.reduce(
      (total, unit) => total + unit.quantity,
      0
    )
  },
  cartTotalPrice: (getters) => {
    return getters.totalPrice % 1
      ? Number.parseFloat(getters.totalPrice).toFixed(2)
      : getters.totalPrice
  },
}

// mutations
const mutations = {
  resetCart(state) {
    state.producers = []
  },

  addProductUnitQuantity(
    state,
    {
      productProducerName,
      productCategoryName,
      productName,
      productUnit,
      productUnitQuantity,
    }
  ) {
    const maxProductUnit = 10
    // Init new producer
    var producer = state.producers.find(
      (producer) => producer.name == productProducerName
    )
    if (!producer) {
      state.producers.unshift({
        name: productProducerName,
        productCategories: [],
      })
      producer = state.producers[0]
    }
    // Init new category
    var category = producer.productCategories.find(
      (category) => category.name == productCategoryName
    )
    if (!category) {
      producer.productCategories.unshift({
        name: productCategoryName,
        products: [],
      })
      category = producer.productCategories[0]
    }
    // Init new product
    var product = category.products.find(
      (product) => product.name == productName
    )
    if (!product) {
      category.products.unshift({
        name: productName,
        units: [],
      })
      product = category.products[0]
    }
    // Init new unit
    var unit = product.units.find((u) => u.unit == productUnit.unit)

    if (!unit) {
      product.units.unshift({
        ...productUnit,
        quantity: productUnitQuantity,
      })
    } else {
      if (unit.quantity + productUnitQuantity > maxProductUnit) {
        throw "Product unit quantity can't exceed 10"
      } else {
        unit.quantity += productUnitQuantity
      }
    }
  },

  setProductUnitQuantity(
    state,
    {
      productProducerName,
      productCategoryName,
      productName,
      productUnit,
      unitQuantity,
    }
  ) {
    if (state.producers.length) {
      var producer = state.producers.find(
        (producer) => producer.name == productProducerName
      )
      var category = producer.productCategories.find(
        (category) => category.name == productCategoryName
      )
      var product = category.products.find(
        (product) => product.name == productName
      )
      var unit = product.units.find((unit) => unit.unit == productUnit.unit)

      unit.quantity = unitQuantity
    }
  },

  removeProductUnit(
    state,
    { productProducerName, productCategoryName, productName, productUnit }
  ) {
    if (state.producers.length) {
      // Producer
      var producerIndex = state.producers.findIndex(
        (producer) => producer.name == productProducerName
      )
      var producer = state.producers[producerIndex]

      // Category
      var categoryIndex = producer.productCategories.findIndex(
        (category) => category.name == productCategoryName
      )
      var category = producer.productCategories[categoryIndex]

      // Product
      var productIndex = category.products.findIndex(
        (product) => product.name == productName
      )
      var product = category.products[productIndex]

      // Unit
      var unitIndex = product.units.findIndex(
        (unit) => unit.unit == productUnit.unit
      )

      // Remove
      if (unitIndex < 0) {
        return
      }
      product.units.splice(unitIndex, 1)

      if (!product.units.length) {
        // THE PROBLEM IS HERE
        category.products.splice(productIndex, 1)
      }

      if (!category.products.length) {
        producer.productCategories.splice(categoryIndex, 1)
      }

      if (!producer.productCategories.length) {
        state.producers.splice(producerIndex, 1)
      }
    }
  },
}

// actions
const actions = {
  addProductUnitQuantity({ commit }, product) {
    commit('addProductUnitQuantity', product)
  },
  setProductUnitQuantity({ commit }, product) {
    commit('setProductUnitQuantity', product)
  },
  removeProductUnit({ commit }, product) {
    commit('removeProductUnit', product)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
