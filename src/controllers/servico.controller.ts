import { ServiceModel } from "../models/servico.model.js";
import type { ResponseType, servicoDBType } from "../utils/types.js";
import type { Request, Response } from "express";

export const ServicoController = {
    async create(req: Request, res: Response) {
        const newService: servicoDBType = req.body

        if (!newService) {
            return res.status(400).json({
                status: "error",
                message: "Dados de servico invalidos",
                data: null
            })
        }
        const createServiceResponse: servicoDBType | null = await ServiceModel.create(newService)

        if (createServiceResponse === null) {
            const response: ResponseType<null> = {
                status: "error",
                message:"Erro ao criar serviço",
                data:  null
            }
            return res.status(400).json(response)
        }
        const response: ResponseType<servicoDBType> = {
            status:"success",
            message:"Servico criado com sucesso",
            data: createServiceResponse
        }
        return res.status(200).json(response)
    },

    async getAll(req: Request, res: Response) {
        const getAllServicesResponse: servicoDBType[] | null = await ServiceModel.getAll()
        
        if (!getAllServicesResponse) {
            const response: ResponseType<null> = {
                status:"error",
                message:"Erro ao criar serviços",
                data: null
            }
            return res.status(500).json(response)
        }
        const response: ResponseType<servicoDBType[]> = {
            status:"success",
            message: "Serviços buscados com sucesso",
            data: getAllServicesResponse
        }
        return res.status(200).json(response)
    },

    async get( req: Request, res: Response) {
        const id = req.params.id
        if (!id) {
            return res.status(400).json({
                status:"error",
                message:"ID do servico não fornecido",
                data: null
            })
        }
        const getServiceResponse: servicoDBType | null = await ServiceModel.get(id as string)

        if (!getServiceResponse) {
            const response: ResponseType<null> = {
                status:"error",
                message:"Serviço não encontrado",
                data: null
            }
            return res.status(404).json(response)
        }
        const response: ResponseType<servicoDBType> = {
            status:"success",
            message:"Serviço encontrado com sucesso",
            data: getServiceResponse
        }
        return res.status(200).json(response)
    },

    async update(req: Request, res: Response) {
        const { id } = req.params
        
            const updatedService: servicoDBType = req.body
        
            if (!id) {
                return res.status(400).json({
                    status: "error",
                    message: "ID obrigatório",
                    data: null
                })
            }
            if (!updatedService) {
                return res.status(400).json({
                    status: "error",
                    message: "Dados de serviço inválidos",
                    data: null
                })
            }
            const updateServiceResponse = await ServiceModel.update(id as string, updatedService)
        
            if (!updateServiceResponse) {
                return res.status(400).json({
                    status: "error",
                    message: "Erro ao atualizar serviço",
                    data: null
                })
            }
        
            return res.status(200).json({
                status: "success",
                message: "serviço atualizado com sucesso",
                data: updateServiceResponse
            })
        },

        async delete(req: Request, res: Response) {
            const { id } = req.params
            
                if (!id) {
                    return res.status(400).json({
                        status: "error",
                        message: "ID obrigatório",
                        data: null
                    })
                }
            
                const deleteServiceResponse: servicoDBType | null = await ServiceModel.delete(id as string)
            
                if (!deleteServiceResponse) {
                    const response: ResponseType<null> = {
                        status: "error",
                        message: "Erro ao apagar serviço",
                        data: null
                    }
                    return res.status(400).json(response)
                }
                const response: ResponseType<servicoDBType> = {
                    status: "success",
                    message: "Serviço apagado com sucesso",
                    data: deleteServiceResponse
                }
                return res.status(200).json(response)
        }
}