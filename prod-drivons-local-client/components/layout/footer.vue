<template>
  <v-footer color="grey darken-4">
    <v-row>
      <v-col>
        <v-container>
          <v-row
            class="text-body-1 grey--text text--lighten-2 text-center"
            justify="space-around"
          >
            <v-col cols="12" sm="4">
              <div>
                <a
                  style="text-decoration: none; color: white"
                  href="mailto:contact@drivons-local.fr"
                  >Contactez nous</a
                >
              </div>
            </v-col>
            <!-- <v-col cols="12" sm="4">
              <div>
                <NuxtLink
                  style="color: white; text-decoration: none"
                  to="/info/about-us"
                  >À propos</NuxtLink
                >
              </div>
            </v-col> -->
            <v-col cols="12" sm="4">
              <div>
                <NuxtLink
                  style="color: white; text-decoration: none"
                  to="/info/image"
                  >Image License Info</NuxtLink
                >
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {}
</script>

<style></style>
