<template>
    <div id="app">
        <app-header
            :showEN="getLanguage.EN"
            :showRO="getLanguage.RO"
            :isAuth="isAuth"
        />
        <app-toast
            :showToast="getToast.status"
            :toastMessage="getToast.message"
            :toastTitle="getToast.title"
        />
        <router-view />
        <div class="spacer"></div>
        <app-footer :showEN="getLanguage.EN" :showRO="getLanguage.RO" />
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Toast from "./components/Toast.vue";

export default {
    name: "App",
    components: {
        appHeader: Header,
        appFooter: Footer,
        appToast: Toast
    },
    computed: {
        ...mapGetters("home", ["getLanguage", "getToast"]),
        ...mapGetters("auth", ["isAuth"])
    },
    mounted() {
        const userString = localStorage.getItem("user");
        const userData = JSON.parse(userString);
        if (userString && userData.token) {
            if (userData.expiresOn > Date.now()) {
                this.$store.commit("auth/USER_IS_AUTH", userData);
            } else {
                this.$store.dispatch("auth/logout");
            }
        }
    }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=IBM+Plex+Sans&display=swap");

html {
    height: 100%;
}

body {
    position: relative;
    height: 100%;
    min-width: 30%;
    margin-left: 2px;
    margin-right: 2px;
    /* padding-bottom: 50px; */
    font-family: "IBM Plex Sans", serif;
    font-size: 16px;
    color: #00188f;
}

#app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
.spacer {
    flex: 1;
}

@media (max-width: 600px) {
    body {
        padding-bottom: 0;
    }
}
</style>
