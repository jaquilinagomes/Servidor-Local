import type { Request, Response } from "express";
import { PropostaModel } from "../models/proposta.model.js";
import type { PropostaDBType } from "../utils/types.js";


export const PropostaController = {
    async create(req: Request, res: Response) {
        const newProposta: PropostaDBType = req.body
        if (!newProposta) {
            return res.status(400).json({
                status: "error",
                message: "Proposta de servico invalidos",
                data: null
            })
        }
        const createPropostaResponse = await PropostaModel.create(newProposta)

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
        const getAllPropostaResponse = await PropostaModel.getAll()
        if (!getAllPropostaResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar servidor",
                data: null
            })
        }
        return res.status(200).json({
            status: "sucess",
            message: "Serviços buscado com sucesso",
            data: getAllPropostaResponse
        })
    },
    async get(req: Request, res: Response) {
        const id = req.params.id
        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "Id de proposta nao fornecido",
                data: null
            })
        }
        const getPropostaResponse = await PropostaModel.get(id as string)

        if (!getPropostaResponse) {
            return res.status(404).json({
                status: "error",
                message: "Proposta nao efetuado!",
                data: null
            })
        }
        return res.status(200).json({
            status: "sucess",
            message: "Proposta efetuado com sucesso",
            data: getPropostaResponse
        })
    },

    async update(req: Request, res: Response) {
        const { id } = req.params

        const updateProposta: PropostaDBType = req.body

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "Id é obrigatorio!",
                data: null
            })
        }
        if (!updateProposta) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar Proposta",
                data: null
            })
        }

        const updatePropostaResponse = await PropostaModel.update(id as string, updateProposta)
        if (!updatePropostaResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar Proposta",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Proposta atualizado com sucesso!",
            data: updatePropostaResponse
        })
    },

    async aceitarProposta(req: Request, res: Response) {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatório",
                data: null
            });
        }
        const result = await PropostaModel.aceitarProposta(id as string);
        if (!result) {
            return res.status(400).json({
                status: "error",
                message: "Proposta inválida ou não encontrada",
                data: null
            });
        }
        return res.status(200).json({
            status: "success",
            message: "Proposta aceite com sucesso",
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
    
            const deletePropostaResponse = await PropostaModel.delete(id as string)
    
            if (!deletePropostaResponse) {
                return res.status(400).json({
                    status: "error",
                    message: "Erro ao eliminar proposta!",
                    data: null
                })
            }
            return res.status(200).json({
                status: "success",
                message: "Proposta eliminado com sucesso",
                data: deletePropostaResponse
            })
        }
    }
