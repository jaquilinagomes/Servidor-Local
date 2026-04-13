import { UserModel } from "../models/users.model.js";
import { comparePassword } from "../utils/password.js";
import type { ResponseType, userDBType } from "../utils/types.js";
import type { Request, Response } from "express";
import  jwt  from "jsonwebtoken";

export const UserController = {
    async create(req: Request, res: Response) {
        const newUser: userDBType = req.body

        if (!newUser) {
            return res.status(400).json({
                status: "error",
                message: "Dados de utilizador inválidos",
                data: null,
            })
        }

        console.log(newUser)

        const createUserResponse: userDBType | null = await UserModel.create(newUser)

        const response: ResponseType<userDBType> = {
            status: "success",
            message: "Utilizador criado com sucesso",
            data: createUserResponse,
        }
        return res.status(201).json(response)
    },

async getAll(req: Request, res: Response) {
    const getUsersResponse: userDBType[] | null = await UserModel.getAll()
    if (!getUsersResponse) {
        const response: ResponseType<null> = {
            status: "error",
                message: "Erro ao buscar utilizadores",
                data: null,
        }
            return res.status(500).json(response)
        }
        const response: ResponseType<userDBType[]> = {
            status: "success",
                message: "Utilizadores buscados com sucesso",
                data: getUsersResponse
        }
        return res.status(200).json(response)
},

async get(req: Request, res: Response) {
    const { id } = req.params
        if (id) {
            const getUserByIdResponse: userDBType | null = await UserModel.get(id as string)
            if (!getUserByIdResponse) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "Utilizador não encontrado",
                    data: null
                }
                return res.status(404).json(response)
            }

            const response: ResponseType<userDBType> = {
                status: "success",
                message: "Utilizador encontrado",
                data: getUserByIdResponse
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
            status: "success",
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
    return res.status(200).json({
        status: "success",
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
        status: "Success",
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

        const deleteUserResponse: userDBType | null = await UserModel.delete(id as string)

    if (!deleteUserResponse) {
        const response: ResponseType<null> = {
            status: "error",
            message: "Erro ao apagar usuário",
            data: null
        }
        return res.status(400).json(response)
    }
    const response: ResponseType<userDBType> = {
        status: "success",
        message: "Usuário apagado com sucesso",
        data: deleteUserResponse
    }
    return res.status(200).json(response) 
}

}