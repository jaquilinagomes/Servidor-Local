import { CategoriaModel } from "../models/categoria.model.js"
import type { CategoriaBDType, ResponseType } from "../utils/types.js"
import type { Request, Response } from "express"

export const CategoriaController = {
    async create(req: Request, res: Response) {
        const newCategoria: CategoriaBDType = req.body

        if (!newCategoria) {
            return res.status(400).json({
                status: "error",
                message: "Dados inválidos",
                data: null,
            })
        }

        console.log(newCategoria)

        const createCategoriaResponse: CategoriaBDType | null = await CategoriaModel.create(newCategoria)

        const response: ResponseType<CategoriaBDType> = {
            status: "success",
            message: "Categoria criado com sucesso",
            data: createCategoriaResponse,
        }
        return res.status(201).json(response)
    },

    async getAll(req: Request, res: Response) {
        const getCategoriaResponse: CategoriaBDType[] | null = await CategoriaModel.getAll()
        if (!getCategoriaResponse) {
            const response: ResponseType<null> = {
                status: "error",
                    message: "Erro ao buscar por categorias",
                    data: null,
            }
                return res.status(500).json(response)
            }
            const response: ResponseType<CategoriaBDType[]> = {
                status: "success",
                    message: "Categorias buscadas com sucesso",
                    data: getCategoriaResponse
            }
            return res.status(200).json(response)
        },

        async get(req: Request, res: Response) {
            const { id } = req.params
                if (id) {
                    const getCategoriaByIdResponse: CategoriaBDType | null = await CategoriaModel.get(id as string)
                    if (!getCategoriaByIdResponse) {
                        const response: ResponseType<null> = {
                            status: "error",
                            message: "Categoria não encontrada",
                            data: null
                        }
                        return res.status(404).json(response)
                    }
        
                    const response: ResponseType<CategoriaBDType> = {
                        status: "success",
                        message: "Categoria encontrada",
                        data: getCategoriaByIdResponse
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
                
                    const updatedCategoria: CategoriaBDType = req.body
            
                    if (!id) {
                        return res.status(400).json({
                            status: "error",
                            message: "ID obrigatório",
                            data: null
                        })
                    }
                    if (!updatedCategoria) {
                        return res.status(400).json({
                            status: "error",
                            message: "Dados da categoria inválidos",
                            data: null
                        })
                    }
                    const updateCategoriaResponse = await CategoriaModel.update(id as string, updatedCategoria)
            
                    if (!updateCategoriaResponse) {
                        return res.status(400).json({
                            status: "error",
                            message: "Erro ao atualizar por categoria",
                            data: null
                        })
                    }
                
                    return res.status(200).json({
                        status: "success",
                        message: "Categoria atualizado com sucesso",
                        data: updateCategoriaResponse
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
                
                        const deleteCategoriaResponse: CategoriaBDType | null = await CategoriaModel.delete(id as string)
                
                    if (!deleteCategoriaResponse) {
                        const response: ResponseType<null> = {
                            status: "error",
                            message: "Erro ao apagar categoria",
                            data: null
                        }
                        return res.status(400).json(response)
                    }
                    const response: ResponseType<CategoriaBDType> = {
                        status: "success",
                        message: "Categoria apagado com sucesso",
                        data: deleteCategoriaResponse
                    }
                    return res.status(200).json(response) 
                    }
}