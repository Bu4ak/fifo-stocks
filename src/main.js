import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import vuetify from '@/plugins/vuetify' // path to vuetify export
import store from './vuex/Store';
import VueRouter from 'vue-router'
import Router from './routes'
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

Vue.use(VueRouter)
Vue.use(VueAxios, axios)

const router = new VueRouter(Router)

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App),
}).$mount('#app')
