<template>
  <v-row justify="center">
    <v-col class="col-10">
      <v-row class="text-center">
        <h1 class="text-h4 text-sm-h2 white--text shadowOnWhiteText">
          La vente directe de produits locaux à côté de chez vous!
        </h1>
      </v-row>
      <div class="mb-5" v-if="!$vuetify.breakpoint.xs"></div>
      <div class="my-2"></div>
      <v-row class="shadowOnWhiteText white--text" justify="center">
        <h2 class="text-h5 text-sm-h4 text-center">
          La consommation locale n'a jamais été aussi simple
        </h2>
      </v-row>
      <div class="mb-5" v-if="!$vuetify.breakpoint.xs"></div>
    </v-col>
  </v-row>
</template>
