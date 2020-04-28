import stocks from './modules/stocks';
import auth from './modules/auth';
import createPersistedState from "vuex-persistedstate";
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        stocks,
        auth
    },

    plugins: [createPersistedState()],
    strict: true,
});

export default store
