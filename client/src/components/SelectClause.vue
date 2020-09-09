<template>
    <div class="clauses">
        <select v-if="showEN" class="form-control" @change="displayButtons">
            <option>Select Clause</option>
            <option v-if="isAuth" value="favorites">Favorites</option>
            <option
                v-for="(clause, index) in clausesEN"
                :key="index"
                :value="clause.typeValue"
            >
                {{ clause.type }}
            </option>
        </select>
        <select v-if="showRO" class="form-control" @change="displayButtons">
            <option>Selectați Clauza</option>
            <option v-if="isAuth" value="favorites">Favorite</option>
            <option
                v-for="(clause, index) in clausesRO"
                :key="index"
                :value="clause.typeValue"
            >
                {{ clause.type }}
            </option>
        </select>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name: "SelectClause",
    props: {
        showEN: {
            type: Boolean
        },
        showRO: {
            type: Boolean
        },
        clausesEN: {
            type: Array
        },
        clausesRO: {
            type: Array
        }
    },
    computed: {
        ...mapGetters("auth", ["isAuth"])
    },
    methods: {
        displayButtons($event) {
            this.$store.commit("home/DISPLAY_BUTTONS", $event.target.value);
        }
    }
};
</script>

<style lang="scss" scoped>
.clauses {
    margin: 10px 0;
}
</style>
