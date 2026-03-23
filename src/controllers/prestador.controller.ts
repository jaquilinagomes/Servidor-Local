import { PrestadorModel } from "../models/prestador.model.js"
import type { Request, Response } from "express"
// import type { prestadorDBType } from "../utils/types.js"


export const PrestadorController = {
    async create(req: Request, res: Response) {
        const {novoPrestador} = req.body
        
            const criarPrestadorResponse = await PrestadorModel.create(novoPrestador)
        
            res.json(criarPrestadorResponse)
    }





}