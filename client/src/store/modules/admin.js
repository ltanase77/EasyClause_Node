import { setToastContent } from "./../../utils/util";
export default {
    state: {
        clausesContent: [],
        users: []
    },
    getters: {
        getUsers(state) {
            return state.users;
        },
        getClausesContent(state) {
            const content = {};
            state.clausesContent.forEach(item => {
                content[item.name] = item.content;
            });
            return content;
        }
    },
    mutations: {
        SET_USER(state) {},
        SET_CLAUSES_CONTENT(state, payload) {
            state.clausesContent = payload;
        },
        ADD_USER(state) {},
        REMOVE_USER(state) {}
    },
    actions: {
        async fetchClausesContent({ commit, rootState }, payload) {
            try {
                const response = await fetch("http://localhost:3000/clauses");
                if (response.status !== 200) {
                    throw new Error();
                }
                const clauses = await response.json();
                commit("SET_CLAUSES_CONTENT", clauses);
            } catch (err) {
                const error = setToastContent("error", state.EN, [
                    "We are sorry! We cannot get the requested content!",
                    "Ne pare rău! Nu putem afisa continutul solicitat!"
                ]);
                return commit("SET_TOAST", error);
            }
        },
        addCategory({ commit, rootState }, payload) {
            const newType = {
                lang: rootState.home.EN ? "EN" : "RO",
                clauses: [],
                type: payload.type,
                value: payload.identifier
            };

            // We need to define new routes for updating the mongodb database
            const url = "http://localhost:3000/types";
            return fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newType)
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    if (data.msg !== "Success") {
                        throw new Error("There was an error with API");
                    }
                    const toast = setToastContent("info", rootState.home.EN, [
                        "Category added!",
                        "Categorie adaugata!"
                    ]);
                    commit("home/ADD_CATEGORY", newType, { root: true });
                    return commit("home/SET_TOAST", toast, { root: true });
                })
                .catch(err => {
                    console.log(err);
                    const toast = setToastContent("error", rootState.home.EN, [
                        "We cannot add the category due to an error! Please try again!",
                        "Nu am putut adauga categoria din cauza unei erori de sistem! Va rugma incercati din nou!"
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
            const url = "http://localhost:3000/types";
            const deletedType = {
                lang: rootState.home.EN ? "EN" : "RO",
                type: payload.type
            };
            fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(deletedType)
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
                    commit("home/REMOVE_CATEGORY", node, { root: true });
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
