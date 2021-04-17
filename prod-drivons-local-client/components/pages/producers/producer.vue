<template>
  <v-card>
    <v-card-title>{{ producer.name }}</v-card-title>
    <v-card-subtitle>
      <v-row>
        <v-col>
          <div>
            {{ producer.producerName }}
          </div>
          <div>
            {{ producer.zipcode }}
            -
            {{ producer.city }}
          </div>
          <div>
            {{ producer.adress }}
          </div>
          <Link :link="producer.website" />
        </v-col>
      </v-row>
    </v-card-subtitle>
    <v-card-actions>
      <v-spacer></v-spacer>
      <NuxtLink
        :to="{
          name: 'department-producers-producerId',
          params: { producerId: producer.id },
        }"
        style="text-decoration: none"
      >
        <v-btn color="green lighten-2" text> Afficher les produits </v-btn>
      </NuxtLink>
    </v-card-actions>
  </v-card>
</template>

<script>
import Link from './link'

export default {
  props: ['producer'],
  components: {
    Link,
  },
  data: () => ({
    show: false,
  }),
  methods: {
    redirect() {
      this.$router.push('producers/' + this.producer.id)
    },
  },
}
</script>

<style></style>
