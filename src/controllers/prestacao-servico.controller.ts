import type { PrestacaoServicoDBType } from "../utils/types.js"
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
        const createPrestacaoServicoResponse = await PrestacaoServicoModel.create(newPrestacaoServico)

        if (createPrestacaoServicoResponse === null) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao pedir orcamento",
                data: null
            })
        }
        res.status(200).json({
            status: "success",
            message: "Pedido de orcamento feito com sucesso",
            data: createPrestacaoServicoResponse
        })
    },
    
    async getAll(req: Request, res: Response) {
        const getAllPrestacaoServicoResponse = await PrestacaoServicoModel.getAll()
        if (!getAllPrestacaoServicoResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar servidor",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Prestacao de servico feito com sucesso",
            data: getAllPrestacaoServicoResponse
        })
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
        const getPrestacaoServicoResponse = await PrestacaoServicoModel.get(id as string)

        if (!getPrestacaoServicoResponse) {
            return res.status(404).json({
                status: "error",
                message: "Prestação de servico nao encontrado!",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Prestacao de serviço encontrado com sucesso!",
            data: getPrestacaoServicoResponse
        })
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
    
            const deletePrestacaoServicoResponse = await PrestacaoServicoModel.delete(id as string)
    
            if (!deletePrestacaoServicoResponse) {
                return res.status(400).json({
                    status: "error",
                    message: "Erro ao eliminar prestador de serviço!",
                    data: null
                })
            }
            return res.status(200).json({
                status: "success",
                message: "Prestador de serviço criado com sucesso",
                data: deletePrestacaoServicoResponse
            })
        }
    }
