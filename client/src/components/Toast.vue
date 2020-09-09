<template>
    <div
        v-show="showToast"
        class="toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
    >
        <div class="toast-header">
            <font-awesome-icon
                icon="exclamation-circle"
                class="list-icon mr-2"
            />
            <strong class="mr-auto">{{ toastTitle }}</strong>
            <button
                type="button"
                class="ml-2 mb-1 close"
                data-dismiss="toast"
                aria-label="Close"
                @click="hideToast"
            >
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="toast-body">
            {{ toastMessage }}
        </div>
    </div>
</template>

<script>
export default {
    name: "Toast",
    props: {
        isAuth: Boolean,
        toastTitle: String,
        toastMessage: String,
        showToast: Boolean
    },

    methods: {
        hideToast($event) {
            const toast = {
                status: false,
                title: "",
                message: ""
            };
            this.$store.commit("home/SET_TOAST", toast);
            /* const toastDiv = $event.target.parentNode.parentNode.parentNode;
            toastDiv.style.opacity = "0";
            toastDiv.style.transition = "opacity 1s"; */
        }
    }
};
</script>

<style scoped lang="scss">
.toast {
    opacity: 1;
    position: absolute;
    top: 10%;
    right: 5%;
    z-index: 10;
}
</style>
