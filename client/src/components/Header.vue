<template>
    <div class="header">
        <login-modal :showEN="showEN" :showRO="showRO" />

        <nav class="navbar navbar-expand-lg navbar-light">
            <a class="navbar-brand" href="https://www.easyconsult.ro">
                <img
                    src="img/icon_32.png"
                    width="31"
                    height="32"
                    class="d-inline-block align-top"
                    alt="logo"
                />
                Easy Consult
            </a>
            <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#appNavbar"
                aria-controls="appNavbar"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon" />
            </button>
            <div id="appNavbar" class="collapse navbar-collapse">
                <ul class="navbar-nav m-auto">
                    <router-link
                        class="nav-item"
                        tag="li"
                        to="/"
                        active-class="active"
                        exact
                    >
                        <a class="nav-link"
                            ><font-awesome-icon icon="home" />
                            {{ text.homeText }}</a
                        >
                    </router-link>
                    <router-link
                        class="nav-item"
                        tag="li"
                        to="/contact"
                        active-class="active"
                    >
                        <a class="nav-link"
                            ><font-awesome-icon icon="envelope" /> Contact</a
                        >
                    </router-link>
                    <router-link
                        class="nav-item"
                        tag="li"
                        to="/about"
                        active-class="active"
                    >
                        <a class="nav-link"
                            ><font-awesome-icon icon="question-circle" />
                            {{ text.aboutText }}</a
                        >
                    </router-link>
                    <router-link
                        v-show="!isAuth"
                        class="nav-item"
                        tag="li"
                        to="/signup"
                        active-class="active"
                    >
                        <a class="nav-link"
                            ><font-awesome-icon icon="user-plus" />
                            {{ text.signupText }}
                        </a>
                    </router-link>
                    <li
                        v-show="!isAuth"
                        class="nav-item"
                        data-toggle="modal"
                        data-target="#loginModal"
                        active-class="active"
                    >
                        <a class="nav-link"
                            ><font-awesome-icon icon="user-check" />
                            {{ text.loginText }}
                        </a>
                    </li>
                    <li v-show="isAuth" class="nav-item" active-class="active">
                        <a class="nav-link" @click="logoutHandler"
                            ><font-awesome-icon icon="sign-out-alt" />
                            {{ text.logoutText }}
                        </a>
                    </li>
                    <router-link
                        v-show="isAuth"
                        class="nav-item"
                        active-class="active"
                        tag="li"
                        to="/account"
                    >
                        <a class="nav-link"
                            ><font-awesome-icon icon="user-circle" />
                            {{ text.accountText }}
                        </a>
                    </router-link>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
//import { eventBus } from "./../main";
import LoginModal from "./LoginModal";
import "./../assets/icon_32.png";
//import Toast from "./Toast";
export default {
    name: "Header",
    components: {
        loginModal: LoginModal
        //appToast: Toast
    },
    props: {
        showEN: {
            type: Boolean
        },
        showRO: {
            type: Boolean
        },
        isAuth: {
            type: Boolean
        },
        showToast: {
            type: Boolean
        }
    },
    data() {
        return {
            isActive: false
        };
    },

    computed: {
        text: function() {
            if (this.showEN) {
                return {
                    homeText: "Home",
                    aboutText: "About",
                    signupText: "Sign Up",
                    loginText: "Sign In",
                    logoutText: "Log Out",
                    accountText: "Account"
                };
            } else {
                return {
                    homeText: "Acasă",
                    aboutText: "Despre",
                    signupText: "Înregistrare",
                    loginText: "Contul Meu",
                    logoutText: "Deconectare",
                    accountText: "Cont"
                };
            }
        }
    },

    methods: {
        logoutHandler() {
            this.$store.dispatch(
                "auth/logout"
            ) /* .then(() => {
                this.$router.push({ name: "home" });
            }) */;
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#appNavBar {
    position: relative;
}
li.nav-item {
    cursor: pointer;
}
</style>
