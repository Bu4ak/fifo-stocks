import SignIn from "./components/pages/SignIn";
import Main from "./components/pages/Main";
import store from "./vuex/Store";
import Stock from "./components/pages/Stock";

export default {
    mode: 'history',
    routes: [
        {
            name: 'main',
            path: '/',
            component: Main,
            beforeEnter: (to, from, next) => {
                if (store.getters.isLoggedIn) {
                     next();
                } else {
                     next({path: '/signin'});
                }
            }
        },
        {
            name: 'signin',
            path: '/signin',
            component: SignIn,
            beforeEnter: (to, from, next) => {
                if (store.getters.isLoggedIn) {
                     next({path: '/'});
                } else {
                     next();
                }
            }
        },
        {
            name: 'stock_show',
            path: '/stock/:id',
            component: Stock,
            beforeEnter: (to, from, next) => {
                if (store.getters.isLoggedIn) {
                    next();
                } else {
                    next({path: '/'});
                }
            }
        },
    ]
};
