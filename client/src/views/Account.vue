<template>
    <div class="main">
        <app-dashboard></app-dashboard>
    </div>
</template>
<script>
//import { eventBus } from "./../main";
import { mapGetters } from "vuex";
import Dashboard from "../components/Dashboard.vue";
export default {
    name: "Home",
    components: {
        appDashboard: Dashboard
    },
    data() {
        return {};
    },
    computed: {
        ...mapGetters("home", ["getLanguage"]),
        ...mapGetters("auth", ["isAuth"])
    }
};
</script>

<style scoped lang="scss"></style>
