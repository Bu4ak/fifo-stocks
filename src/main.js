import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import vuetify from '@/plugins/vuetify' // path to vuetify export
import store from './vuex/Store';
import VueRouter from 'vue-router'
import Router from './routes'

Vue.use(VueRouter)

const router = new VueRouter(Router)

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App),
}).$mount('#app')
