<template>
    <div class="main">
        <div class="card">
            <div class="card-header">
                <h3 class="text-center my-3">{{ title }}</h3>
            </div>
            <div class="card-body">
                <contact-form
                    :showEN="getLanguage.EN"
                    :showRO="getLanguage.RO"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
//import { eventBus } from "./../main";
import ContactForm from "../components/ContactForm.vue";
export default {
    name: "Contact",
    components: {
        contactForm: ContactForm
    },
    data() {
        return {};
    },

    computed: {
        ...mapGetters("home", ["getLanguage"]),
        ...mapGetters("auth", ["isAuth"]),
        title: function() {
            if (this.getLanguage.EN) {
                return "Contact Us";
            } else {
                return "Contactati-ne";
            }
        }
    }
};
</script>

<style scoped lang="scss"></style>
