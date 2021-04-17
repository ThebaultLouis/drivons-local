<template>
  <onlyText>
    <v-card class="pa-2 pb-4" width="350">
      <h1 class="text-h4">Connectez vous</h1>
      <div v-if="error" class="error--text">
        {{ error }}
      </div>
      <v-form class="px-2" ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="mail"
          :rules="[
            (v) => !!v || 'Mail is required',
            (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
          ]"
          name="adminMail"
          label="Adresse mail"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          name="adminPassword"
          type="password"
          :rules="[(v) => !!v || 'Password is required']"
          label="Mot de passe"
          required
        ></v-text-field>
        <br />
        <v-row justify="center">
          <v-btn
            :disabled="!valid"
            :loading="loading"
            color="success"
            @click="validate"
          >
            Se connecter
          </v-btn>
        </v-row>
      </v-form>
    </v-card>
  </onlyText>
</template>

<script>
import onlyText from '~/components/wrapper/onlyText'

export default {
  components: { onlyText },
  layout: 'landingPage',
  data: () => ({
    valid: true,
    mail: null,
    password: null,
    error: '',
    loading: false,
  }),
  methods: {
    async validate() {
      this.$refs.form.validate()
      if (!this.valid) return
      this.loading = true

      try {
        await this.$store.dispatch('admin/signin', {
          email: this.mail,
          password: this.password,
        })
        this.error = ''
        this.$router.push('/admin')
      } catch (e) {
        this.error = "L'email ou le mot de passe est invalide"
      }
      this.loading = false
    },
  },
}
</script>

<style></style>
