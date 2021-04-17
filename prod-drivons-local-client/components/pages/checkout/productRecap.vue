<template>
  <div>
    <div class="text-subtitle-2 mt-2">{{ product.name }}</div>
    <div v-for="unit in product.units" :key="unit.name + unit.unit">
      <unit
        :producerName="producerName"
        :categoryName="categoryName"
        :productName="product.name"
        :unit="unit"
      />
    </div>
  </div>
</template>

<script>
import unit from './unit'
export default {
  props: ['producerName', 'categoryName', 'product'],
  components: {
    unit,
  },
}
</script>

<style></style>
