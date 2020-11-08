import { setToastContent } from "./../../util";
export default {
    state: {
        users: []
    },
    getters: {
        getUsers(state) {
            return state.users;
        }
    },
    mutations: {
        SET_USER(state) {},
        ADD_USER(state) {},
        REMOVE_USER(state) {}
    },
    actions: {
        addCategory({ commit, rootState }, payload) {
            const node = rootState.home.EN
                ? rootState.home.clausesEN.length
                : rootState.home.clausesRO.length;
            const url = `https://easy-clause.firebaseio.com/clauses-type/${
                rootState.home.EN ? "EN" : "RO"
            }/${node}.json?auth=${rootState.auth.user.token}`;
            const newType = {
                clauses: {
                    0: ""
                },
                type: payload.type,
                typeValue: payload.identifier
            };

            fetch(url, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newType)
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const toast = setToastContent("info", rootState.home.EN, [
                        "Category added!",
                        "Categorie adaugata!"
                    ]);
                    return commit("home/SET_TOAST", toast, { root: true });
                });
        },
        removeCategory({ commit, rootState }, payload) {
            const types = rootState.home.EN
                ? rootState.home.clausesEN
                : rootState.home.clausesRO;
            const node = types.findIndex(
                item => item.typeValue === payload.category
            );
            const url = `https://easy-clause.firebaseio.com/clauses-type/${
                rootState.home.EN ? "EN" : "RO"
            }/${node}.json?auth=${rootState.auth.user.token}`;
            fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const toast = setToastContent("info", rootState.home.EN, [
                        "Category deleted!",
                        "Categorie stearsa!"
                    ]);
                    return commit("home/SET_TOAST", toast, { root: true });
                })
                .catch(err => {
                    console.log(err);
                    const toast = setToastContent("info", rootState.home.EN, [
                        "We cannot delete the category due to an error! Please try again!",
                        "Nu am putut sterge categoria! Va rugma incercati din nou!"
                    ]);
                    return commit("home/SET_TOAST", toast, { root: true });
                });
        }
    }
};
