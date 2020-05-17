import {ENTRY_OBJECT_PUSH} from '../mutation-types';

export default {
    state: {
        entry: {
            id: '',
            count: 1,
            amount: 1,
            created_at: '',
        },
        entries: {}
    },
    mutations: {
        [ENTRY_OBJECT_PUSH](state, data) {
            if (data && typeof data === 'object') {
                state.entry = data
                let obj = {}
                obj[data.id] = data
                state.entries = {...state.entries, ...obj}
            }
        },
    },
    getters: {
        getEntries(state) {
            return state.entries
        }
    },
};
