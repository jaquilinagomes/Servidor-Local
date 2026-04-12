import type { Request, Response } from "express"
import type { PrestadorDBType, ResponseType } from "../utils/types.js"
import { PrestadorModel } from "../models/prestador.model.js"

export const prestadorController = {
    async create(req: Request, res: Response) {
        const newPrestador: PrestadorDBType = req.body
        if (!newPrestador) {
            return res.status(400).json({
                status: "error",
                message: "Prestador de servico invalidos",
                data: null
            })
        }
        const createPrestadorResponse: PrestadorDBType | null = await PrestadorModel.create(newPrestador)

        if (createPrestadorResponse === null) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao criar Prestador",
                data: null
            }
            return res.status(400).json(response)
        }

        const response: ResponseType<PrestadorDBType> = {
            status: "success",
            message: "Prestador criado com sucesso",
            data: createPrestadorResponse
        }
        return res.status(200).json(response)
    },


    async getAll(req: Request, res: Response) {
        const getAllPrestadorResponse: PrestadorDBType[] | null = await PrestadorModel.getAll()
        if (!getAllPrestadorResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar prestador",
                data: null
            }
            return res.status(500).json(response)
        }

        const response: ResponseType<PrestadorDBType[]> = {
            status: "success",
            message: "Prestador buscado com sucesso",
            data: getAllPrestadorResponse
        }
        return res.status(200).json(response)
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
        const getServiceResponse: PrestadorDBType | null = await PrestadorModel.get(id as string)

        if (!getServiceResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Prestador nao encontrado!",
                data: null
            }
            return res.status(404).json(response)
        }

        const response: ResponseType<PrestadorDBType> = {
            status: "success",
            message: "Prestador encontrado com sucesso!",
            data: getServiceResponse
        }
        return res.status(200).json(response)
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
        
                const deletePrestadorResponse: PrestadorDBType | null = await PrestadorModel.delete(id as string)
        
                if (!deletePrestadorResponse) {
                    const response: ResponseType<null> = {
                        status: "error",
                        message: "Erro ao eliminar prestador!",
                        data: null
                    }
                    return res.status(400).json(response)
                }

                const response: ResponseType<PrestadorDBType> = {
                    status: "success",
                    message: "Prestador eliminado com sucesso",
                    data: deletePrestadorResponse
                }
                return res.status(200).json(response)
            }
}