import type { Request, Response } from "express"
import type { PrestadorDBType } from "../utils/types.js"
import { PrestadorModel } from "../models/prestador.model.js"

export const prestadorController = {
    async create(req: Request, res: Response) {
        const newPrestador: PrestadorDBType = req.body
        if (!newPrestador) {
            return res.status(400).json({
                status: "error",
                message: "Proposta de servico invalidos",
                data: null
            })
        }
        const createPropostaResponse = await PrestadorModel.create(newPrestador)

        if (createPropostaResponse === null) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao criar Proposta",
                data: null
            })
        }
        res.status(200).json({
            status: "success",
            message: "Proposta criado com sucesso",
            data: createPropostaResponse
        })
    },


    async getAll(req: Request, res: Response) {
        const getAllPrestadorResponse = await PrestadorModel.getAll()
        if (!getAllPrestadorResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar servidor",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Prestador buscado com sucesso",
            data: getAllPrestadorResponse
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
        const getServiceResponse = await PrestadorModel.get(id as string)

        if (!getServiceResponse) {
            return res.status(404).json({
                status: "error",
                message: "Prestador nao encontrado!",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Prestador encontrado com sucesso!",
            data: getServiceResponse
        })
    },

    async update(req: Request, res: Response) {
        const { id } = req.params

        const updatePrestador: PrestadorDBType = req.body

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "Id é obrigatorio!",
                data: null
            })
        }
        if (!updatePrestador) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar Prestador",
                data: null
            })
        }

        const updatePrestadorResponse = await PrestadorModel.update(id as string, updatePrestador)
        if (!updatePrestadorResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar Prestador!",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Prestador atualizado com sucesso!",
            data: updatePrestadorResponse
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
        
                const deletePropostaResponse = await PrestadorModel.delete(id as string)
        
                if (!deletePropostaResponse) {
                    return res.status(400).json({
                        status: "error",
                        message: "Erro ao eliminar prestador!",
                        data: null
                    })
                }
                return res.status(200).json({
                    status: "success",
                    message: "Prestador eliminado com sucesso",
                    data: deletePropostaResponse
                })
            }
}