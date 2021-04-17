<template>
  <div>
    <onlyText>
      <div v-if="loading">
        <v-progress-circular width="5" size="100" indeterminate color="white" />
      </div>
      <div v-else class="text-h4 shadowOnWhiteText">{{ this.text }}</div>
    </onlyText>
  </div>
</template>

<script>
import onlyText from '~/components/wrapper/onlyText'

export default {
  layout: 'landingPage',
  components: { onlyText },
  data: () => ({
    text: '',
    loading: true,
  }),
  async asyncData({ params }) {
    return {
      orderId: params.orderId,
    }
  },
  async mounted() {
    const orderId = this.$route.query.orderId
    try {
      var doc = await this.$fire.firestore
        .collection('orders')
        .doc(orderId)
        .get()
      if (!doc.exists) {
        this.text = 'Votre commande a déjà été supprimée'
      } else {
        await this.$fire.firestore.collection('orders').doc(orderId).delete()
        this.text = `Votre commande a bien été supprimée`
      }
    } catch (e) {
      this.text = "Cette commande n'existe pas"
    }
    this.loading = false
  },
}
</script>

<style></style>
