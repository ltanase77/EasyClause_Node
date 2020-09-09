<template>
    <form class="col-md-8 col-lg-6 m-auto" novalidate="true">
        <div class="form-group">
            <label for="emailContact" :class="{ invalid: $v.email.$error }">{{
                text.emailLabel
            }}</label>
            <input
                type="email"
                class="form-control"
                id="emailContact"
                name="email"
                @blur="$v.email.$touch()"
                v-model.lazy="email"
            />
            <div class="alert alert-danger" v-show="!$v.email.email">
                Please introduce a valid e-mail address!
            </div>
            <!-- <p>{{$v}}</p> -->
        </div>
        <div class="form-group">
            <label for="name" :class="{ invalid: $v.name.$error }">{{
                text.nameLabel
            }}</label>
            <input
                type="text"
                class="form-control"
                id="name"
                name="name"
                @blur="$v.name.$touch()"
                v-model.lazy="name"
            />
            <div class="alert alert-danger" v-show="$v.name.$error">
                You need to specify your name!
            </div>
            <!--  <div class="alert alert-danger" v-show="!$v.name.alpha && $v.name.$dirty">
                Please introduce a valid name!
            </div> -->
        </div>
        <div class="form-group">
            <label for="message" :class="{ invalid: $v.name.$error }">{{
                text.textareaLabel
            }}</label>
            <textarea
                class="form-control"
                id="message"
                name="message"
                rows="3"
                @blur="$v.message.$touch()"
                v-model.lazy="message"
            >
            </textarea>
            <div class="alert alert-danger" v-show="$v.message.$error">
                You need to introduce some text!
            </div>
        </div>
        <button
            type="submit"
            :disabled="$v.$invalid"
            class="btn btn-primary"
            :class="{ disabled: $v.$invalid }"
            @click.prevent="submitFormHandler"
        >
            {{ text.btnLabel }}
        </button>
        <div
            class="alert alert-success alert-dismissible mt-2"
            v-if="submitted"
        >
            {{ text.submitSuccess }}
            <button
                type="button"
                class="close"
                data-dismiss="alert"
                aria-label="Close"
            >
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="alert alert-warning alert-dismissible mt-2" v-if="error">
            {{ text.submitError }}
            <button
                type="button"
                class="close"
                data-dismiss="alert"
                aria-label="Close"
            >
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    </form>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
export default {
    name: "ContactForm",
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
            name: "",
            message: "",
            submitted: false,
            error: false
        };
    },

    validations: {
        email: {
            required,
            email
        },
        name: {
            required
        },
        message: {
            required
        }
    },

    computed: {
        text: function() {
            if (this.showEN) {
                return {
                    emailLabel: "Email Address",
                    nameLabel: "Name",
                    textareaLabel: "Tell us what you think!",
                    btnLabel: "Submit",
                    submitSuccess: "Your message has been sent!",
                    submitError:
                        "We are sorry! An internal error prevented the tranmission of the message!"
                };
            } else {
                return {
                    emailLabel: "Email",
                    nameLabel: "Nume",
                    textareaLabel: "Spune-ne care este problema!",
                    btnLabel: "Trimite",
                    submitSuccess: "Mesajul dumneavoastra a fost transmis!",
                    submitError:
                        "Ne pare rau! O eroare de sistem a impiedicat transmiterea mesajului!"
                };
            }
        }
    },

    methods: {
        submitFormHandler() {
            const formData = {
                email: this.email,
                user: this.name,
                message: this.message
            };
            const payload = JSON.stringify(formData);
            //console.log(payload);
            fetch("https://legalserver.ro/sendgrid/mailer.php", {
                method: "POST",
                Headers: {
                    "Content-Type": "application/json"
                },
                body: payload
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    if (data.status === "OK") {
                        this.submitted = true;
                        this.email = "";
                        this.name = "";
                        this.message = "";
                        this.$v.$reset();
                    } else {
                        this.error = true;
                    }
                })
                .catch(err => {
                    this.error = true;
                });
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
