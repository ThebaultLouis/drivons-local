<template>
  <Layout>
    <NuxtLink :to="link" style="color: black; text-decoration: none">
      <v-icon size="40" color="black"> mdi-keyboard-backspace </v-icon>
    </NuxtLink>
  </Layout>
</template>
<script>
import Layout from '~/components/wrapper/layout'

export default {
  components: {
    Layout,
  },
  computed: {
    link() {
      return `/${this.$route.params.department}/producers`
    },
  },
}
</script>
