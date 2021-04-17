<template>
  <div>
    <onlyText>
      <div class="text-h4 shadowOnWhiteText">
        Il y a eu un problème dans le traitement de votre commande.
      </div>
      <br class="my-2" />
      <div class="text-h5 shadowOnWhiteText">
        Si le problème persiste, veuillez nous contacter par notre adresse mail.
      </div>
    </onlyText>
  </div>
</template>

<script>
import onlyText from '~/components/wrapper/onlyText'

export default {
  components: { onlyText },
  layout: 'landingPage',
}
</script>

<style></style>
