import colors from 'vuetify/es5/util/colors'
import firebase from 'firebase/app'
import 'firebase/firestore'

import dotenv from 'dotenv'
dotenv.config({ path: '.env' })

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: 'DrivonsLocal',
    title: 'DrivonsLocal',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'DrivonsLocal, la plateforme en ligne qui favorise la consommation locale en facilitant la vente directe producteur-consommateur.',
      },
      {
        name: 'og:description',
        content:
          'DrivonsLocal, la plateforme en ligne qui favorise la consommation locale en facilitant la vente directe producteur-consommateur.',
      },
      {
        name: 'og:image',
        content: '/bg.jpg',
      },
      {
        name: 'og:title',
        content: 'DrivonsLocal',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/css/main'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/dotenv',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: process.env.apiKey,
          authDomain: process.env.authDomain,
          databaseURL: process.env.databaseURL,
          projectId: 'drivons-local-prod',
          storageBucket: process.env.storageBucket,
          messagingSenderId: process.env.messagingSenderId,
          appId: process.env.appId,
          measurementId: process.env.measurementId,
        },
        services: {
          auth: true,
          analytics: true,
          firestore: true,
          functions: true,
        },
      },
    ],
  ],
  functions: {
    location: 'europe-west1',
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  generate: {
    exclude: [
      /^\/admin/,
      // /^\/order/,
      // '/checkout',
      // '/checkout/withdrawal-points',
    ],
    async routes() {
      var all = []
      firebase.initializeApp({
        apiKey: process.env.apiKey,
        authDomain: process.env.authDomain,
        databaseURL: process.env.databaseURL,
        projectId: 'drivons-local-prod',
        storageBucket: process.env.storageBucket,
        messagingSenderId: process.env.messagingSenderId,
        appId: process.env.appId,
        measurementId: process.env.measurementId,
      })
      // Departements
      var data = await firebase.firestore().collection('departments').get()
      data.forEach((doc) => {
        var dep = doc.id
        all.push(`/${dep}/producers`)
      })
      // producers
      var data = await firebase.firestore().collection('producers').get()
      data.forEach((doc) => {
        var id = doc.id
        var data = doc.data()
        all.push(`/${data.departmentCode}/producers/${id}`)
      })

      return all
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
