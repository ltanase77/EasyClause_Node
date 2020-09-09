<template>
    <div
        class="modal fade"
        id="loginModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="loginFormLabel"
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
                                for="emailLogin"
                                :class="{ invalid: $v.email.$error }"
                                >{{ text.emailLabel }}</label
                            >
                            <input
                                type="email"
                                class="form-control"
                                id="emailLogin"
                                name="email"
                                aria-describedby="emailHelp"
                                @blur="$v.email.$touch()"
                                v-model.lazy="email"
                            />
                            <div
                                class="alert alert-danger"
                                v-show="!$v.email.email"
                            >
                                {{ text.validation.email }}
                            </div>
                        </div>

                        <div class="form-group">
                            <label
                                for="passwordLogin"
                                :class="{ invalid: $v.password.$error }"
                                >{{ text.passwordLabel }}</label
                            >
                            <input
                                type="password"
                                class="form-control"
                                id="passwordLogin"
                                name="password"
                                @blur="$v.password.$touch()"
                                v-model.lazy="password"
                            />
                            <div
                                class="alert alert-danger"
                                v-show="$v.password.$error"
                            >
                                {{ text.validation.password }}
                            </div>
                        </div>
                        <button
                            type="submit"
                            class="btn btn-primary"
                            :disabled="$v.$invalid"
                            :class="{ disabled: $v.$invalid }"
                            @click.prevent="submitLoginHandler"
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
//import { eventBus } from "./../main";
import { required, email } from "vuelidate/lib/validators";
//import { mapMutations } from "vuex";
export default {
    name: "LoginModal",
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
            email: "",
            password: "",
            submitted: false,
            isSignin: false,
            isError: false,
            errorType: ""
        };
    },
    validations: {
        email: {
            required,
            email
        },
        password: {
            required
        }
    },
    computed: {
        text: function() {
            if (this.showEN) {
                return {
                    formHeader: "Sign In",
                    emailLabel: "Email Address",
                    passwordLabel: "Password",
                    submitBtnLabel: "Submit",
                    closeBtnLabel: "Close",
                    validation: {
                        email: "Please introduce  a valid e-mail address!",
                        password: "You need to insert your password!"
                    }
                };
            } else {
                return {
                    formHeader: "Accesează Contul",
                    emailLabel: "Email",
                    passwordLabel: "Parolă",
                    submitBtnLabel: "Trimite",
                    closeBtnLabel: "Închide",
                    validation: {
                        email: "Vă rugăm introduceți o adresă de email validă!",
                        password: "Trebuie să introduceți parola"
                    }
                };
            }
        }
    },
    methods: {
        //...mapMutations(["userIsAuth", "setToast"]),
        hideModal() {
            const modal = document.querySelector("#loginModal");
            const modalBackdrop = document.querySelector(".modal-backdrop");
            modal.style.display = "none";
            modalBackdrop.style.display = "none";
        },

        submitLoginHandler() {
            const userData = {
                email: this.email,
                password: this.password
            };
            this.hideModal();
            this.$store.dispatch("auth/login", userData);
        }
    }
};
</script>

<style scoped lang="scss">
.invalid {
    color: #bd5855;
}
.disabled {
    cursor: not-allowed;
}
</style>
