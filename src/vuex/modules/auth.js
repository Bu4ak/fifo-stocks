import {IS_LOGGED_IN} from '../mutation-types';

export default {
    state: {
        isLoggedIn: false
    },
    mutations: {
        [IS_LOGGED_IN](state, data) {
            console.log(state, 'IS_LOGGED_IN')

            state.isLoggedIn = data
        }
    },
    getters: {
        isLoggedIn(state) {
            return state.isLoggedIn
        },
    },
};
