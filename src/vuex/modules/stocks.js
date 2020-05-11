import {STOCK_OBJECT,} from '../mutation-types';

export default {
    state: {
        stock: {
            id: '',
            name: '',
            ticker: '',
            lot_size: 1,
            created_at: '',
            entries: [],
        },
        stocks: []
    },
    mutations: {
        [STOCK_OBJECT](state, data) {
            if (data && typeof data === 'object') {
                data.ticker = data.ticker.toUpperCase()

                state.stock = data
                state.stocks.push(state.stock)
            }
        },
        // [STOCK_COLLECTION](state, data) {
        //     if (data && typeof data === 'object' && data.length) {
        //         state.stocks = data;
        //     }
        // }
    },
    getters: {
        getStocks(state) {
            return state.stocks
        }
    },
};
