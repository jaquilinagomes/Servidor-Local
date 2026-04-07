import { OrcamentoModel } from "../models/orcamento.model.js"
import type { OrcamentoDBType } from "../utils/types.js"
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

    async calcularOrcamento(req: Request, res: Response) {
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
    }
}