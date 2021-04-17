<template>
  <v-row>
    <v-col class="pt-0">
      <h1 class="mt-1 h2">{{ producer.name }}</h1>
      <div>
        {{ producer.producerName }}
      </div>
      <div>
        {{ info }}
      </div>
      <div v-if="producer.adressInfo" class="text-subtitle">
        {{ producer.adressInfo }}
      </div>
      <Link :link="producer.website" />
      <br class="my-1" />
      <div>
        <category
          v-for="category in producer.productCategories"
          :key="category.name"
          :category="category"
          :producerName="producer.name"
        />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import firestore from '~/services/firestore'

import category from '~/components/pages/producers/producer/category'
import Link from '~/components/pages/producers/link'

export default {
  layout: 'producer',
  components: {
    category,
    Link,
  },
  data: () => ({
    producer: {},
  }),
  async asyncData({ params }) {
    return {
      department: params.department,
      producerId: params.producerId,
    }
  },
  async fetch() {
    this.producer = await firestore.getProducerById(
      this.$fire.firestore,
      this.producerId
    )
  },
  computed: {
    info() {
      var { zipcode, city, adress } = this.producer
      return `${zipcode} - ${city}, ${adress}`
    },
  },
}
</script>

<style></style>
