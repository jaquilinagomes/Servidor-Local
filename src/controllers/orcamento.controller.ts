import { OrcamentoModel } from "../models/orcamento.model.js"
import { PrestacaoServicoModel } from "../models/prestacao-servico.model.js"
import { PrestadorModel } from "../models/prestador.model.js"
import { PropostaModel } from "../models/proposta.model.js"
import { EstadoProposta, type OrcamentoDBType, type PropostaDBType } from "../utils/types.js"
import type { Request, Response } from "express"

export const OrcamentoController = {
    async create(req: Request, res: Response) {
        const newOrcamento: OrcamentoDBType = req.body
        if (!newOrcamento) {
            return res.status(400).json({
                status: "error",
                message: "Orcamento de servico invalidos",
                data: null
            })
        }
        const createOrcamentoResponse = await OrcamentoModel.create(newOrcamento)

        if (createOrcamentoResponse === null) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao pedir orcamento",
                data: null
            })
        }
        res.status(200).json({
            status: "success",
            message: "Pedido de orcamento feito com sucesso",
            data: createOrcamentoResponse
        })
    },

    async getAll(req: Request, res: Response) {
        const getAllOrcamentoResponse = await OrcamentoModel.getAll()
        if (!getAllOrcamentoResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar servidor",
                data: null
            })
        }
        return res.status(200).json({
            status: "sucess",
            message: "Orcamento feito com sucesso",
            data: getAllOrcamentoResponse
        })
    },
    async get(req: Request, res: Response) {
        const id = req.params.id
        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "Id de prestador nao encontrado!",
                data: null
            })
        }
        const getOrcamentoResponse = await OrcamentoModel.get(id as string)

        if (!getOrcamentoResponse) {
            return res.status(404).json({
                status: "error",
                message: "Prestador nao encontrado!",
                data: null
            })
        }
        return res.status(200).json({
            status: "sucess",
            message: "Prestador encontrado com sucesso!",
            data: getOrcamentoResponse
        })
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

    /* async calcularOrcamento(req: Request, res: Response) {
    const { id } = req.params
    if (!id) {
        return res.status(400).json({
            status: "error",
            message: "ID obrigatório",
            data: null
        });
    }
    const result = await OrcamentoModel.calcularOrcamento(id as string)
    if (!result) {
        return res.status(400).json({
            status: "error",
            message: "Dados de orçamento inválidos",
            data: null
        });
    }
    return res.status(200).json({
        status: "success",
        message: "Orçamento calculado com sucesso",
        data: result
    });
},
*/
    async delete(req: Request, res: Response) {
        const { id } = req.params


        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "Id é obrigatorio",
                data: null
            })
        }

        const deleteOrcamentoResponse = await OrcamentoModel.delete(id as string)

        if (!deleteOrcamentoResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao eliminar orcamento!",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Orcamento criado com sucesso",
            data: deleteOrcamentoResponse
        })
    },

    async calculateBudget(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatório",
                data: null
            })
        }
        // then calculate budget

        // to fetch proposals we need to fetch prestacao_servico first
        const prestacaoServico = await PrestacaoServicoModel.getByIdOrcamento(id as string)

        if (!prestacaoServico) {
            return res.status(404).json({
                status: "error",
                message: "Prestação de serviço não encontrado",
                data: null
            })
        }

        // fetch all proposal
        const proposals = await PropostaModel.getByPrestacaoServico(prestacaoServico.id)

        if (!proposals) {
            return res.status(404).json({
                status: "error",
                message: "Proposta não encontrada",
                data: null
            })
        }

        //find accepted proposal
        const acceptedProposal: PropostaDBType | undefined = proposals.find((proposal) => proposal.estado === EstadoProposta.ACEITE)

        if (!acceptedProposal) {
            return res.status(404).json({
                status: "error",
                message: "Ainda nenhuma proposta foi aceite",
                data: null
            })
        }

        const preco_hora = acceptedProposal.preco_hora
        const horas_estimadas = acceptedProposal.horas_estimadas

        // fetch prestador to get urgency tax minimun discount and discount percentage based on attrs in utils/types.ts
        const prestador = await PrestadorModel.get(acceptedProposal.id_prestador)

        if (!prestador) {
            return res.status(404).json({
                status: "error",
                message: "Prestador não encontrado",
                data: null
            })
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
            return res.status(400).json({
                status: "error",
                message: "Erro ao calcular orcamento",
                data: null
            })
        }

        return res.status(200).json({
            status: "sucess",
            message: "Orcamento calculado e atualizado com sucesso",
            data: updateOrcamentoResponse
        })
    }
}