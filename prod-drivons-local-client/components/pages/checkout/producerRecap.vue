<template>
  <v-card class="my-4">
    <v-card-title class="text-h5">
      {{ producer.name }}
    </v-card-title>
    <v-card-text>
      <div v-for="category in producer.productCategories" :key="category.name">
        <categoryRecap :producerName="producer.name" :category="category" />
      </div>
      <div class="text-subtitle-1 font-weight-bold">
        Sous total : {{ price }}
        <!-- <v-row>
          <v-col> Sous total </v-col>
          <v-col class="text-center" cols="3" sm="3">
            {{
              price
            }}
          </v-col>
        </v-row> -->
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import categoryRecap from './categoryRecap'
export default {
  props: ['producer'],
  components: {
    categoryRecap,
  },
  computed: {
    totalCategoryPrice() {
      return this.producer.productCategories.reduce((total, category) => {
        return (
          total +
          category.products.reduce((total, product) => {
            return (
              total +
              product.units.reduce((total, unit) => {
                return total + unit.price * unit.quantity
              }, 0)
            )
          }, 0)
        )
      }, 0)
    },
    price() {
      return this.totalCategoryPrice
        ? this.totalCategoryPrice / 100 + ' €'
        : 'Prix sur place'
    },
  },
}
</script>

<style></style>
