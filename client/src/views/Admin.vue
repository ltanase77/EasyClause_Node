<template>
    <div class="container-fluid">
        <add-modal :showEN="getLanguage.EN" :showRO="getLanguage.RO" />
        <h3 class="text-center">Admin Dashboard</h3>
        <nav>
            <div class="nav nav-tabs" id="adminTab" role="tablist">
                <a
                    class="nav-link"
                    id="clauses-tab"
                    data-toggle="tab"
                    href="#clauses"
                    role="tab"
                    aria-controls="nav-clauses"
                    aria-selected="false"
                    >{{ text.panelTitle.clauses }}</a
                >
                <a
                    class="nav-link"
                    id="users-tab"
                    data-toggle="tab"
                    href="#users"
                    role="tab"
                    aria-controls="nav-users"
                    aria-selected="false"
                    >{{ text.panelTitle.users }}</a
                >
            </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
            <button
                class="btn btn-sm btn-outline-secondary m-1"
                data-toggle="modal"
                data-target="#addCat"
            >
                <font-awesome-icon class="icon" icon="plus" /> Add Category
            </button>
            <div
                class="tab-pane show fade active"
                id="clauses"
                role="tabpanel"
                aria-labelledby="nav-clauses-tab"
            >
                <div class="accordion" id="accordionClauses">
                    <div
                        v-for="(type, index) in types"
                        :key="index"
                        :data-category="type.category"
                        class="card"
                    >
                        <div
                            class="card-header d-flex justify-content-between align-items-center"
                            :id="'heading' + index"
                        >
                            <h2 class="mb-0">
                                <button
                                    class="btn btn-link btn-block text-left"
                                    type="button"
                                    data-toggle="collapse"
                                    :data-target="'#' + type.category"
                                    aria-expanded="true"
                                    :aria-controls="type.category"
                                >
                                    {{ type.categoryLabel }}
                                </button>
                            </h2>
                            <font-awesome-icon
                                class="float-right icon"
                                @click="removeCategory"
                                icon="trash-alt"
                            />
                        </div>
                        <div
                            :id="type.category"
                            class="collapse"
                            :aria-labelledby="'heading' + index"
                            data-parent="#accordionClauses"
                        >
                            <div class="card-body">
                                <div
                                    v-for="(clause, index) in type.clauses"
                                    :key="index"
                                >
                                    <p
                                        :data-name="clause.name"
                                        class="mb-2 font-weight-bold"
                                    >
                                        {{ clause.value }}
                                        <span class="float-right">
                                            <font-awesome-icon
                                                class="icon text-info mx-1"
                                                @click="editClause"
                                                icon="edit"
                                            />
                                            <font-awesome-icon
                                                class="icon text-danger"
                                                @click="removeClause"
                                                icon="minus-circle"
                                            />
                                        </span>
                                    </p>
                                    <div class="text-justify mb-2 p-2 content">
                                        <p
                                            v-for="(paragraph,
                                            index) in clause.content"
                                            :key="index"
                                            class="my-0"
                                        >
                                            {{ paragraph }}
                                        </p>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="tab-pane fade"
                id="users"
                role="tabpanel"
                aria-labelledby="nav-users-tab"
            >
                Users
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import AddCatModal from "./../components/AddCatModal";
import { getSVGTarget } from "./../utils/util";
export default {
    name: "Admin",
    components: {
        addModal: AddCatModal
    },
    computed: {
        ...mapGetters("home", ["getLanguage", "getClauses"]),
        ...mapGetters("admin", ["getClausesContent"]),
        text: function() {
            if (this.getLanguage.EN) {
                return {
                    panelTitle: {
                        clauses: "Clauses",
                        users: "Users"
                    }
                };
            } else {
                return {
                    panelTitle: {
                        clauses: "Clauze",
                        users: "Utilizatori"
                    }
                };
            }
        },

        types: function() {
            const result = [];
            if (this.getLanguage.EN) {
                this.getClauses.EN.forEach(element => {
                    result.push({
                        category: element.typeValue,
                        categoryLabel: element.type,
                        clauses: element.clauses.map(clause => {
                            return {
                                name: clause.name,
                                value: clause.value,
                                content: this.getClausesContent[clause.name]
                            };
                        })
                    });
                });
            } else {
                this.getClauses.RO.forEach(element => {
                    result.push({
                        category: element.typeValue,
                        categoryLabel: element.type,
                        clauses: element.clauses.map(clause => {
                            return {
                                name: clause.name,
                                value: clause.value,
                                content: this.getClausesContent[clause.name]
                            };
                        })
                    });
                });
            }
            return result;
        }
    },
    created() {
        if (this.$store.state.admin.clausesContent.length === 0) {
            this.$store.dispatch("admin/fetchClausesContent");
        }
    },
    methods: {
        removeCategory(event) {
            const svg = getSVGTarget(event.target);
            const parent = svg.parentNode.parentNode;
            const type = parent.getAttribute("data-category");
            this.$store.dispatch("admin/removeCategory", { type });
        },
        removeClause(event) {},
        editClause(event) {}
    }
};
</script>

<style lang="scss" scoped>
hr {
    background-color: green;
}
.icon {
    cursor: pointer;
}
.btn-link {
    text-decoration: none;
}
</style>
