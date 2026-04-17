import { EmpresaModel } from "../models/empresa.model.js"
import type { EmpresaDBType, ResponseType } from "../utils/types.js"
import type { Request, Response } from "express"

export const EmpresaController = {
    async create(req: Request, res: Response) {
        const newEmpresa: EmpresaDBType = req.body

        if (!newEmpresa) {
            return res.status(400).json({
                status: "error",
                message: "Dados inválidos",
                data: null,
            })
        }

        console.log(newEmpresa)

        const createEmpresaResponse: EmpresaDBType | null = await EmpresaModel.create(newEmpresa)

        const response: ResponseType<EmpresaDBType> = {
            status: "success",
            message: "Empresa criado com sucesso",
            data: createEmpresaResponse,
        }
        return res.status(201).json(response)
    },

    async getAll(req: Request, res: Response) {
        const getEmpresaResponse: EmpresaDBType[] | null = await EmpresaModel.getAll()
        if (!getEmpresaResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar empresas",
                data: null,
            }
                return res.status(500).json(response)
            }
            const response: ResponseType<EmpresaDBType[]> = {
                status: "success",
                message: "Empresas buscadas com sucesso",
                data: getEmpresaResponse
            }
            return res.status(200).json(response)
        },

        async get(req: Request, res: Response) {
            const { id } = req.params
                if (id) {
                    const getEmpresaByIdResponse: EmpresaDBType | null = await EmpresaModel.get(id as string)
                    if (!getEmpresaByIdResponse) {
                        const response: ResponseType<null> = {
                            status: "error",
                            message: "Empresa não encontrada",
                            data: null
                        }
                        return res.status(404).json(response)
                    }
        
                    const response: ResponseType<EmpresaDBType> = {
                        status: "success",
                        message: "Empresa encontrada",
                        data: getEmpresaByIdResponse
                    }
                    return res.status(200).json(response)
        
                } else {
                    const response: ResponseType<null> = {
                        status: "error",
                        message: "Id é obrigatório",
                        data: null
                    }
                    return res.status(400).json(response)
                }
            },
        
            async update(req: Request, res: Response) {
                const { id } = req.params
                
                    const updatedEmpresa: EmpresaDBType = req.body
            
                    if (!id) {
                        return res.status(400).json({
                            status: "error",
                            message: "ID obrigatório",
                            data: null
                        })
                    }
                    if (!updatedEmpresa) {
                        return res.status(400).json({
                            status: "error",
                            message: "Dados da empresa são inválidos",
                            data: null
                        })
                    }
                    const updateEmpresaResponse = await EmpresaModel.update(id as string, updatedEmpresa)
            
                    if (!updateEmpresaResponse) {
                        return res.status(400).json({
                            status: "error",
                            message: "Erro ao atualizar empresa",
                            data: null
                        })
                    }
                
                    return res.status(200).json({
                        status: "success",
                        message: "Empresa atualizado com sucesso",
                        data: updateEmpresaResponse
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
                
                        const deleteEmpresaResponse: EmpresaDBType | null = await EmpresaModel.delete(id as string)
                
                    if (!deleteEmpresaResponse) {
                        const response: ResponseType<null> = {
                            status: "error",
                            message: "Erro ao apagar empresa",
                            data: null
                        }
                        return res.status(400).json(response)
                    }
                    const response: ResponseType<EmpresaDBType> = {
                        status: "success",
                        message: "Empresa apagado com sucesso",
                        data: deleteEmpresaResponse
                    }
                    return res.status(200).json(response) 
                    }
}