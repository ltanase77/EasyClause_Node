<template>
    <div class="main">
        <app-intro
            :welcome="text.welcome"
            :lang-text="text.chooseLang"
            :btn-text="text.langBtn"
            :intro-text="text.intro"
        />
        <app-select
            :showEN="getLanguage.EN"
            :showRO="getLanguage.RO"
            :clausesEN="getClauses.EN"
            :clausesRO="getClauses.RO"
        />
        <app-clauses
            :showEN="getLanguage.EN"
            :showRO="getLanguage.RO"
            :buttons="getButtons"
            :clausesEN="getClauses.EN"
            :clausesRO="getClauses.RO"
            @insert="insertClause"
        />
        <app-editor
            :showEN="getLanguage.EN"
            :showRO="getLanguage.RO"
            :isAuth="isAuth"
            :card-title="text.cardTitle"
        />
    </div>
</template>

<script>
// @ is an alias to /src
//import { eventBus } from "./../main";
import { mapGetters } from "vuex";
import Intro from "../components/Intro.vue";
import SelectClause from "../components/SelectClause.vue";
import Clauses from "../components/Clauses.vue";
import Editor from "../components/Editor.vue";

export default {
    name: "Home",
    components: {
        appIntro: Intro,
        appSelect: SelectClause,
        appClauses: Clauses,
        appEditor: Editor
    },
    data() {
        return {};
    },
    computed: {
        ...mapGetters("home", [
            "getLanguage",
            "getClauses",
            "getClauseContent",
            "getButtons"
        ]),
        ...mapGetters("auth", ["isAuth"]),
        text: function() {
            if (this.getLanguage.EN) {
                return {
                    welcome: "Welcome to EasyClause",
                    chooseLang: "Choose your language:",
                    langBtn: ["English", "Romanian"],
                    intro: [
                        "Easy Clause provides the user with access to predefined contractual clauses.",
                        "You can use it directly in your Word documents as an Office Word Add-In"
                    ],
                    cardTitle: "Clause Text:"
                };
            } else {
                return {
                    welcome: "Bine ați venit la EasyClause",
                    chooseLang: "Alegeți limba",
                    langBtn: ["Engleză", "Română"],
                    intro: [
                        "Easy Clause permite accesul utilizatorilor la clauze contractuale predefinite.",
                        "O poți folosi direct în documentele tale Word ca o Extensie Office Word"
                    ],
                    cardTitle: "Textul Clauzei:"
                };
            }
        }
    },
    created() {
        if (this.getClauses.EN.length === 0) {
            this.$store.dispatch("home/fetchClausesType");
        }
        /* if (Object.keys(this.getClausesContent).length === 0) {
            this.$store.dispatch("home/fetchClausesContent");
        } */
    },

    methods: {
        insertClause(clause) {
            const clauseBox = document.querySelector(".ql-editor");
            clauseBox.textContent = "";
            /* const clauses = this.getClausesContent;
            const clauseContent = clauses.filter(
                item => item.name === clause.label
            ); */
            this.$store
                .dispatch("home/fetchClauseContent", clause)
                .then(response => {
                    //console.log(response);
                    response.content.forEach(paragraph => {
                        clauseBox.innerHTML += `<p class="text animated slideInDown">${paragraph}</p>`;
                    });
                    const elem = document.querySelector(".editor-title");
                    elem.setAttribute("data-clause", clause.label);
                    elem.setAttribute("data-value", clause.value);
                });
            //console.log(clauseContent);
        }
    }
};
</script>

<style scoped lang="scss"></style>
