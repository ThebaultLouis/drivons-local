<template>
  <div>
    <LandingScreen />
    <v-container>
      <Discover />
    </v-container>
    <About />
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="6" md="4">
          <Producer />
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <Consumer />
        </v-col>
      </v-row>
    </v-container>
    <Figure />
    <AboutUs />
  </div>
</template>

<script>
import LandingScreen from '~/components/pages/home/landingScreen/index'
import Discover from '~/components/pages/home/discover'
import About from '~/components/pages/home/about'
import Producer from '~/components/pages/home/producer'
import Consumer from '~/components/pages/home/consumer'
import Figure from '~/components/pages/home/figure'
import AboutUs from '~/components/pages/home/aboutUs'

export default {
  layout: 'landingPage',
  components: {
    LandingScreen,
    Discover,
    About,
    Producer,
    Consumer,
    Figure,
    AboutUs,
  },
}
</script>

<style></style>
