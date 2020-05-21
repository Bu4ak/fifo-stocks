import {STOCK_COLLECTION, STOCK_OBJECT,} from '../mutation-types';

export default {
    state: {
        stock: {
            id: '',
            name: '',
            ticker: '',
            lot_size: 1,
            created_at: '',
            entries: {},
        },
        stocks: {}
    },
    mutations: {
        [STOCK_OBJECT](state, data) {
            if (data && typeof data === 'object') {
                state.stock = data
                let obj = {}
                obj[data.id] = data
                state.stocks = {...state.stocks, ...obj}
            }
        },
        [STOCK_COLLECTION](state, data) {
            if (data && typeof data === 'object') {
                state.stocks = data;
            }
        }
    },
    getters: {
        getStocks(state) {
            return state.stocks
        }
    },
};
