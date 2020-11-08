import Vue from "vue";
import Router from "vue-router";
//import Home from "../views/Home.vue";
import store from "../store/index.js";

Vue.use(Router);

const routes = [
    {
        path: "/",
        name: "home",
        //component: Home
        component: () =>
            import(/* webpackChunkName: "home" */ "./../views/Home.vue")
    },
    {
        path: "/contact",
        name: "contact",
        //component: Contact
        component: () =>
            import(/* webpackChunkName: "contact" */ "./../views/Contact.vue")
    },
    {
        path: "/about",
        name: "about",
        //component: About
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "./../views/About.vue")
    },
    {
        path: "/signup",
        name: "signup",
        component: () =>
            import(/* webpackChunkName: "signup" */ "./../views/SignUp.vue")
    },
    {
        path: "/account",
        name: "account",
        beforeEnter(to, from, next) {
            if (store.state.auth.user.token) {
                next();
            } else {
                next("/");
            }
        },
        component: () =>
            import(/* webpackChunkName: "account" */ "./../views/Account.vue")
    },
    {
        path: "/admin",
        name: "admin",
        beforeEnter(to, from, next) {
            if (store.state.auth.user.token && store.state.auth.user.isAdmin) {
                next();
            } else {
                next("/");
            }
        },
        component: () =>
            import(/* webpackChunkName: "admin" */ "./views/Admin.vue")
    },
    {
        path: "/404",
        name: "404",
        component: () =>
            import(/* webpackChunkName: "404" */ "./../views/NotFound.vue")
    },
    {
        path: "*",
        redirect: { name: "404" }
    }
];

const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
