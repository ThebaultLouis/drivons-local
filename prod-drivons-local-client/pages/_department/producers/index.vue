<template>
  <v-row>
    <v-col>
      <h1 class="h2">Tous les producteurs du {{ departmentCode }}</h1>
      <v-row class="px-2">
        <v-col
          cols="12"
          sm="6"
          md="4"
          v-for="producer in producers"
          :key="producer.id"
        >
          <producer :producer="producer" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import firestore from '~/services/firestore'
import producer from '~/components/pages/producers/producer'
export default {
  components: {
    producer,
  },
  data: () => ({ producers: [] }),
  async asyncData({ params }) {
    const { department } = params
    return { departmentCode: department }
  },
  async fetch() {
    this.producers = await firestore.getAllProducersFromDepartment(
      this.$fire.firestore,
      this.departmentCode
    )
    this.$store.dispatch('department/setProducers', this.producers)
  },
  mounted() {
    this.$store.dispatch('department/setDep', this.departmentCode)
  },
  computed: {
    title() {
      return 'Tous les producteurs du ' + this.department
    },
  },
}
</script>

<style></style>
