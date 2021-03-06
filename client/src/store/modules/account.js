import { setToastContent, firebaseInstance } from "../../utils/util";
export default {
    actions: {
        addToFavorite({ commit, rootState }, choice) {
            if (!choice.label) {
                const fail = setToastContent("fail", rootState.home.EN, [
                    "Please select a clause!",
                    "Vă rugăm să alegeți o clauză!"
                ]);
                return commit("home/SET_TOAST", fail, { root: true });
            }
            const user = JSON.parse(localStorage.getItem("user"));
            //console.log(favorites);
            if (user) {
                const checkFavorites = user.favorites.filter(
                    favorite => favorite.label === choice.label
                );
                if (checkFavorites.length > 0) {
                    const fail = setToastContent("fail", rootState.home.EN, [
                        "Clause is already added to favorites!",
                        "Această clauză este deja adăugată în lista de favorite!"
                    ]);
                    return commit("home/SET_TOAST", fail, { root: true });
                }
                user.favorites.push(choice);
                localStorage.setItem("user", JSON.stringify(user));
                firebaseInstance
                    .database()
                    .ref("/users/" + user.userId)
                    .update({ favorites: user.favorites })
                    .then(() => {
                        const success = setToastContent(
                            "success",
                            rootState.home.EN,
                            [
                                "The clause has been added to favorites!",
                                "Clauza a fost adăugată în lista de favorite!"
                            ]
                        );
                        commit("auth/SET_FAVORITES", user.favorites, {
                            root: true
                        });
                        commit("home/SET_TOAST", success, {
                            root: true
                        });
                    })
                    .catch(err => {
                        const error = setToastContent("error", rootState.EN, [
                            "We are sorry! We cannot save the clause to your favorite!",
                            "Ne pare rău! Nu am putut salva clauza în lista de favorite!"
                        ]);
                        commit("home/SET_TOAST", error, { root: true });
                    });
            }
        },

        deleteFavorite({ commit, rootState }, clause) {
            if (!clause) {
                const fail = setToastContent("fail", rootState.home.EN, [
                    "Please select a clause!",
                    "Vă rugăm să alegeți o clauză!"
                ]);

                return commit("home/SET_TOAST", fail, { root: true });
            }
            const user = JSON.parse(localStorage.getItem("user"));
            const newFavorites = user.favorites.filter(
                favorite => favorite.label !== clause
            );
            user.favorites = newFavorites;
            localStorage.setItem("user", JSON.stringify(user));
            firebaseInstance
                .database()
                .ref("/users/" + user.userId)
                .update({ favorites: user.favorites })
                .then(() => {
                    const success = setToastContent(
                        "success",
                        rootState.home.EN,
                        [
                            "The clause has been deleted!",
                            "Clauza a fost ștearsă!"
                        ]
                    );
                    commit("auth/SET_FAVORITES", user.favorites, {
                        root: true
                    });
                    commit("home/SET_TOAST", success, { root: true });
                })
                .catch(err => {
                    const error = setToastContent("error", rootState.home.EN, [
                        "We are sorry! We cannot delete the clause!",
                        "Ne pare rău! Nu am putut șterge clauza!"
                    ]);
                    commit("home/SET_TOAST", error, { root: true });
                });
        }
    }
};
