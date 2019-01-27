new Vue({
    el: "#app",
    data: {
        clausesEN: [],
        clausesRO: [],
        fetchError: "",
        showEN: true,
        showRO: false,
        showButtons: {
            arbitration: false,
            confidentiality: false,
            court: false,
            indemnification: false,
            ip: false,
            limitation: false,
            liability: false,
            miscellanous: false,
            representations: false,
        }


    },
    created() {
        const vm = this;
        fetch('json/clauses_type.json').then(function(response) {
            let result = response.json();
            result.then(function(obj) {
                vm.clausesEN = obj.EN;
                vm.clausesRO = obj.RO;
            });
        }).catch(function(error) {
            this.fetchError = error.message;
        });
    },

    computed: {
        welcomeText: function() {
            if (this.showEN) {
                return "Welcome to EasyClause Panel";
            }
            if (this.showRO) {
                return "Bine ați venit la Panoul de Clauze ";
            }
        },
        langBtnText: function() {
            if (this.showEN) {
                return ["English", "Romanian"];
            }
            if (this.showRO) {
                return ["Engleză", "Română"];
            }
        },
        langText: function() {
            if (this.showEN) {
                return "Choose your language:";
            }
            if (this.showRO) {
                return "Alegeți limba";
            }
        },
        introText: function() {
            if (this.showEN) {
                return "This panel helps the user to insert predefined clauses in their Words documents";
            }
            if (this.showRO) {
                return "Acest panou ajută utilizatorii să insereze clauze predefinite în documentele lor Word.";
            }
        },
        cardTitle: function() {
            if (this.showEN) {
                return "Clause:";
            }
            if (this.showRO) {
                return "Clauză:";
            }
        }
    },
    methods: {
        changeEN: function(event) {
            this.showEN = true;
            this.showRO = false;
        },
        changeRO: function(event) {
            this.showRO = true;
            this.showEN = false;
        },

        displayButtons: function(event) {
            let type = event.target.value;
            for (let item in this.showButtons) {
                if (item === type) {
                    this.showButtons[type] = true;
                } else {
                    this.showButtons[item] = false;
                }
            }
        },

        getData: function() {
            return fetch('json/clauses_array.json').then(function(response) {
                return response.json();
            }).catch(function(error) {
                return error.message;
            });
        },

        insertClause: function(event) {
            const clauseLabel = event.target.getAttribute('data-clause');
            this.getData().then(function(data) {
                const clauseTitle =  document.querySelector('.clause-title');
                clauseTitle.textContent = event.target.textContent;
                const clauseBox = document.querySelector('.ql-editor');
                clauseBox.textContent = '';
                data[clauseLabel].forEach(function(elem) {
                    clauseBox.innerHTML += `<p class="text">${elem}</p>`;
                })

            }).catch(function(error) {
                document.querySelector('.ql-editor').textContent = error;
            });
        }
    }
});

