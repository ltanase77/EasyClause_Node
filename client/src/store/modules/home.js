import { setToastContent } from "../../utils/util";
export default {
    state: {
        EN: false,
        RO: true,
        toast: {
            status: false,
            message: "",
            title: ""
        },
        clausesEN: [],
        clausesRO: [],
        clausesContent: [],
        showButtons: {
            arbitration: false,
            confidentiality: false,
            court: false,
            indemnification: false,
            ip: false,
            limitation: false,
            liability: false,
            miscellanous: false,
            representations: false,
            force: false,
            assignment: false,
            termination: false,
            favorites: false
        }
    },

    getters: {
        getClauses(state) {
            return {
                EN: state.clausesEN,
                RO: state.clausesRO
            };
        },
        getClausesContent(state) {
            return state.clausesContent;
        },
        getLanguage(state) {
            return {
                EN: state.EN,
                RO: state.RO
            };
        },
        getToast(state) {
            return state.toast;
        },
        getButtons(state) {
            return state.showButtons;
        }
    },

    mutations: {
        HIDE_TOAST(state) {
            if (state.toast.status === true) {
                state.toast.status = false;
            }
        },
        SET_TOAST(state, payload) {
            state.toast.status = payload.status;
            state.toast.message = payload.message;
            state.toast.title = payload.title;
        },
        SET_CLAUSES_TYPE(state, clausesType) {
            state.clausesEN = clausesType[0].EN;
            state.clausesRO = clausesType[1].RO;
        },
        SET_CLAUSES_CONTENT(state, payload) {
            state.clausesContent = payload;
        },

        SET_LANGUAGE(state, payload) {
            if (payload === "EN") {
                state.EN = true;
                state.RO = false;
            }
            if (payload === "RO") {
                state.EN = false;
                state.RO = true;
            }
        },

        DISPLAY_BUTTONS(state, value) {
            for (const item in state.showButtons) {
                if (item === value) {
                    state.showButtons[value] = true;
                } else {
                    state.showButtons[item] = false;
                }
            }
        }
    },

    actions: {
        fetchClausesType({ commit, state }) {
            fetch(
                "http://localhost:3000/types" /*"https://easy-clause.firebaseio.com/clauses-type.json"*/
            )
                .then(function(response) {
                    return response.json();
                })
                .then(function(result) {
                    console.log(result);
                    if (result.error) {
                        const error = setToastContent("error", state.EN, [
                            "We are sorry! We cannot initialize the app!",
                            "Ne pare rău! Nu putem inițaliza aplicația!"
                        ]);
                        return commit("SET_TOAST", error);
                    }
                    commit("SET_CLAUSES_TYPE", result);
                })
                .catch(function(error) {
                    console.log(error);
                });
        },

        fetchClausesContent({ commit, state }, payload) {
            return fetch(
                "http://localhost:3000/clauses/" +
                    payload.label /*"https://easy-clause.firebaseio.com/clauses-content.json"*/
            )
                .then(function(response) {
                    return response.json();
                })
                .then(function(result) {
                    if (result.error) {
                        const error = setToastContent("error", state.EN, [
                            "We are sorry! We cannot initialize the app!",
                            "Ne pare rău! Nu putem inițaliza aplicația!"
                        ]);
                        return commit("SET_TOAST", error);
                    }
                    //commit("SET_CLAUSES_CONTENT", result);
                    //console.log(result);
                    return result;
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }
};
