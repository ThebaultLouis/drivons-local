<template>
  <v-row>
    <v-col>
      <div v-if="!isCartEmpty">
        <h1 class="h3">Récapitulatif de la commande</h1>
        <v-row justify="center">
          <v-col cols="12" sm="10" lg="8">
            <producerRecap
              v-for="producer in producers"
              :key="producer.name"
              :producer="producer"
            />
          </v-col>
        </v-row>
        <v-container>
          <v-row>
            <v-col cols="12" sm="8">
              <div class="text-h5">Total commande : {{ totalPrice }} €</div>
              <div class="text-caption">
                Le paiement se fait sur place lors de l'enlèvement de vos
                produits.
              </div>
            </v-col>
            <v-col cols="12" sm="4">
              <div class="mt-4"></div>
              <v-row justify="center">
                <v-btn
                  class="text-subtitle1"
                  color="green"
                  to="/checkout/withdrawal-points"
                  text
                >
                  Valider la commande
                </v-btn>
              </v-row>
              <br />
              <v-row justify="center">
                <v-btn
                  class="text-title"
                  color="brow"
                  @click="$router.go(-1)"
                  text
                >
                  Poursuivre les achats
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <div v-else>
        <br class="mt-4" />
        <v-row justify="center">
          <h1 class="text-center text-h4">
            Vous n'avez aucun article dans votre panier.
          </h1>
        </v-row>
        <br class="my-5" />
        <v-row justify="center">
          <v-btn class="text-h6" color="green" @click="$router.go(-1)" text>
            Poursuivre les achats
          </v-btn>
        </v-row>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import producerRecap from '~/components/pages/checkout/producerRecap'

export default {
  components: {
    producerRecap,
  },
  computed: {
    ...mapState({
      producers: (state) => state.cart.producers,
    }),
    ...mapGetters({
      totalPrice: 'cart/totalPrice',
      isCartEmpty: 'cart/isCartEmpty',
    }),
  },
}
</script>

<style></style>
