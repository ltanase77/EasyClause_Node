<template>
    <div class="main">
        <div class="card">
            <div class="card-header">
                <h3 class="text-center my-3">{{ title }}</h3>
            </div>
            <div class="card-body">
                <div v-show="getLanguage.RO" class="text m-auto text-justify">
                    <p>
                        Easy Clause este o aplicație web simplă ce ajută
                        utilizatorul la redactarea documentelor juridice, prin
                        furnizarea accesului la o colecție de clauze
                        contractuale predefinite, dintre care utilizatorul poate
                        alege în funcție de nevoile sale. La acest moment sunt
                        disponibile 27 de clauze, atât în limba română, cât și
                        în limba engleză, grupate în 8 categorii diferite.
                    </p>
                    <p>
                        Easy Clause este integrată cu aplicația Microsoft Office
                        Word putând fi instalată, fără costuri, ca o extensie a
                        acesteia prin intermdediul
                        <a
                            href="https://appsource.microsoft.com/ro-ro/product/office/WA200001066?src=office&tab=Overview"
                        >
                            Office Store</a
                        >, rezultând o utilizare eficientă și facilă a
                        conținutul pus la dispoziție de Easy Clause direct în
                        cadrul aplicațiaiei Word.
                    </p>
                    <p>
                        Aplicația a luat naștere din dorința de a explora
                        diverse modalități de a automatiza și/sau eficientiza
                        diverse procese din activitatea juridică, testând în
                        același timp diverse tehnologii de implementare a
                        aplicației, modul de utilizare/structurare a diverselor
                        date/informațiilor ce se folosesc în mod repetitiv în
                        activitatea de redactare a contractelor, și nu în
                        ultimul rând abilitățile noastre, nou obținute, de a
                        dezvolta produse software.
                    </p>
                    <p>
                        Easy Clause face parte împreună cu
                        <a href="https://www.easyconsult.ro">Easy Consult</a> și
                        <a href="https://legserver.ro">Monitor Dosare</a>
                        dintr-un efort mai amplu de a testa diverse moduri în
                        care tehnologiile web pot îmbunătăți anumite procese din
                        cadrul activității juridice.
                    </p>
                    <p>
                        Sperăm că veți găsi utilă această aplicație și o veți
                        folosi cu plăcere. Dacă aveți sugestii vă rugăm folosiți
                        pagina noastră de <a href="/contact">Contact</a>.
                    </p>
                </div>
                <div v-show="getLanguage.EN" class="text m-auto text-justify">
                    <p>
                        Easy Clause is a small web app that helps the user to
                        draft their legal documents by providing easy access to
                        a library of predefined contractual clauses from which
                        the user can choose depending on his/her needs.Currently
                        there are available 32 clauses, both in English and
                        Romanian, grouped in 10 different categories.
                    </p>
                    <p>
                        Easy Clause is fully integrated with Microsoft Office
                        Word, being possible to be installed, free of charge, as
                        an extension of such application from within the
                        <a
                            href="https://appsource.microsoft.com/ro-ro/product/office/WA200001066?src=office&tab=Overview"
                        >
                            Office Store</a
                        >, an efficent and easy use of the content provided by
                        Easy Clause directly in the Word application.
                    </p>
                    <p>
                        Easy Clause resulted from our desire to explore various
                        methods of automatization and/or improving the
                        efficiency of various processes from the legal field,
                        testing several technologies for implementing the
                        application, the way of structuring the data that is
                        repetitively used for drafting legal contracts, and last
                        but not least our newly acquired skills of software
                        development.
                    </p>
                    <p>
                        Easy Clause is part, togheter with
                        <a href="https://www.easyconsult.ro" target="_blank">
                            Easy Consult</a
                        >
                        and
                        <a href="https://legserv.ro" target="_blank"
                            >Monitor Dosare</a
                        >
                        from a larger project of testing diverse ways of how web
                        technology may improve processes involved by the legal
                        activity.
                    </p>
                    <p>
                        We hope that you will find useful such application and
                        you will enjoy using it. If you have any suggestion to
                        make, please use our
                        <a href="/contact">Contact</a> page.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
    name: "About",
    components: {},
    data() {
        return {};
    },
    computed: {
        ...mapGetters("home", ["getLanguage"]),
        ...mapGetters("auth", ["isAuth"]),
        title: function() {
            if (this.getLanguage.EN) {
                return "About";
            } else {
                return "Despre";
            }
        }
    }
};
</script>

<style scoped lang="scss">
.main {
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
.spacer {
    flex: 1;
}
.text {
    width: 75%;
}
@media (max-width: 600px) {
    .text {
        width: 90%;
    }
}
</style>
