<template>
  <v-card width="350">
    <v-card-title class="pb-1">
      <div class="text-subtitle-2 text-left">{{ product.name }}</div>
    </v-card-title>
    <v-card-text class="pb-0">
      <v-row class="pl-3" justify="start">
        <div>{{ product.info }}</div>
      </v-row>
    </v-card-text>

    <v-col v-if="isAvaible">
      <v-row v-if="units.length > 1" class="px-2" justify="center">
        <v-select
          label="Selectionner une unité"
          v-model="choosenUnit"
          :items="units"
          solo
          :error-messages="choosenUnitError"
        ></v-select>
      </v-row>
      <div v-else>
        <v-card style="margin-bottom: 30px" width="100vw" class="pa-3">
          {{ singleProductInfo }}
        </v-card>
      </div>

      <v-row align="center">
        <v-col cols="4" class="min-v-select">
          <v-select
            v-model="quantity"
            :items="quantities"
            :rules="[
              (v) =>
                !!v ||
                'Vous devez choisir une unité avant d\najouter ce produit',
            ]"
            solo
            required
          ></v-select>
        </v-col>
        <v-col cols="8">
          <v-btn @click="addProductUnitQuantity()" text block color="green">
            Ajouter au panier
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <div class="pl-5 error--text text-caption" v-if="this.error">
          {{ this.error }}
        </div>
      </v-row>
    </v-col>

    <v-card-text v-else> Ce produit est indisponible </v-card-text>

    <div class="text-center ma-2">
      <NuxtLink to="/checkout" style="text-decoration: none">
        <v-snackbar
          class="pa-1"
          color="green"
          v-model="snackbar"
          timeout="4000"
        >
          {{ snackbarText }}
          <template v-slot:action="{ attrs }">
            <v-btn color="white" icon v-bind="attrs" @click="snackbar = false">
              <v-icon> mdi-cart </v-icon>
            </v-btn>
          </template>
        </v-snackbar>
      </NuxtLink>
    </div>
  </v-card>
</template>

<script>
export default {
  props: ['producerName', 'categoryName', 'product'],
  data: () => ({
    units: [],
    choosenUnit: null,
    choosenUnitError: [],
    isAvaible: true,
    quantity: 1,
    quantities: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    error: null,
    snackbar: false,
    snackbarText: '',
  }),
  mounted() {
    this.units = this.product.units
      .filter((unit) => unit.isAvaible)
      .map((unit) => {
        return {
          value: unit,
          text: this.text(unit),
        }
      })
    this.units.sort((a, b) => a.value.price - b.value.price)
    if (this.units.length == 1) {
      this.choosenUnit = this.units[0].value
      this.valid = true
    }
    if (this.units.length == 0) {
      this.isAvaible = false
    }
  },
  methods: {
    async addProductUnitQuantity() {
      if (!this.choosenUnit) {
        this.choosenUnitError = [
          "'Vous devez choisir une unité avant d\najouter ce produit'",
        ]
        return
      }
      this.choosenUnitError = []
      var unit = this.choosenUnit
      try {
        await this.$store.dispatch('cart/addProductUnitQuantity', {
          productProducerName: this.producerName,
          productCategoryName: this.categoryName,
          productName: this.product.name,
          productUnit: unit,
          productUnitQuantity: this.quantity,
        })
        this.snackbarText = this.getSnackbarText()
        this.snackbar = true
        this.error = null
      } catch (e) {
        this.error = "Impossible d'avoir plus de 10 fois la même unité"
      }
      this.quantity = 1
    },
    price(price) {
      return price ? price / 100 + ' €' : 'Prix sur place'
    },
    text(unit) {
      if (unit) {
        return this.price(unit.price) + ' / ' + unit.unit
      }
      return ''
    },
    getSnackbarText() {
      var end =
        this.quantity == 1
          ? ' a bien été ajouté au panier'
          : ' ont bien été ajoutés au panier'
      return this.quantity + 'x ' + this.choosenUnit.unit + end
    },
  },
  computed: {
    singleProductInfo() {
      return this.text(this.product.units[0])
    },
  },
}
</script>

<style>
/* .v-input__control {
  max-height: 32px !important;
  min-height: 32px !important;
} */
</style>
