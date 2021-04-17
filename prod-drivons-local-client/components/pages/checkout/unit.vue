<template>
  <v-row class="text-body-2" align="center">
    <v-col>
      {{ text }}
    </v-col>
    <!-- <v-spacer></v-spacer> -->
    <v-col class="min-v-select" cols="4" sm="2">
      <v-select
        class="pa-0 ma-0 min"
        dense
        solo
        v-model="quantity"
        :items="quantities"
      >
      </v-select>
    </v-col>
    <v-col cols="auto">
      <v-btn @click="removeProductUnit" icon>
        <v-icon> mdi-trash-can </v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ['producerName', 'categoryName', 'productName', 'unit'],
  data: () => ({
    quantity: 0,
    quantities: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  }),
  mounted() {
    this.quantity = this.unit.quantity
  },
  watch: {
    quantity() {
      this.$store.dispatch('cart/setProductUnitQuantity', {
        productProducerName: this.producerName,
        productCategoryName: this.categoryName,
        productName: this.productName,
        productUnit: this.unit,
        unitQuantity: this.quantity,
      })
    },
  },
  computed: {
    unitRecap() {
      return `${this.unit.quantity} x ${this.unit.unit}`
    },
    price() {
      return this.unit.price ? this.unit.price / 100 + ' €' : 'Prix sur place'
    },
    text() {
      return this.price + ' / ' + this.unit.unit
    },
  },
  methods: {
    async removeProductUnit() {
      await this.$store.dispatch('cart/removeProductUnit', {
        productProducerName: this.producerName,
        productCategoryName: this.categoryName,
        productName: this.productName,
        productUnit: this.unit,
      })
      if (this.$store.getters['cart/isCartEmpty']) {
        this.$router.go(-1)
      }
    },
  },
}
</script>

<style></style>
