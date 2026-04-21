import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string,
                email: string,
                role: string
            }
        }
    }
}

export default function AuthMilddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization
    // Bearer fkdsghuipdshggdga.kdhgsasgfderhfahlok

    if (!authHeader) {
        return res.status(401).json({message: "Utilizador não autenticado"})
    }

    const token = authHeader.split("")[1]
    // ["Bearer", "fkdsghuipdshggdga.kdhgsasgfderhfahlok"]

    try {
        const decodedToken = jwt.verify(token as string, process.env.JWT_SECRET as string) as { id: string, email: string, role: string }

        req.user = {
            id: decodedToken.id as string,
            email: decodedToken.email as string,
            role: decodedToken.role as string
        }

        next() 

    } catch(error) {
        return res.status(401).json({message: "Token inválido"})
    }
}

// RBAC - Role Base Access Control
export function authorize(roles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ message: "Utilizador não autorizado" })
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Permissao insuficiente" })
        }

        next()
    }
}

export function isOwner(model: any, field: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.user?.id

        const { id } = req.params

        const entity = await model.get(id as string)

        if (!userId) return res.status(404).json({message: "Entidade nao encontrada"})
        
        if (!userId) return res.status(401).json({message: "Utilizador nao autenticado"})
        
        if (entity[field] !== userId) return res.status(403).json({ message: "Permissao insuficiente"})

        next()
    }
}

/*
    req: {
        headers: {
            authorization: "Bearer fkdsghuipdshggdga.kdhgsasgfderhfahlok"

        }
    }

*/