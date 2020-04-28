import SignIn from "./components/pages/SignIn";
import Main from "./components/pages/Main";
import store from "./vuex/Store";

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
    ]
};
