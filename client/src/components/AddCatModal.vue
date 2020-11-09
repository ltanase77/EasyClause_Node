<template>
    <div
        class="modal fade"
        id="addCat"
        tabindex="-1"
        role="dialog"
        aria-labelledby="addCatLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                        {{ text.formHeader }}
                    </h5>
                    <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form novalidate="true">
                        <div class="form-group">
                            <label
                                for="type"
                                :class="{ invalid: $v.type.$error }"
                                >{{ text.typeLabel }}</label
                            >
                            <input
                                type="text"
                                class="form-control"
                                id="categoryName"
                                name="type"
                                aria-describedby="emailHelp"
                                @blur="$v.type.$touch()"
                                v-model.lazy="type"
                            />
                            <div
                                class="alert alert-danger"
                                v-show="$v.type.$error"
                            >
                                {{ text.validation.type }}
                            </div>
                        </div>

                        <div class="form-group">
                            <label
                                for="type"
                                :class="{ invalid: $v.id.$error }"
                                >{{ text.idLabel }}</label
                            >
                            <input
                                type="text"
                                class="form-control"
                                id="categoryType"
                                name="type"
                                @blur="$v.id.$touch()"
                                v-model.lazy="id"
                            />
                            <div
                                class="alert alert-danger"
                                v-show="$v.id.$error"
                            >
                                {{ text.validation.id }}
                            </div>
                        </div>
                        <button
                            type="submit"
                            class="btn btn-primary"
                            :disabled="$v.$invalid"
                            :class="{ disabled: $v.$invalid }"
                            @click.prevent="addCategoryHandler"
                        >
                            {{ text.submitBtnLabel }}
                        </button>
                    </form>
                </div>
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                    >
                        {{ text.closeBtnLabel }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
    name: "AddCatModal",
    props: {
        showEN: {
            type: Boolean
        },
        showRO: {
            type: Boolean
        }
    },
    data() {
        return {
            type: "",
            id: "",
            submitted: false
        };
    },
    validations: {
        type: {
            required
        },
        id: {
            required
        }
    },
    computed: {
        text: function() {
            if (this.showEN) {
                return {
                    formHeader: "Add a Category",
                    typeLabel: "Category Type",
                    idLabel: "Identifier",
                    submitBtnLabel: "Submit",
                    closeBtnLabel: "Close",
                    validation: {
                        type: "Please introduce  a name for the category!",
                        id: "Please intoduce identifier (lowercase letters)"
                    }
                };
            } else {
                return {
                    formHeader: "Adaugă Categorie",
                    typeLabel: "Tipul Categoriei",
                    idLabel: "Identificator",
                    submitBtnLabel: "Trimite",
                    closeBtnLabel: "Închide",
                    validation: {
                        type: "Trebuie să introduceți un nume pentru categorie",
                        id:
                            "Trebuie sa introduceți un ientificator (litere mici)"
                    }
                };
            }
        }
    },
    methods: {
        hideModal() {
            const modal = document.querySelector("#addCat");
            const modalBackdrop = document.querySelector(".modal-backdrop");
            modal.style.display = "none";
            modalBackdrop.style.display = "none";
        },

        addCategoryHandler() {
            const category = {
                type: this.type,
                identifier: this.id
            };
            this.$store.dispatch("admin/addCategory", category);
            this.hideModal();
        }
    }
};
</script>

<style lang="scss" scoped>
.invalid {
    color: #bd5855;
}
.disabled {
    cursor: not-allowed;
}
</style>
