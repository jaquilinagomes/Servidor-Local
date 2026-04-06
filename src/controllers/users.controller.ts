import { UserModel } from "../models/users.model.js";
import { comparePassword } from "../utils/password.js";
import type { userDBType } from "../utils/types.js";
import type { Request, Response } from "express";
import  jwt  from "jsonwebtoken";

export const UserController = {
    async create(req: Request, res: Response) {
        const user: userDBType = req.body;
        
            if (!user) {
                return res.status(400).json({
                    error: "utilizador não encontrado!"
                });
            }
            const createUserResponse = await UserModel.create(user);
        
            res.json(createUserResponse);
},

async getAll(req: Request, res: Response) {
    const getUsersResponse = await UserModel.getAll()
    
        res.json(getUsersResponse);
},

async get(req: Request, res: Response) {
    const { id } = req.query
        if (id) {
            const getUserByIdResponse = await UserModel.get(id as string)
    
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
    
        const updatedUser: userDBType = req.body

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
        const updateUserResponse = await UserModel.update(id as string, updatedUser)

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

async updatePassword(req: Request, res: Response) {
    const {id} = req.params
    const { passwordAntiga, passwordNova, confirmarPassword} = req.body
    if (!id || !passwordAntiga || !passwordNova || !confirmarPassword) {
        return res.status(400).json({
            status: "error",
            message:"Dados inválidos",
            data: null
        })
    }
    const userData: userDBType | null = await UserModel.get(id as string)
    if (!userData) {
        return res.status(404).json({
            status: "error",
            message: "Utilizador não encontrado",
            data: null
        })
    }
    const isPasswordValid = await comparePassword(passwordAntiga, userData.password as string)
    if(!isPasswordValid) {
        return res.status(401).json({
            status:"error",
            message: "Senha incorreta",
            data: null
        })
    }
    const updatePasswordResponse = await UserModel.updatePassword (id as string, passwordNova as string)
    res.status(200).json({
        status: "sucess",
        message:"Senha atualizada com sucesso",
        data: updatePasswordResponse
    })
},

async login(req: Request, res: Response) {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json ({
            status: "error",
            message: "Crendenciais invalidos",
            data: null
        })
    }

    const userData = await UserModel.getByEmail(email as string)
    if (!userData) {
        return res.status(404).json ({
            status: "error",
            message: "Não existe nenhuma conta com este email",
            data: null
        })
    }
    const isPasswordValid = await comparePassword(password, userData.password)
    if (!isPasswordValid) {
        return res.status(400).json({
            status: "error",
            message: "Credenciais invalidos",
            data: null
        })
    }

    const payload = {
        id: userData.id,
        email: userData.email,
        nome: userData.nome
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {expiresIn: "1h"})

    return res.status(200).json({
        status: "Sucess",
        message: "Login realizado com sucesso",
        data: {
            token,
            user: payload
        }
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

        const deleteUserResponse = await UserModel.delete(id as string)

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