<template>
    <div class="container-fluid">
        <p>
            {{ text.greeting }} <span>{{ getUser.name }}</span>
        </p>
        <div class="row">
            <div class="card col-md-6">
                <h4 class="card-title text-center">{{ text.favTitle }}</h4>
                <ul v-if="getUser.favorites" class="list-group">
                    <li
                        v-for="(fav, index) in getUser.favorites"
                        :key="index"
                        :data-label="fav.label"
                        class="list-group-item"
                    >
                        {{ fav.value }}

                        <font-awesome-icon
                            class="float-right icon"
                            @click="deleteFavorite"
                            icon="trash-alt"
                        />
                    </li>
                </ul>
            </div>
            <div class="card col-md-6">
                <h4 class="card-title text-center">{{ text.customTitle }}</h4>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name: "Account",
    data() {
        return {};
    },

    computed: {
        ...mapGetters("home", ["getLanguage"]),
        ...mapGetters("auth", ["getUser"]),

        text: function() {
            if (this.getLanguage.EN) {
                return {
                    greeting: "Welcome",
                    favTitle:
                        this.getUser.favorites.length === 0
                            ? "You do not have any favorite clause yet!"
                            : "Your favorites clauses",
                    customTitle:
                        this.getUser.favorites.length === 0
                            ? "You do not have any custom clause yet!"
                            : "Your custom clauses"
                };
            } else {
                return {
                    greeting: "Bine ai venit",
                    favTitle:
                        this.getUser.favorites.length === 0
                            ? "Nu ai nici o clauză favorită"
                            : "Clauzele tale favorite",
                    customTitle:
                        this.getUser.favorites.length === 0
                            ? "Nu ai nici o clauză personalizată"
                            : "Clauzele tale personalizate"
                };
            }
        }
    },
    methods: {
        deleteFavorite(event) {
            const parent = event.target.parentNode.parentNode;
            const clause = parent.getAttribute("data-label");
            this.$store.dispatch("account/deleteFavorite", clause);
        }
    }
};
</script>

<style scoped>
.icon {
    cursor: pointer;
}

.card {
    border: none;
}
</style>
