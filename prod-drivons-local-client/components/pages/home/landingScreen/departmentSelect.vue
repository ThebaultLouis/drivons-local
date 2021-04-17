<template>
  <v-row>
    <v-col class="py-0" cols="12" sm="6">
      <v-select
        v-model="department"
        :items="departments"
        item-text="name"
        item-value="id"
        label="Choisissez votre département"
        solo
      ></v-select>
    </v-col>
    <v-col class="py-0" cols="12" sm="6">
      <v-btn @click="navigate" block class="green white--text" height="45"
        >Drivons local !</v-btn
      >
    </v-col>
  </v-row>
</template>

<script>
import firestore from '~/services/firestore'

export default {
  data() {
    return {
      departments: [],
      department: null,
    }
  },
  async fetch() {
    this.departments = await firestore.getAllDepartments(this.$fire.firestore)
  },
  methods: {
    navigate() {
      if (this.department) {
        this.$router.push(`/${this.department}/producers`)
      }
    },
  },
}
</script>

<style></style>
