<template>
  <onlyText>
    <landingText />

    <div class="my-4"></div>

    <departmentSelect />

    <br v-if="$vuetify.breakpoint.xs" class="my-2" />
  </onlyText>
</template>

<script>
import onlyText from '~/components/wrapper/onlyText'
import departmentSelect from './departmentSelect'
import landingText from './landingText'

export default {
  components: {
    onlyText,
    departmentSelect,
    landingText,
  },
}
</script>

<style></style>
