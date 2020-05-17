import stocks from './modules/stocks';
import auth from './modules/auth';
import entry from './modules/entry';
import createPersistedState from "vuex-persistedstate";
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        stocks,
        auth,
        entry,
    },

    plugins: [createPersistedState()],
    strict: true,
});

export default store
