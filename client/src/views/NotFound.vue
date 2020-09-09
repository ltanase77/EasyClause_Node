<template>
    <div class="main">
        <div class="card">
            <div class="card-header">
                <h3 class="text-center">{{ text.title }}</h3>
            </div>
            <div class="card-body">
                <h5 class="text-center">{{ text.message }}</h5>
                <router-link
                    :to="{ name: 'home' }"
                    class="btn btn-outline-primary m-auto"
                    >{{ text.link }}</router-link
                >
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name: "NotFound",
    computed: {
        ...mapGetters("home", ["getLanguage"]),
        text: function() {
            return this.getLanguage.EN
                ? {
                      title: "Page was not found!",
                      message:
                          "It seems that the page that you are looking for does not exist",
                      link: "Back to homepage"
                  }
                : {
                      title: "Pagina nu a fost găsită",
                      message: "Se pare că pagina pe care o cauți nu există",
                      link: "Înapoi la pagina principală"
                  };
        }
    }
};
</script>

<style lang="scss" scoped></style>
