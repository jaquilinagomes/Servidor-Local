import { type ServicoType, type ResponseType } from "./utils/types.js";
import db from "./lib/db.js";

export let catalogoServicos: ServicoType[] = [];

// Adicionar um novo serviço
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

// Listar todos os serviços
export function listarServicos(): ServicoType[] {
    // Todo: implementar fetch de serviço
    return catalogoServicos
}

// Apagar um serviço
export function apagarServico(nome: string): boolean {
    // Todo: implementar delete de serviço

    const novoCatalogoTemp: ServicoType[] = []

    for (let i = 0; i < catalogoServicos.length; i++) {
        if (catalogoServicos[i]?.nome !== undefined && catalogoServicos[i]?.nome !== nome) {
            novoCatalogoTemp.push(catalogoServicos[i]!)
        }
    } // Devolve um novo catalogo sem o servico que foi apagado

    catalogoServicos = novoCatalogoTemp

    return true
}

// Obter um serviço pelo nome
export function obterServico(nome: string): ServicoType | null {
    for (let i = 0; i < catalogoServicos.length; i++) {
        if (catalogoServicos[i]?.nome === nome) {
            return catalogoServicos[i]!
        }
    }
    return null
}

export async function userServicos(servicos: any) {
    try {
        const [rows] = await db.execute(
            `INSERT INTO tbl_servicos
        (id, nome, descricao, categoria, enabled, created_at,  updated_at)
        values(?, ?, ?, ?, ?, ?, ?)
        `,

            [
                null,
                servicos.nome,
                servicos.descricao,
                servicos.categoria,
                servicos.enabled,
                new Date(),
                new Date()
            ]
        )

        console.log({ rows })
        return rows
    } catch (error) {
        console.log(error)
        return null
    }
}