import {STOCK_OBJECT,} from '../mutation-types';

export default {
    state: {
        stock: {
            uuid: '',
            name: '',
            ticker: '',
            positions: [],
        },
        stocks: []
    },
    mutations: {
        [STOCK_OBJECT](state, data) {
            if (data && typeof data === 'object') {
                data.uuid = create_UUID()
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

function create_UUID() {
    let dt = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
