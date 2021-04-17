<template>
  <div v-if="category.products.length" class="text-body1">
    <div class="text-h5">{{ category.name }}</div>
    <v-divider></v-divider>
    <v-row justify="start">
      <v-col
        v-for="product in category.products"
        :key="product.name"
        cols="auto"
      >
        <product
          :producerName="producerName"
          :categoryName="category.name"
          :product="product"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import product from './product'
export default {
  props: ['producerName', 'category'],
  components: {
    product,
  },
}
</script>

<style></style>
