import { catalogoServicos } from "./servico.js";
import { type PedidoServicoType, type ServicoType } from "./utils/types.js"

const taxaUrgencia: number = 0.3
const minimoDescontado: number = 100
const percentagemDesconto: number = 0.1


const servicosSelecionados: ServicoType[] = []

// Função para selecionar serviços e horasEstimadas
export function selecionarServicos(nome: string) {
    for (let i = 0; i < catalogoServicos.length; i++) {
        if (catalogoServicos[i]?.nome === nome) {
            servicosSelecionados.push(catalogoServicos[i]!)
            return true
        }
    }
    return false
}

// Função para calcular o orçamento
export function calcularOrcamento(pedido: PedidoServicoType) {
    let totalBruto: number = 0
    let totalFinal: number = 0

    servicosSelecionados.map((servico: ServicoType) => {
        let totalDoServico: number = servico.precoHora * pedido.horasEstimadas
        totalBruto = totalBruto + totalDoServico
    })

    totalFinal = totalBruto

    if (pedido.urgente) {
        totalFinal = totalBruto + (totalBruto * taxaUrgencia)
    }

    if (totalBruto >= minimoDescontado) {
        totalFinal = totalFinal - (totalBruto * percentagemDesconto)
    }
    return totalFinal

}

// Exercício - orçamento

// () => {return} --- arrow function
// function () {} --- function normal

/*

urgente: true
taxaUrgencia: o.3
totalBruto: 100
totalTaxa: 100 * 0.3 = 30
totalFinal: 100 + 30 = 130

totalBruto: 100
totalBruto apos urgencia:150
minimo desconto: 100
percentagem: 10%
desconto sobre total final: 150 * 0.1 = 15
desconto sobre total bruto: 100 * 0.1 = 10

 */