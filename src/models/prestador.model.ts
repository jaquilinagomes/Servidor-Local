import type { PrestadorDBType, prestadorType, PropostaDBType } from "../utils/types.js";
import db from "../lib/db.js";
import { generateUUID } from "../utils/uuid.js";


export const PrestadorModel = {
    async create(prestador: PrestadorDBType) {
        try {
        const [ rows ] = await db.execute(
            `INSERT INTO tbl_prestadores
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,

            [
                generateUUID(),
                prestador.nif,
                prestador.profissao,
                prestador.taxa_urgencia,
                prestador.minimo_desconto,
                prestador.percentagem_desconto,
                prestador.enabled,
                new Date(),
                new Date()
            ]
        )
        console.log({ rows })
        return rows
    } catch(error) {
        console.log(error)
        return null
    }

    },

    async getAll() {
        const [ rows ] = await db.execute(
            `SELECT * FROM tbl_prestadores`)

            return rows
    },

    async get(id: string) {
        try {
            const [ rows ] = await db.execute(
                `SELECT * FROM tbl-prestadores
                WHERE tbl_prestadores.id = ?`,

                [id]
            )
            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] : null
        } catch(error) {
        console.log(error)
        return null
    }
},

async update(id: string, prestador: PrestadorDBType) {
    try {
        const [ rows ] = await db.execute(
            `UPDATE tbl_prestadores
            SET nif = ?,
            profissao = ?,
            taxa_urgencia = ?,
            minimo_desconto = ?,
            percentagem_desconto = ?,
            enabled = ?,
            updated_at = ?
            WHERE id = ?`,

            [
            prestador.nif,
            prestador.profissao,
            prestador.taxa_urgencia,
            prestador.minimo_desconto,
            prestador.percentagem_desconto,
            prestador.enabled,
            new Date(),
            id
            ]
        )
        console.log({rows})
        return rows
    } catch (error) {
        console.log(error)
        return null
    }
},





}