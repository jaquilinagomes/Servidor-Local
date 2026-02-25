interface ResponseType {
    status: boolean,
    message: string,
    data: ServicoType | null,
}

interface ServicoType {
    nome: string;
    precoHora: number;
    categoria: string;
    minimoDescontado: number;
    percentagemDesconto?: number;
}

let catalogoServicos: ServicoType[] = [];

export function adicionarServico(servico: ServicoType): ResponseType {
    if (!servico.nome || servico.precoHora <= 0)
        return ({
            status: false,
            message: "Erro: Nome obrigatório e preço deve ser maior que Zero.",
            data: null,
        })

    for (let i = 0; i < catalogoServicos.length; i++) {
        if (catalogoServicos[i]?.nome === servico.nome) {
            return ({
                status: false,
                message: "Erro: O serviço já existe.",
                data: null,
            })
        }
    }
    catalogoServicos.push(servico);
    return ({
        status: true,
        message: "Sucesso: Serviço adicionado!",
        data: servico,
    })
} 

