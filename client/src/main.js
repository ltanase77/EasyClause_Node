import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
//import "./plugins/axios";
//import "./plugins/fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faHome,
    faEnvelope,
    faQuestionCircle,
    faCode,
    faCopyright,
    faUserShield,
    faFileContract,
    faExclamationCircle,
    faUserPlus,
    faUserCheck,
    faSignOutAlt,
    faUserCircle,
    faTrashAlt,
    faToolbox,
    faPlus,
    faMinusCircle,
    faEdit
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
//import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
//import "./plugins/bootstrap-vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import "./registerServiceWorker";

library.add(
    faHome,
    faEnvelope,
    faQuestionCircle,
    faCode,
    faCopyright,
    faUserShield,
    faFileContract,
    faExclamationCircle,
    faUserPlus,
    faUserCheck,
    faSignOutAlt,
    faUserCircle,
    faTrashAlt,
    faToolbox,
    faPlus,
    faMinusCircle,
    faEdit
);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(Vuelidate);
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
