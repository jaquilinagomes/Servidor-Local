import { catalogoServicos } from "./servico.js";
import { type PedidoServicoType, type ServicoType, type prestadorType } from "./utils/types.js"

const taxaUrgencia: number = 0.3
const minimoDescontado: number = 100
const percentagemDesconto: number = 0.1


const servicosSelecionados: ServicoType[] = []
const PrestadoresDeServico: prestadorType[] = []
const prestadoresSelecionados: prestadorType[] = []


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

// Função para criar prestadores de serviço
export function criarPrestadoresDeServico(novoPrestador: prestadorType) {
    // Verificar se o prestador já esta no array
    PrestadoresDeServico.map((prestadorExistente: prestadorType) => {
        if (prestadorExistente.nome === novoPrestador.nome) {
            // Se o prestador já existir, retorna uma mensagem de erro
            return {
                status: false,
                message: "já existe um prestador de serviço com esse nome",
                data: null
            }
        }
    })

    // Se o prestador não existir, adicionamos o novo prestador
    PrestadoresDeServico.push(novoPrestador)
    return {
        status: true,
        message: "Prestador de serviço adicionado com sucesso",
        data: novoPrestador
    }
}

// Função para selecionar prestadores
export function selecionarPrestadoresDeServico(nomeDoPrestador: string) {
    // Ciclo que percorre o array de prestadoresDeServiço
    for (let i = 0; i < PrestadoresDeServico.length; i++) {
        // if que verifica se o item do array é igual ao nome recebido
        if (PrestadoresDeServico[i]?.nome === nomeDoPrestador) {
            // Se for igual, adiciona o item [i] ao array prestadoresSelecionados.push
            prestadoresSelecionados.push(PrestadoresDeServico[i]!)
            // Retornar verdadeiro
            return true
        }
    }
    // Se não return false
    return false
}

// Listar editar um prestador de serviço
export function editarPrestadorDeServico(nomeDoPrestador: string, novosDadosDoPrestador: prestadorType) {
    // Encontrar o prestador de serviço a editar na minha lista
    // Ciclo que percore a lista e verifica o nome do prestador de serviço
    PrestadoresDeServico.map((prestadorExistente: prestadorType) => {
        if (prestadorExistente.nome === nomeDoPrestador) {
            prestadorExistente.nome = novosDadosDoPrestador.nome
            prestadorExistente.precoHora = novosDadosDoPrestador.precoHora
            prestadorExistente.profissao = novosDadosDoPrestador.profissao
            prestadorExistente.minimoParaDesconto = novosDadosDoPrestador.minimoParaDesconto
            prestadorExistente.percentagemDesconto = novosDadosDoPrestador.percentagemDesconto
            prestadorExistente.taxaUrgencia = novosDadosDoPrestador.taxaUrgencia

            return {
                status: true,
                message: "Prestador de serviço editado com sucesso",
                data: prestadorExistente
            }
        }
    })

    // Se não existir nenhum prestador com o nome recebido, retorna uma mensagem de erro
    return {
        status: false,
        message: "Não existe nenhum prestador de serviço com esse nome",
        data: null
    }

}

// Listar prestadores de serviço
export function listarPrestadoresDeServico() {
    return PrestadoresDeServico
}

// prestadorDeServico.replace()
// Função para apagar um prestador de serviço
export function apagarPrestadorDeServico(nomeDoPrestador: string) {
    // Ciclo para percorrer a lista de prestadores
    // for (let i = 0; i < PrestadoresDeServico.length; i++) {
    // if para verificar se o nome do prestador for igual ao nome recebido
    // if (PrestadoresDeServico[i]?.nome === nomeDoPrestador) {
    // se encontrado, remover o prestador
    // PrestadoresDeServico.splice(i, 1);
    //PrestadoresDeServico.replace(i, "")
    // retornar uma mensagem de sucesso
    // }
    // }

    // prestadorDeServico.find() // se encontrar, devolve o item
    // prestadorDeServico.some() // se encontrar, devolve true

    // validação do nome do prestador
    if (nomeDoPrestador === "") {
        return {
            status: false,
            message: "Nome do prestador é obrigatório",
            data: null
        }
    }

    const prestadorExiste = PrestadoresDeServico.some(
        (prestadorExistente: prestadorType) => 
            prestadorExistente.nome === nomeDoPrestador
    )

    if (!prestadorExiste) {
        return {
            status: false,
            message: "Não existe nenhum prestador de serviço com esse nome",
            data: null
        }
    }

    PrestadoresDeServico.filter(
        (prestadorExistente: prestadorType) =>
            prestadorExistente.nome !== nomeDoPrestador
    )

    return {
        status: true,
        mesage: "Prestador de serviço apagado com sucesso",
        data: PrestadoresDeServico
    }

    /* return {
        status: true,
        message: "Prestador removido com sucesso",
        data: null
    }*/

    // se nao existir nenhum prestador com o nome recebido, retorna uma mensagem de erro
    /* return {
        status: false,
        message: "Nenhum prestador de serviço encontrado",
        data: null
    } */
}

// Função para obter um prestador de serviço pelo nome
/* export function obterPrestadorDeServico(nome: string): prestadorType | null {
    for (let i = 0; i < PrestadoresDeServico.length; i++) {
        if (PrestadoresDeServico[i]?.nome === nome) {
            return PrestadoresDeServico[i]!
        }
    }
    return null
} */





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

