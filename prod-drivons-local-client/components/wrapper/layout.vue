<template>
  <v-app>
    <v-app-bar height="70" app>
      <slot> </slot>

      <v-spacer></v-spacer>
      <Cart />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>
<script>
import Cart from '~/components/layout/cart'
import Footer from '~/components/layout/footer'
export default {
  components: {
    Cart,
    Footer,
  },
}
</script>
