import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showAlert: false,
    messageAlert: '',
    variant: '',
    usuarioId: null,
  },
  mutations: {
    setShowAlert(state, status){
        state.showAlert = status
    },
    setMessageAlert(state, message){
        state.messageAlert = message
    },
    setVariant(state, status){
        state.variant = status
    },
    setusuarioId(state, usuarioId){
        state.usuarioId = usuarioId
    }

  },
  getters: {
    showAlert: state => {
        return state.showAlert;
    },
    messageAlert: state => {
        return state.messageAlert;
    },
    variant: state => {
        return state.variant;
    },
    usuarioId: state => {
        return state.usuarioId;
    }
  },
})
