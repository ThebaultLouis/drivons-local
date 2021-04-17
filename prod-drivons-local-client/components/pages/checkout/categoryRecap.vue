<template>
  <div>
    <div class="text-h6">{{ category.name }}</div>
    <v-divider></v-divider>
    <div v-for="product in category.products" :key="product.name">
      <productRecap
        :producerName="producerName"
        :categoryName="category.name"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import productRecap from './productRecap'
export default {
  props: ['producerName', 'category'],
  components: {
    productRecap,
  },
}
</script>

<style></style>
