<template>
    <div class="main">
        <app-signup :showEN="getLanguage.EN" :showRO="getLanguage.RO" />
    </div>
</template>

<script>
//import { eventBus } from "./../main";
import { mapGetters } from "vuex";
import SignupForm from "../components/SignupForm.vue";

export default {
    name: "Signup",
    components: {
        appSignup: SignupForm
    },
    data() {
        return {};
    },
    computed: {
        ...mapGetters("home", ["getLanguage"])
    }
};
</script>

<style scoped lang="scss"></style>
