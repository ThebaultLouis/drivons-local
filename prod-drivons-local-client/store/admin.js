const state = () => ({
  isLoggedAsAdmin: false,
})
const getters = {}
const mutations = {
  setIsLoggedAsAdmin(state, bool) {
    state.isLoggedAsAdmin = bool
  },
}
const actions = {
  async signin({ commit }, { email, password }) {
    await this.$fire.auth.signInWithEmailAndPassword(email, password)

    var userDoc = await this.$fire.firestore
      .collection('admins')
      .doc(this.$fire.auth.currentUser.uid)
      .get()
    if (!userDoc.exists) {
      throw 'The user is not an admin'
    }
    commit('setIsLoggedAsAdmin', true)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
