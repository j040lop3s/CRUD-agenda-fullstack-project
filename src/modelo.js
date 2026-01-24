class Lembrete {
    #nome;#data;#id;

    constructor(nome,data) {
        this.#id = String(Date.now());
        this.nome = nome;
        this.data = data;
    }

    set nome(n) {
        if (!n || n.trim() === "") {
            throw new Error("Preencha o campo vazio!");
        }
        this.#nome = n;
    }

    get nome() {
        return this.#nome;
    }

    set data(d) {
        const dataLembrete = new Date(d + "T12:00:00Z");
        const dataHoje = new Date();
        dataHoje.setHours(0, 0, 0, 0);

        if (isNaN(dataLembrete.getTime()) || dataLembrete <= dataHoje) {
            throw new Error("Data não preenchida ou inválida (no passado)");
        }

        this.#data = dataLembrete;
    }

    get data() {
        return this.#data;
    }

    get id() {
        return this.#id;
    }

};

export default Lembrete;