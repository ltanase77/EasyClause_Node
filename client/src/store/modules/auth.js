import router from "../../router/index";
import { setToastContent, firebaseInstance } from "../../utils/util";

export default {
    state: {
        user: {
            favorites: []
        },
        isAuth: false
    },

    getters: {
        isAuth(state) {
            return state.isAuth;
        },
        getUser(state) {
            return state.user;
        }
    },

    mutations: {
        USER_IS_AUTH(state, payload) {
            state.isAuth = !state.isAuth;
            state.user = payload;
        },

        USER_IS_LOGOUT(state) {
            state.isAuth = !state.isAuth;
            state.user = {
                favorites: []
            };
        },

        SET_FAVORITES(state, payload) {
            if ("favorites" in state.user) {
                state.user.favorites = payload;
            }
        }
    },

    actions: {
        login({ commit, state }, userData) {
            firebaseInstance
                .auth()
                .signInWithEmailAndPassword(userData.email, userData.password)
                .then(response => {
                    response.user.getIdToken().then(idToken => {
                        const user = {
                            userId: response.user.uid,
                            email: response.user.email,
                            token: idToken,
                            refreshToken: response.user.refreshToken,
                            expiresOn: Date.now() + 3600 * 1000
                        };

                        firebaseInstance
                            .database()
                            .ref("/users/" + user.userId)
                            .once("value")
                            .then(function(snapshot) {
                                const data = snapshot.val();
                                user.name = data.name;
                                user.favorites = data.favorites || [];
                                const toast = setToastContent(
                                    "info",
                                    state.EN,
                                    ["You are now login!", "Acum ești logat!"]
                                );
                                commit("home/SET_TOAST", toast, { root: true });
                                commit("USER_IS_AUTH", user);
                                localStorage.setItem(
                                    "user",
                                    JSON.stringify(user)
                                );
                                router.push({ path: "account" });
                            });
                    });
                })
                .catch(err => {
                    console.log(err);
                    const error = {
                        status: true,
                        title: state.EN
                            ? "An error has ocurred"
                            : "A aparut o erorare",
                        message: err.message
                    };
                    return commit("home/SET_TOAST", error, { root: true });
                });
        },

        logout({ commit, state }) {
            const toast = setToastContent("info", state.EN, [
                "You are now logout!",
                "Acum nu mai ești logat!"
            ]);
            commit("home/SET_TOAST", toast, { root: true });
            commit("USER_IS_LOGOUT");
            localStorage.removeItem("user");
            router.push({ path: "/" }).catch(() => {});
        },

        signup({ commit, state }, userData) {
            firebaseInstance
                .auth()
                .createUserWithEmailAndPassword(
                    userData.email,
                    userData.password
                )
                .then(response => {
                    const user = firebase.auth().currentUser;
                    //console.log(user);
                    const userInfo = {
                        userId: user.uid,
                        email: user.email,
                        name: userData.name,
                        isAdmin: false
                    };
                    firebaseInstance
                        .database()
                        .ref("/users/" + userInfo.userId)
                        .set(userInfo)
                        .then(() => {
                            user.sendEmailVerification().then(() => {
                                const toast = setToastContent(
                                    "info",
                                    state.EN,
                                    [
                                        "You have been registered! You will receive an e-mail for activating your account",
                                        "Ai fost înregistrat! Vei primi un e-mail pentru activarea contului"
                                    ]
                                );
                                commit("home/SET_TOAST", toast, { root: true });
                            });
                        });
                })
                .catch(err => {
                    console.log(err);
                    const error = {
                        status: true,
                        title: state.EN
                            ? "An error has ocurred"
                            : "A aparut o erorare",
                        message: err.message
                    };
                    return commit("home/SET_TOAST", error, { root: true });
                });
        }
    }
};
