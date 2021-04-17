<template>
  <v-row class="text-center my-3" justify="center">
    <v-col cols="10" sm="8" md="6">
      <v-row class="mb-3" justify="center">
        <h4 class="text-h4 font-weight-bold">
          Entreprendre pour la bonne cause
        </h4>
      </v-row>
      <v-row class="my-2">
        <div class="text-body-1 grey--text text--darken-1">
          Poussés par l'envie d'entreprendre tout en ayant un impact positif,
          Louis et Baptiste se sont lancés le défi de mettre au point une
          plateforme qui permettrait une
          <strong>meilleure reconnaissance</strong> du travail des
          <strong>producteurs locaux</strong>. En effet, le prix de leurs
          produits sont souvent tirés à la baisse par les grossistes
          industriels.
        </div>
      </v-row>
      <v-row class="text-subtitle-1" justify="center">
        <v-col class="pa-2" cols="12" sm="6">
          <a
            target="_blank"
            href="https://www.linkedin.com/in/louis-thebault-9340b9167/"
            class="text-decoration-none black--text"
          >
            <v-img
              max-height="400"
              contain
              :src="require('~/assets/images/louis.jpg')"
            ></v-img>
            <div class="mt-2">Louis Thebault</div>
          </a>
        </v-col>
        <v-col class="pa-2" cols="12" sm="6">
          <a
            target="_blank"
            href="https://www.linkedin.com/in/baptiste-seux-11b793132/"
            class="text-decoration-none black--text"
          >
            <v-img
              max-height="400"
              contain
              :src="require('~/assets/images/baptiste.jpg')"
            ></v-img>
            <div class="mt-2">Baptiste Seux</div>
          </a>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {}
</script>

<style></style>
