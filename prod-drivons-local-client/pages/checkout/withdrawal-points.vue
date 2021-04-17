<template>
  <v-row>
    <v-col>
      <h3 class="text-h5">Informations pour le retrait</h3>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="lastname"
              :rules="lastnameRules"
              label="Nom"
              name="lastname"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="firstname"
              :rules="firstnameRules"
              label="Prénom"
              name="firstname"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="mail"
              :rules="mailRules"
              label="E-mail"
              name="mail"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <h3 class="text-h6">Selection des horaires de retrait</h3>
        <v-card class="my-4" v-for="producer in producers" :key="producer.id">
          <v-card-title class="text-h5">
            <v-row>
              <v-col cols="12" sm="6">{{ producer.name }}</v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="producer.choosenOpening"
                  :items="producer.openings"
                  label="Choisir un horaire"
                  solo
                  :rules="requiredOpeningRule"
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-card-title>
        </v-card>
        <v-container>
          <v-row justify="center" justify-sm="end">
            <v-btn
              class="text-h6"
              :loading="loading"
              text
              color="green"
              :disabled="!valid"
              @click="validate"
              >Valider la commande</v-btn
            >
          </v-row>
          <br class="mt-1" />
          <v-row justify="center" justify-sm="end">
            <v-btn class="text-body-1" @click="$router.go(-1)" text
              >Revenir au panier</v-btn
            >
          </v-row>
        </v-container>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import firestore from '~/services/firestore'

export default {
  data: () => ({
    producers: [],
    valid: true,
    loading: false,
    openings: [],
    requiredOpeningRule: [
      (v) => !!v || 'Vous devez choisir un horaire pour ce producteur.',
    ],
    firstname: '',
    lastname: '',
    lastnameRules: [
      (v) => !!v || 'Le nom est requis',
      (v) => v.length <= 30 || 'Le nom doit faire moins de 30 charactères',
    ],
    firstnameRules: [
      (v) => !!v || 'Le prénom est requis',
      (v) => v.length <= 30 || 'Le prénom doit faire moins de 30 charactères',
    ],
    mail: '',
    mailRules: [
      (v) => !!v || "L'adresse mail est requise",
      (v) => /.+@.+/.test(v) || "L'adresse mail doit être valide",
    ],
  }),
  async mounted() {
    this.producers = this.$store.state.cart.producers
    if (!this.producers.length) {
      this.$router.push('/')
    }
    this.producers = await this.$store.dispatch(
      'department/getAllSelectedProducers',
      this.producers
    )
  },
  watch: {
    firstname() {
      this.firstname = this.capitalize(this.firstname)
    },
    lastname() {
      this.lastname = this.capitalize(this.lastname)
    },
  },
  methods: {
    capitalize(s) {
      return s.length > 0 ? s.charAt(0).toUpperCase() + s.slice(1) : ''
    },
    async validate() {
      await this.$refs.form.validate()
      if (this.valid) {
        this.loading = true
        var info = {
          lastname: this.lastname,
          firstname: this.firstname,
          mail: this.mail.trim(),
        }
        this.$fire.functions.region = 'europe-west1'

        try {
          // Add to firebase
          var orders = await firestore.addOrder(
            this.$fire.firestore,
            info,
            this.producers
          )
          // Send confirmation mail
          await this.$fire.functions.httpsCallable('confirmOrder')({
            info: info,
            producers: this.producers,
            orders: orders,
          })
          // Redirect
          this.$router.push('/checkout/success')
          // Reset cart
          this.$store.commit('cart/resetCart')
        } catch (e) {
          this.$router.push('/checkout/error')
        }
        this.loading = false
      }
    },
  },
}
</script>

<style></style>
