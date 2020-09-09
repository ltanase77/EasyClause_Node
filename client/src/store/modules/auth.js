import router from "../../router/index";
import { setToastContent } from "./../../util";
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
            const url =
                "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAka-1fptQxuOPxwtTvWS7Qow4WpJ0ec7o";
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: userData.email,
                    password: userData.password,
                    returnSecureToken: true
                })
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    if (data.error) {
                        console.log(data.error);
                        const error = {
                            status: true,
                            title: state.EN
                                ? "An error has ocurred"
                                : "A aparut o erorare",
                            message: data.error.message
                        };
                        return commit("home/SET_TOAST", error, { root: true });
                    }
                    const user = {
                        userId: data.localId,
                        email: data.email,
                        token: data.idToken,
                        refreshToken: data.refreshToken,
                        expiresOn: new Date(
                            new Date().getTime() + data.expiresIn * 1000
                        )
                    };
                    fetch(
                        `https://easy-clause.firebaseio.com/users/${user.userId}.json?auth=${user.token}`
                    )
                        .then(function(response) {
                            return response.json();
                        })
                        .then(result => {
                            user.name = result.name;
                            user.favorites = result.favorites || [];
                            const toast = setToastContent("info", state.EN, [
                                "You are now login!",
                                "Acum ești logat!"
                            ]);
                            commit("home/SET_TOAST", toast, { root: true });
                            commit("USER_IS_AUTH", user);
                            localStorage.setItem("user", JSON.stringify(user));
                            router.push({ path: "account" });
                        });
                })
                .catch(err => {
                    console.log(err);
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
            const url =
                "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAka-1fptQxuOPxwtTvWS7Qow4WpJ0ec7o";
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: userData.email,
                    password: userData.password,
                    returnSecureToken: true
                })
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    if (data.error) {
                        console.log(data.error);
                        const error = {
                            status: true,
                            title: state.EN
                                ? "An error has ocurred"
                                : "A aparut o erorare",
                            message: data.error.message
                        };
                        return commit("home/SET_TOAST", error, { root: true });
                    }
                    console.log(data);
                    const user = {
                        userId: data.localId,
                        email: data.email,
                        name: userData.name,
                        token: data.idToken,
                        refreshToken: data.refreshToken,
                        expiresIn: data.expiresIn
                    };
                    fetch(
                        `https://easy-clause.firebaseio.com/users/${user.userId}.json?auth=${data.idToken}`,
                        {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(userData)
                        }
                    )
                        .then(response => {
                            return response.json();
                        })
                        .then(data => {
                            console.log(data);
                            if (data.error) {
                                console.log(data.error);
                                const error = {
                                    status: true,
                                    title: state.EN
                                        ? "Registration Failed"
                                        : "Înegistrare eșuată",
                                    message: data.error.message
                                };
                                return commit("home/SET_TOAST", error, {
                                    root: true
                                });
                            }
                            const toast = {
                                status: true,
                                title: state.EN
                                    ? "Registration"
                                    : "Înregistrare",
                                message: state.EN
                                    ? "You have been succesfully registered!"
                                    : "Ai fost înregistrat cu success!"
                            };
                            commit("home/SET_TOAST", toast, { root: true });
                            commit("USER_IS_AUTH", user);
                        });
                })
                .catch(err => {
                    this.isError = true;
                    //console.log(err.message);
                    if (err.message === "EMAIL_EXISTS") {
                        this.errorType = "EMAIL_EXISTS";
                    }
                });
        }
    }
};
