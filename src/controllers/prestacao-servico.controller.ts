import type { PrestacaoServicoDBType, PrestacaoServicoDetalhadoType, ResponseType } from "../utils/types.js"
import { PrestacaoServicoModel } from "../models/prestacao-servico.model.js" 
import type { Request, Response } from "express"



export const prestacaoServicoController = {
    async create(req: Request, res: Response) {
        const newPrestacaoServico: PrestacaoServicoDBType = req.body
        if (!newPrestacaoServico) {
            return res.status(400).json({
                status: "error",
                message: "Orcamento de servico invalidos",
                data: null
            })
        }
        const createPrestacaoServicoResponse: PrestacaoServicoDBType | null = await PrestacaoServicoModel.create(newPrestacaoServico)

        if (createPrestacaoServicoResponse === null) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao pedir orcamento",
                data: null
            }
            return res.status(400).json(response)
        }

        const response: ResponseType<PrestacaoServicoDBType> = {
            status: "success",
            message: "Pedido de orcamento feito com sucesso",
            data: createPrestacaoServicoResponse
        }
        return res.status(200).json(response)
    },
    
    async getAll(req: Request, res: Response) {
        const getAllPrestacaoServicoResponse: PrestacaoServicoDBType[] | null = await PrestacaoServicoModel.getAll()
        if (!getAllPrestacaoServicoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar servidor",
                data: null
            }
            return res.status(500).json(response)
        }

        const response: ResponseType<PrestacaoServicoDBType[]> = {
            status: "success",
            message: "Prestacao de servico feito com sucesso",
            data: getAllPrestacaoServicoResponse
        }
        return res.status(200).json(response)
    },

    async get(req: Request, res: Response) {
        const id = req.params.id
        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "Id de prestação de serviço nao encontrado!",
                data: null
            })
        }
        const getPrestacaoServicoResponse: PrestacaoServicoDBType | null = await PrestacaoServicoModel.get(id as string)

        if (!getPrestacaoServicoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Prestação de servico nao encontrado!",
                data: null
            }
            return res.status(404).json(response)
        }

        const response: ResponseType<PrestacaoServicoDBType> = {
            status: "success",
            message: "Prestacao de serviço encontrado com sucesso!",
            data: getPrestacaoServicoResponse
        }
        return res.status(200).json(response)
    },

    async update(req: Request, res: Response) {
        const { id } = req.params

        const updatePrestacaoServico: PrestacaoServicoDBType = req.body

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "Id é obrigatorio!",
                data: null
            })
        }
        if (!updatePrestacaoServico) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar Prestador de serviço",
                data: null
            })
        }

        const updatePrestacaoServicoResponse = await PrestacaoServicoModel.update(id as string, updatePrestacaoServico)
        if (!updatePrestacaoServicoResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar Prestador de serviço!",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Prestador de serviço atualizado com sucesso!",
            data: updatePrestacaoServicoResponse
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
    
            const deletePrestacaoServicoResponse: PrestacaoServicoDBType | null = await PrestacaoServicoModel.delete(id as string)
    
            if (!deletePrestacaoServicoResponse) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "Erro ao eliminar prestador de serviço!",
                    data: null
                }
                return res.status(400).json(response)
            }

            const response: ResponseType<PrestacaoServicoDBType> = {
                status: "success",
                message: "Prestador de serviço criado com sucesso",
                data: deletePrestacaoServicoResponse
            }
            return res.status(200).json(response)
        },

    async getAllPrestacaoServicoDetalhada(req: Request, res: Response) {
        const { limit, offset } = req.query as {limit: string, offset: string}

        let LIMIT = 10
        let OFFSET = 0

        if (limit && parseInt(limit) > 0) LIMIT = parseInt(limit)
        if (offset && parseInt(offset) > 0) OFFSET = parseInt(offset)

        const getAllPrestacaoServicosResponse: PrestacaoServicoDetalhadoType[] | null = await PrestacaoServicoModel.getAllPrestacaoServicoDetalhada(LIMIT, OFFSET)

        if (!getAllPrestacaoServicosResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar prestacoes de servico",
                data: null
            }
            return res.status(500).json(response)
        }

        const response: ResponseType<PrestacaoServicoDetalhadoType[]> = {
            status: "success",
            message: "Prestacoes de servico buscadas com sucesso",
            data: getAllPrestacaoServicosResponse
        }
        return res.status(200).json(response)
    }
}
