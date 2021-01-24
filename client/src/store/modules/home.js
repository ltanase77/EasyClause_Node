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
        clauseContent: {},
        Buttons: {}
    },

    getters: {
        getClauses(state) {
            return {
                EN: state.clausesEN,
                RO: state.clausesRO
            };
        },
        getClauseContent(state) {
            return state.clauseContent;
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
            return state.Buttons;
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
            state.clausesEN = clausesType[0].content;
            state.clausesRO = clausesType[1].content;
        },
        SET_CLAUSE_CONTENT(state, payload) {
            state.clauseContent = payload;
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

        SET_BUTTONS(state, payload) {
            state.Buttons = payload;
        },

        DISPLAY_BUTTONS(state, value) {
            for (const item in state.Buttons) {
                if (item === value) {
                    state.Buttons[value] = true;
                } else {
                    state.Buttons[item] = false;
                }
            }
        },
        ADD_CATEGORY(state, payload) {
            payload.clauses = [];
            if (state.EN) {
                state.clausesEN.push(payload);
            } else {
                state.clausesRO.push(payload);
            }
        },

        REMOVE_CATEGORY(state, index) {
            if (state.EN) {
                state.clausesEN.splice(index, 1);
            } else {
                state.clausesRO.splice(index, 1);
            }
        }
    },

    actions: {
        async fetchClausesType({ commit, state }) {
            try {
                const response = await fetch(
                    "http://localhost:3000/types" /*"https://easy-clause.firebaseio.com/clauses-type.json"*/
                );
                if (response.status !== 200) {
                    throw new Error();
                }
                const data = await response.json();
                console.log(data);
                const types = data[0].content.map(item => {
                    return item.typeValue;
                });
                let buttons = {};
                types.forEach(type => {
                    buttons[type] = false;
                });
                buttons.favorites = false;
                commit("SET_BUTTONS", buttons);
                commit("SET_CLAUSES_TYPE", data);
            } catch (err) {
                const error = setToastContent("error", state.EN, [
                    "We are sorry! We cannot initialize the app!",
                    "Ne pare rău! Nu putem inițaliza aplicația!"
                ]);
                return commit("SET_TOAST", error);
            }
        },

        async fetchClauseContent({ commit, state }, payload) {
            try {
                const response = await fetch(
                    `http://localhost:3000/clauses/${payload.label}`
                );
                if (response.status !== 200) {
                    throw new Error();
                }
                const clause = await response.json();
                commit("SET_CLAUSE_CONTENT", clause);
                return clause;
            } catch (err) {
                const error = setToastContent("error", state.EN, [
                    "We are sorry! We cannot get the requested content!",
                    "Ne pare rău! Nu putem afisa continutul solicitat!"
                ]);
                return commit("SET_TOAST", error);
            }
        }
    }
};
