import Vue from "vue";
import Vuex from "vuex";
import Auth from "./modules/auth";
import Home from "./modules/home";
import Account from "./modules/account";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth: {
            namespaced: true,
            ...Auth
        },
        home: {
            namespaced: true,
            ...Home
        },
        account: {
            namespaced: true,
            ...Account
        },
        admin: {
            namespaced: true,
            ...Admin
        }
    }
});
