<template>
  <div>
    <v-img
      position="center 25%"
      style="height: 100vh"
      :src="require(`~/assets/bg.jpg`)"
    >
      <!-- <v-img
      style="height: 100vh"
      position="center 100%"
      :src="require(`~/assets/new_bg.jpg`)"
    > -->
      <v-row class="mt-3 ml-3">
        <nuxt-link to="/" style="text-decoration: none">
          <div class="shadowOnWhiteText white--text text-sm-h3 text-h5">
            DrivonsLocal
          </div>
        </nuxt-link>
      </v-row>
      <v-row
        class="fill-height ma-0 mb-2 text-center white--text"
        align="center"
        justify="center"
      >
        <div style="margin-top: -40px">
          <v-container>
            <slot> </slot>
          </v-container>
        </div>
      </v-row>
    </v-img>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
