<template>
  <div>
    <only-text>
      <div class="text-h4 shadowOnWhiteText">
        Votre commande a bien été prise en compte !
      </div>
      <br class="my-2" />
      <div class="text-h5 shadowOnWhiteText">
        Un mail vous a été envoyé pour récapituler votre commande
      </div>
    </only-text>
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
