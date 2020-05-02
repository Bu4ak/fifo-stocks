import {IS_LOGGED_IN, TOKEN} from '../mutation-types';

export default {
    state: {
        isLoggedIn: false,
        token: '',
    },
    mutations: {
        [IS_LOGGED_IN](state, data) {
            state.isLoggedIn = data
        },
        [TOKEN](state, data) {
            state.token = data
        },
    },
    getters: {
        isLoggedIn(state) {
            return state.isLoggedIn
        },
        token(state) {
            return state.token
        },
    },
};
