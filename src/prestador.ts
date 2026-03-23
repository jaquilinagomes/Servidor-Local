
class Prestador {
    nome: string
    precoHora: number
    profissao: string
    minimoParaDesconto: number
    percentagemDesconto: number
    taxaUrgencia: number

    constructor(nomeDoPrestador: string,
        precoHoraDoPrestador: number,
        profissaoDoPrestador: string,
        minimoParaDescontoDoPrestador: number,
        percentagemDescontoDoPrestador: number,
        taxaUrgenciaDoPrestador: number
    ) {
        this.nome = nomeDoPrestador
        this.precoHora = precoHoraDoPrestador
        this.profissao = profissaoDoPrestador
        this.minimoParaDesconto = minimoParaDescontoDoPrestador
        this.percentagemDesconto = percentagemDescontoDoPrestador
        this.taxaUrgencia = taxaUrgenciaDoPrestador
    }

    alterarPrecoHora(novoPrecoHora: number) {
        this.precoHora = novoPrecoHora
    }

    alterarNome(novoNome: string) {
        this.nome = novoNome
    }
}

const prestador1 = new Prestador(
    "Jaquilina",
    100,
    "Desenvolvidor de Software",
    1000,
    0.1,
    0.3
)

console.log(prestador1)


/*
nome: "jaquilina"
precoHora: 100
profissao: Desenvolvidor de Software
minimoParaDesconto: 1000
percentagemDesconto: 0.1
taxaUrgencia: 0.3
*/

