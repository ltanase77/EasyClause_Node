<template>
    <div class="col-lg-6 col-md-10 col-sm-12 m-auto">
        <h5 class="text-center mt-5">{{ text.formHeader }}</h5>
        <form novalidate="true">
            <div class="form-group">
                <label for="firstName" :class="{ invalid: $v.fname.$error }">
                    {{ text.firstNameLabel }}
                </label>
                <input
                    type="text"
                    class="form-control"
                    id="firstName"
                    name="fname"
                    @blur="$v.fname.$touch()"
                    v-model.lazy="fname"
                />
                <div class="alert alert-danger" v-show="$v.fname.$error">
                    {{ text.validation.firstName }}
                </div>
            </div>

            <div class="form-group">
                <label for="lastName" :class="{ invalid: $v.lname.$error }">
                    {{ text.lastNameLabel }}
                </label>
                <input
                    type="text"
                    class="form-control"
                    id="lastName"
                    name="lname"
                    @blur="$v.lname.$touch()"
                    v-model.lazy="lname"
                />
                <div class="alert alert-danger" v-show="$v.lname.$error">
                    {{ text.validation.lastName }}
                </div>
            </div>

            <div class="form-group">
                <label for="emailSignup" :class="{ invalid: $v.email.$error }"
                    >{{ text.emailLabel }}
                </label>
                <input
                    type="email"
                    class="form-control"
                    id="emailSignup"
                    name="email"
                    aria-describedby="emailHelp"
                    @blur="$v.email.$touch()"
                    v-model.lazy="email"
                />
                <div class="alert alert-danger" v-show="!$v.email.email">
                    {{ text.validation.email }}
                </div>
            </div>

            <div class="form-group">
                <label
                    for="passwordSignup"
                    :class="{ invalid: $v.password.$error }"
                    >{{ text.passwordLabel }}</label
                >
                <input
                    type="passwordSignup"
                    class="form-control"
                    id="password"
                    name="password"
                    @blur="$v.password.$touch()"
                    v-model.lazy="password"
                />
                <div class="alert alert-danger" v-show="$v.password.$error">
                    {{ text.validation.password }}
                </div>
            </div>

            <div class="form-group">
                <label
                    for="confirmPassword"
                    :class="{ invalid: $v.confirm.$error }"
                    >{{ text.confirmLabel }}</label
                >
                <input
                    type="password"
                    class="form-control"
                    id="confirmPassword"
                    name="password"
                    @blur="$v.confirm.$touch()"
                    v-model.lazy="confirm"
                />
                <div class="alert alert-danger" v-show="$v.confirm.$error">
                    {{ text.validation.confirm }}
                </div>
            </div>
            <button
                type="submit"
                class="btn btn-primary"
                :disabled="$v.$invalid"
                :class="{ disabled: $v.$invalid }"
                @click.prevent="submitSignupHandler"
            >
                {{ text.submitBtnLabel }}
            </button>
        </form>
    </div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

export default {
    name: "SignupForm",
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
            fname: "",
            lname: "",
            email: "",
            password: "",
            confirm: "",
            submitted: false
        };
    },
    validations: {
        fname: {
            required
        },
        lname: {
            required
        },

        email: {
            required,
            email
        },
        password: {
            required,
            minLength: minLength(6)
        },
        confirm: {
            required,
            matchPassword: sameAs("password")
        }
    },
    computed: {
        text: function() {
            if (this.showEN) {
                return {
                    formHeader: "Create an Account",
                    emailLabel: "Email Address",
                    passwordLabel: "Password",
                    confirmLabel: "Confirm Password",
                    firstNameLabel: "First Name",
                    lastNameLabel: "Last Name",
                    submitBtnLabel: "Submit",
                    closeBtnLabel: "Close",
                    authTitle: "Registration Success",
                    authMessage: "Your account has been created",
                    errorTitle: "An error has ocurred",
                    validation: {
                        firstName: "Your first name is required",
                        lastName: "Your name is rquired",
                        confirm:
                            "Your confirmed password does not match the password!",
                        email: "Please insert a valid e-mail address!",
                        password:
                            "You need to insert a password with a leas 6 characters!"
                    }
                };
            } else {
                return {
                    formHeader: "Creeaza Cont",
                    emailLabel: "Email",
                    passwordLabel: "Parolă",
                    confirmLabel: "Confirmă Parola",
                    firstNameLabel: "Prenume",
                    lastNameLabel: "Nume",
                    submitBtnLabel: "Trimite",
                    closeBtnLabel: "Închide",
                    authTitle: "Înregistrare Reușită",
                    authMessage: "Contul dumneavoastră a fost creat",
                    errorTitle: "O apărut o erroare",
                    errorMessage: "",
                    validation: {
                        firstName: "Prenumele tau trebuie completat",
                        lastName: "Numele tau trebie completat",
                        confirm:
                            "Parola confirmata nu este identica cu parola!",
                        email: "Vă rugăm introduceți o adresă de email validă!",
                        password:
                            "Trebuie să introduceți o parola cu cel putin 6 caractere!"
                    }
                };
            }
        },
        errorMessage: function() {
            switch (this.errorType) {
                case "EMAIL_EXISTS":
                    if (this.showEN) {
                        return "This email address is already in use";
                    } else {
                        return "Această adresă de email este deja folosită";
                    }
                case "TOO_MANY_ATTEMPTS_TRY_LATER":
                    if (this.showEN) {
                        return "Access was blocked because of unusual activity!";
                    } else {
                        return "Accesul a fost blocat ca urmare a unei activiăți neobișnuite!";
                    }
                default:
                    if (this.showEN) {
                        return "We are sorry! Your registration failed due to a system error!";
                    } else {
                        return "Ne pare rău! Nu v-am putut înregistra din cauza unei erori de sistem!";
                    }
            }
        }
    },
    methods: {
        submitSignupHandler() {
            const userData = {
                name: `${this.fname} ${this.lname}`,
                email: this.email,
                password: this.password,
                favorites: []
            };
            this.$store.dispatch("auth/signup", userData);
        }
    }
};
</script>

<style scoped>
.invalid {
    color: #bd5855;
}
.disabled {
    cursor: not-allowed;
}
</style>
