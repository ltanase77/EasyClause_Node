<template>
    <div>
        <div v-show="showEN" class="EN">
            <div class="buttons">
                <section
                    v-for="(clause, index) in clausesEN"
                    v-show="buttons[clause.typeValue]"
                    :key="index"
                    class="card"
                    :data-clause-type="clause.typeValue"
                >
                    <div class="card-body">
                        <p class="card-text">
                            Choose one of the
                            {{ clause.type.toLowerCase() }} clauses:
                        </p>
                        <div class="row animated slideInUp">
                            <button
                                v-for="(item, index) in clause.clauses"
                                :key="index"
                                :data-clause="item.name"
                                class="btn btn-outline-dark btn-sm col-md-6 col-lg-4"
                                @click="insertClause"
                            >
                                {{ item.value }}
                            </button>
                        </div>
                    </div>
                </section>
                <section v-show="buttons.favorites">
                    <div class="card-body">
                        <p class="card-text">Your favorites clauses</p>
                        <div class="row animated slideInUp">
                            <button
                                v-for="(item, index) in getUser.favorites"
                                :key="index"
                                :data-clause="item.label"
                                class="btn btn-outline-dark btn-sm col-md-6 col-lg-4"
                                @click="insertClause"
                            >
                                {{ item.value }}
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <div v-show="showRO" class="RO">
            <div class="buttons">
                <section
                    v-for="(clause, index) in clausesRO"
                    v-show="buttons[clause.typeValue]"
                    :key="index"
                    class="card"
                    :data-clause-type="clause.typeValue"
                >
                    <div class="card-body">
                        <p class="card-text">
                            Alegeți una dintre următoarele clauze de
                            {{ clause.type.toLowerCase() }}:
                        </p>
                        <div class="row animated slideInUp">
                            <button
                                v-for="(item, index) in clause.clauses"
                                :key="index"
                                :data-clause="item.name"
                                class="btn btn-outline-dark btn-sm col-md-6 col-lg-4"
                                @click="insertClause"
                            >
                                {{ item.value }}
                            </button>
                        </div>
                    </div>
                </section>
                <section v-show="buttons.favorites">
                    <div class="card-body">
                        <p class="card-text">Clauzele tale favorite</p>
                        <div class="row animated slideInUp">
                            <button
                                v-for="(item, index) in getUser.favorites"
                                :key="index"
                                :data-clause="item.label"
                                class="btn btn-outline-dark btn-sm col-md-6 col-lg-4"
                                @click="insertClause"
                            >
                                {{ item.value }}
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    props: {
        showEN: {
            type: Boolean
        },
        showRO: {
            type: Boolean
        },
        buttons: {
            type: Object
        },
        clausesEN: {
            type: Array
        },
        clausesRO: {
            type: Array
        }
    },
    computed: {
        ...mapGetters("auth", ["getUser"])
    },
    methods: {
        insertClause($event) {
            const clause = {
                label: $event.target.getAttribute("data-clause"),
                value: $event.target.textContent
            };
            this.$emit("insert", clause);
        }
    }
};
</script>

<style lang="scss" scoped>
.btn-outline-dark:hover {
    color: #fff;
    background-color: #1a9ddc;
    border-color: #343a40;
}
.btn-outline-dark:focus {
    box-shadow: 0 0 0 0.2rem rgba(26, 157, 220, 0.5);
}
</style>
