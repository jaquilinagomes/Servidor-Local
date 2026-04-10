import { OrcamentoModel } from "../models/orcamento.model.js"
import { PrestacaoServicoModel } from "../models/prestacao-servico.model.js"
import { PrestadorModel } from "../models/prestador.model.js"
import { PropostaModel } from "../models/proposta.model.js"
import { EstadoProposta, type OrcamentoDBType, type PropostaDBType, type ResponseType } from "../utils/types.js"
import type { Request, Response } from "express"

export const OrcamentoController = {
    async create(req: Request, res: Response) {
        const newOrcamento: OrcamentoDBType = req.body
        if (!newOrcamento) {
            return res.status(400).json({
                status: "error",
                message: "Dados de orcamento invalidos",
                data: null
            })
        }
        const createOrcamentoResponse: OrcamentoDBType | null = await OrcamentoModel.create(newOrcamento)

        if (createOrcamentoResponse === null) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao criar orcamento",
                data: null
            }
            return res.status(400).json(response)
        }

        const response: ResponseType<OrcamentoDBType> = {
            status: "success",
            message: "Orcamento criado com sucesso",
            data: createOrcamentoResponse
        }
        return res.status(200).json(response)
    },

    async getAll(req: Request, res: Response) {
        const getAllOrcamentoResponse: OrcamentoDBType[] | null = await OrcamentoModel.getAll()

        if (!getAllOrcamentoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar orcamentos",
                data: null
            }
            return res.status(500).json(response)
        }

        const response: ResponseType<OrcamentoDBType[]> = {
            status: "success",
            message: "Orcamento criado com sucesso",
            data: getAllOrcamentoResponse
        }

        return res.status(200).json(response)
    },

    async get(req: Request, res: Response) {
        const id = req.params.id

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "Id de orcamento nao encontrado!",
                data: null
            })
        }
        const getOrcamentoResponse: OrcamentoDBType | null = await OrcamentoModel.get(id as string)

        if (!getOrcamentoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Orcamento nao encontrado!",
                data: null
            }
            return res.status(404).json(response)
        }

        const response: ResponseType<OrcamentoDBType> = {
            status: "success",
            message: "Orcamento encontrado com sucesso!",
            data: getOrcamentoResponse
        }
        return res.status(200).json(response)  
    },

    async update(req: Request, res: Response) {
        const { id } = req.params

        const updateOrcamento: OrcamentoDBType = req.body

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "Id é obrigatorio!",
                data: null
            })
        }
        if (!updateOrcamento) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar orcamento",
                data: null
            })
        }
        const updateOrcamentoResponse = await OrcamentoModel.update(id as string, updateOrcamento)
        if (!updateOrcamentoResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar orcamento!",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Orcamento atualizado com sucesso!",
            data: updateOrcamentoResponse
        })
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params


        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "Id é obrigatorio",
                data: null
            })
        }

        const deleteOrcamentoResponse: OrcamentoDBType | null = await OrcamentoModel.delete(id as string)

        if (!deleteOrcamentoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao eliminar orcamento!",
                data: null
            }
            return res.status(400).json(response)
        }

        const response: ResponseType<OrcamentoDBType> = {
            status: "success",
            message: "Orcamento criado com sucesso",
            data: deleteOrcamentoResponse
        }
        return res.status(200).json(response)
    },

    async calculateBudget(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID obrigatório",
                data: null
            }
            return res.status(400).json(response)
        }

        // then calculate budget

        // to fetch proposals we need to fetch prestacao_servico first
        const prestacaoServico = await PrestacaoServicoModel.getByIdOrcamento(id as string)

        if (!prestacaoServico) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Prestação de serviço não encontrado",
                data: null
            }
            return res.status(404).json(response)
        }

        // fetch all proposal
        const proposals = await PropostaModel.getByPrestacaoServico(prestacaoServico.id)

        if (!proposals) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Proposta não encontrada",
                data: null
            }
            return res.status(404).json(response)
        }

        //find accepted proposal
        const acceptedProposal: PropostaDBType | undefined = proposals.find((proposal) => proposal.estado === EstadoProposta.ACEITE)

        if (!acceptedProposal) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Ainda nenhuma proposta foi aceite",
                data: null
            }
            return res.status(404).json(response)
        }

        const preco_hora = acceptedProposal.preco_hora
        const horas_estimadas = acceptedProposal.horas_estimadas

        // fetch prestador to get urgency tax minimun discount and discount percentage based on attrs in utils/types.ts
        const prestador = await PrestadorModel.get(acceptedProposal.id_prestador)

        if (!prestador) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Prestador não encontrado",
                data: null
            }
            return res.status(404).json(response)
        }

        const urgencyTax = prestador.taxa_urgencia
        const minimumDiscount = prestador.minimo_desconto
        const discountPercentage = prestador.percentagem_desconto

        // calculate the budget based on utils/types.ts
        let subtotal = preco_hora * horas_estimadas

        // if minimum discount is greater than discount percentage
        if (subtotal > minimumDiscount) {
            subtotal = subtotal * (1 - discountPercentage)
        }

        if (prestacaoServico.urgente) {
            // add urgency tax
            subtotal = subtotal * (1 - urgencyTax)
        }

        const updateOrcamentoResponse = await OrcamentoModel.updateBudget(id as string, subtotal)

        if (!updateOrcamentoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao calcular orcamento",
                data: null
            }
            return res.status(400).json(response)
        }

            const response: ResponseType<OrcamentoDBType> = {
                status: "success",
                message: "Orcamento calculado e atualizado com sucesso",
                data: updateOrcamentoResponse
        }
        return res.status(200).json(response)
    }
}