<template>
  <div>
    <v-badge
      v-if="itemCount"
      class="mt-3 mr-3"
      :content="itemCount"
      color="green"
      overlap
    >
      <v-btn to="/checkout" icon>
        <v-icon>mdi-cart</v-icon>
      </v-btn>
    </v-badge>
    <v-btn to="/checkout" v-else icon>
      <v-icon>mdi-cart</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      itemCount: 'cart/itemCount',
    }),
  },
}
</script>

<style></style>
