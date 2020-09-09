<template>
    <div class="card">
        <div class="card-body">
            <h5 v-show="showEN" class="card-title editor-title">
                {{ cardTitle }} <span class="clause-title" />
            </h5>
            <h5 v-show="showRO" class="card-title">
                {{ cardTitle }} <span class="clause-title" />
            </h5>
            <div ref="editor">
                <!--<i class="far fa-edit"> Edit</i><i class="far fa-save"> Save</i><i class="far fa-copy"> Copy</i>-->
            </div>
        </div>
        <div class="card-footer">
            <div>
                <button
                    class="btn btn-outline-secondary btn-sm btn-clip"
                    type="button"
                    @click="copyContent"
                >
                    Copy to clipboard
                </button>
                <span class="alert alert-light d-none mx-1 animated fadeIn">{{
                    messageSuccess
                }}</span>
                <span class="alert alert-danger d-none mx-1 animated fadeIn">{{
                    messageError
                }}</span>
            </div>
            <div class="members-btn">
                <button
                    v-show="isAuth"
                    class="btn btn-outline-secondary btn-sm members-btn--1"
                    type="button"
                    @click="addToFavorite"
                >
                    Add To Favorite
                </button>
                <button
                    v-show="isAuth"
                    class="btn btn-outline-secondary btn-sm members-btn--2"
                    type="button"
                    @click="saveCustomClause"
                >
                    Save Custom Clause
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            default: ""
        },
        cardTitle: {
            type: String
        },
        showEN: {
            type: Boolean
        },
        showRO: {
            type: Boolean
        },
        isAuth: {
            type: Boolean
        }
    },

    data() {
        return {
            editor: null
        };
    },
    computed: {
        messageSuccess: function() {
            if (this.showEN) {
                return "Copied!";
            } else {
                return "Copiat!";
            }
        },
        messageError: function() {
            if (this.showEN) {
                return "Not copied!";
            } else {
                return "Nu ma putut copia textul!";
            }
        }
    },
    mounted() {
        this.editor = new Quill(this.$refs.editor, {
            modules: {
                toolbar: [
                    ["bold", "italic", "underline", "strike"], // toggled buttons

                    [{ list: "ordered" }, { list: "bullet" }],
                    [{ script: "sub" }, { script: "super" }], // superscript/subscript
                    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
                    [{ direction: "rtl" }], // text direction

                    [{ color: [] }], // dropdown with defaults from theme
                    [{ font: [] }],
                    [{ align: [] }],

                    ["clean"] // remove formatting button
                ],
                history: {
                    delay: 1000,
                    maxStack: 500,
                    userOnly: true
                }
            },
            theme: "snow"
        });
    },
    methods: {
        addToFavorite(event) {
            const label = document
                .querySelector(".editor-title")
                .getAttribute("data-clause");
            const value = document
                .querySelector(".editor-title")
                .getAttribute("data-value");
            this.$store.dispatch("account/addToFavorite", { label, value });
        },
        saveCustomClause() {},
        copyContent() {
            var clipboard = new ClipboardJS(".btn-clip", {
                target: function(trigger) {
                    return trigger.parentNode.parentNode.previousElementSibling
                        .lastElementChild.firstChild;
                }
            });
            clipboard.on("success", function(e) {
                if (e.text !== "") {
                    document
                        .querySelector(".alert-light")
                        .classList.replace("fadeOut", "fadeIn");
                    document
                        .querySelector(".alert-light")
                        .classList.remove("d-none");
                    e.clearSelection();
                    setTimeout(function() {
                        document
                            .querySelector(".alert-light")
                            .classList.replace("fadeIn", "fadeOut");
                        //document.querySelector('.alert-success').classList.add('d-none');
                    }, 2000);
                }
            });
            clipboard.on("error", function(e) {
                document
                    .querySelector(".alert-danger")
                    .classList.replace("fadeOut", "fadeIn");
                document
                    .querySelector(".alert-danger")
                    .classList.remove("d-none");
                setTimeout(function() {
                    document
                        .querySelector(".alert-danger")
                        .classList.replace("fadeIn", "fadeOut");
                    //document.querySelector('.alert-danger').classList.add('d-none');
                }, 2000);
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.members-btn--1 {
    margin: 0 0.5rem;
}
.card-footer {
    display: flex;
    justify-content: space-between;
}
</style>
