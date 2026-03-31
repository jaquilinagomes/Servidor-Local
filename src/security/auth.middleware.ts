import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default function AuthMilddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization
    // Bearer fkdsghuipdshggdga.kdhgsasgfderhfahlok

    if (!authHeader) {
        return res.status(401).json({message: "Utilizador não autenticado"})
    }

    const token = authHeader.split("")[1]
    // ["Bearer", "fkdsghuipdshggdga.kdhgsasgfderhfahlok"]

    try {
        const decodedToken = jwt.verify(token as string, process.env.JWT_SECRET as string)

        next()

    } catch(error) {
        return res.status(401).json({message: "Token inválido"})
    }
}



/*
    req: {
        headers: {
            authorization: "Bearer fkdsghuipdshggdga.kdhgsasgfderhfahlok"

        }
    }

*/