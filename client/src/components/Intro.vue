<template>
    <div class="intro">
        <div class="page-header">
            <h1 class="text-center">{{ welcome }}</h1>
        </div>
        <div class="lang">
            <h2>{{ langText }}</h2>
            <div>
                <button type="button" class="btn-lang" @click="changeEN">
                    {{ btnText[0] }}
                </button>
                <button type="button" class="btn-lang" @click="changeRO">
                    {{ btnText[1] }}
                </button>
            </div>
        </div>
        <div class="jum">
            <p>{{ introText[0] }}</p>
            <p>{{ introText[1] }}</p>
            <div class="action mt-2">
                <a
                    class="btn btn-sm btn-outline-secondary"
                    href="https://appsource.microsoft.com/ro-ro/product/office/WA200001066?src=office&tab=Overview"
                    target="_blank"
                >
                    Check Here!
                    <img src="/img/word_48.png" width="24" height="24" />
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        welcome: {
            type: String
        },
        langText: {
            type: String
        },
        btnText: {
            type: Array
        },
        introText: {
            type: Array
        }
    },
    methods: {
        changeEN() {
            this.$store.commit("home/SET_LANGUAGE", "EN");
        },
        changeRO() {
            this.$store.commit("home/SET_LANGUAGE", "RO");
        }
    }
};
</script>

<style scoped lang="scss">
.page-header {
    margin: 20px 0 10px;
    border-bottom: 1px solid #eee;

    h1 {
        font-size: 20px;
        text-align: center;
        padding-bottom: 10px;
        color: #00188f;
        text-shadow: 2px 2px 4px rgba(0, 0, 128, 0.5);
    }
}
.intro {
    line-height: 1.2rem;
}
.lang {
    width: 90%;
    margin: 0 auto;
    display: block;
    overflow: auto;

    h2 {
        font-size: 18px;
        text-align: center;
        padding: 10px 0;
        color: #00188f;
    }
    div {
        display: flex;
        padding: 2%;
        width: 90%;
        margin: 0 auto;
        /*overflow: auto;*/
    }
    .btn-lang {
        flex: 1;
        margin-right: 1px;
        padding: 4px 0;
        border-radius: 5px 10px;
        border: 1px solid rebeccapurple;
        font-family: "Artifika", serif;
        background-color: #faf1fc;
        color: #00188f;
        cursor: pointer;

        &:hover {
            color: white;
            background-color: #0078d7;
        }
    }
}
.jum {
    text-align: center;
    padding: 10px 0;
    background-color: ghostwhite;
    margin-top: 10px;
    border: 1px solid #dfd1ef;
    border-radius: 0.5rem 0.5rem;

    p {
        color: #5c005c;
        margin: 0 auto;
        padding: 0.2rem;
    }
    .btn-outline-secondary {
        color: #00188f;
    }
    .action a {
        border-color: #00188f;
    }
    .action a:hover {
        background-color: #ab76e9;
        color: white;
    }
}

@media (max-width: 600px) {
    .jum p {
        font-size: 0.8rem;
    }
}
</style>
