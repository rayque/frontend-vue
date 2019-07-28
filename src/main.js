import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios';
import pt_BR from 'vee-validate/dist/locale/pt_BR';
import VeeValidate, { Validator } from 'vee-validate';


import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './assets/styles.css';

Vue.use(VeeValidate);
Validator.localize('pt_BR', pt_BR);

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$urlApi = 'http://api_pmz.local/api/'

Vue.use(BootstrapVue);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
