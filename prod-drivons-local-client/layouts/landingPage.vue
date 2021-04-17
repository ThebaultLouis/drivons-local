<template>
  <v-app>
    <v-main>
      <nuxt />
      <Footer />
    </v-main>
  </v-app>
</template>

<script>
import Footer from '~/components/layout/footer'
export default {
  components: {
    Footer,
  },
}
</script>
