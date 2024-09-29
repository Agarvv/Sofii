import Vuex from 'vuex';
import fetchUrl from '../helpers/fetchUrl';
// WENN DU SEHEN UND VERSTEHEN DAS ICH LIEBE DICH MEIN SUSS, UND ANGULAR >>>>> VUE
export default new Vuex.Store({
    state: {
        user: {}
    },
    mutations: {
       setUser(state, user) {
        state.user = user
       },
    },
    actions: {
     async fetchUser({ commit }) {
        const response = await fetchUrl(process.env.VUE_APP_API_URL + '/api/sofi/check_token')
        if(response.ok) {
            const data = await response.json()
            commit('setUser', data.user)
        } else {
            console.error('THE SESSION IS INVALID')
            throw new Error('Unvalid Session.')
        }
      }
    },
    getters: {
      user: state => state.user
    }
})