import { UsersModel } from "../models/users.model.js";
import type { userType } from "../utils/types.js";
import type { Request, Response } from "express";

export const UsersController = {
    async create(req: Request, res: Response) {
        const user: userType = req.body;
        
            if (!user) {
                return res.status(400).json({
                    error: "utilizador não encontrado!"
                });
            }
            const createUserResponse = await UsersModel.create(user);
        
            res.json(createUserResponse);
},

async getAll(req: Request, res: Response) {
    const getUsersResponse = await UsersModel.getAll()
    
        res.json(getUsersResponse);
},

async get(req: Request, res: Response) {
    const { id } = req.query
        if (id) {
            const getUserByIdResponse = await UsersModel.get(id as string)
    
            if (!getUserByIdResponse) {
                res.status(404).json({
                    status: "error",
                    message: "Utilizador não encontrado",
                    data: null
                })
            }
    
            res.status(200).json({
                status: "sucess",
                message: "Utilizador encontrado",
                data: getUserByIdResponse
            })
        } else {
            res.status(400).json({
                status: "error",
                message: "Id é obrigatório",
                data: null
            })
        }
},

async update(req: Request, res: Response) {
    const { id } = req.params
    
        const updatedUser: userType = req.body
    
        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatório",
                data: null
            })
        }
        if (!updatedUser) {
            return res.status(400).json({
                status: "error",
                message: "Dados do usuário inválidos",
                data: null
            })
        }
        const updateUserResponse = await UsersModel.update(id as string, updatedUser)
    
        if (!updateUserResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar usuário",
                data: null
            })
        }
    
        return res.status(200).json({
            status: "sucess",
            message: "Usuário atualizado com sucesso",
            data: updateUserResponse
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

        const deleteUserResponse = await UsersModel.delete(id as string)

    if (!deleteUserResponse) {
        return res.status(400).json({
            status: "error",
            message: "Erro ao apagar usuário",
            data: null
        })
    }

    return res.status(200).json({
        status: "sucess",
        message: "Usuário apagado com sucesso",
        data: deleteUserResponse
    }) 
}


}