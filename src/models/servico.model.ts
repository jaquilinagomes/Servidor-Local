import type { RowDataPacket } from "mysql2";
import db from "../lib/db.js";
import { ServicoDetalhadoType, type servicoDBType } from "../utils/types.js";

export const ServiceModel = {
    async create(newService: servicoDBType): Promise<servicoDBType | null> {
        try {
        const query = `INSERT INTO tbl_servicos VALUES (?, ?, ?, ?, ?, ?, ?)`

        const values = [
            null,
            newService.nome,
            newService.descricao,
            newService.categoria,
            newService.enabled,
            new Date(),
            new Date()
        ]

        const [rows] = await db.execute<servicoDBType & RowDataPacket[]>(query, values)

        return rows
    } catch (error) {
        console.log(error)
        return null
    }
    },

    async getAll(): Promise<servicoDBType[] | null> {
        try {

        const query = `SELECT * FROM tbl_servicos`

        const rows = await db.execute<servicoDBType[] & RowDataPacket[]>(query)

        return Array.isArray(rows) && rows.length > 0 ? rows[0] : []

    } catch (error) {
        console.log(error)
        return null
    }
    },

    async get(id: string): Promise<servicoDBType | null> {
        try {
        const query = `SELECT * FROM tbl_servicos WHERE id = ?`

        const values = [id]

        const rows = await db.execute<servicoDBType & RowDataPacket[]>(query, values)

        return Array.isArray(rows) && rows.length > 0 ? rows[0] : null

    } catch (error) {
        console.log(error)
        return null
    }
    },

    async update(id: string, servicoAtualizado: servicoDBType) {
        try {
        const query = `UPDATE tbl_servicos
                    SET 
                        nome=?,
                        descricao=?,
                        categoria=?,
                        enabled=?,
                        updated_at=?
                    WHERE
                        id=?
                    ;`

        const values = [
            servicoAtualizado.nome,
            servicoAtualizado.descricao,
            servicoAtualizado.categoria,
            servicoAtualizado.enabled,
            new Date(),
            id
        ]

        const rows = await db.execute(query, values)

        return rows
    } catch (error) {
        console.log(error)
        return null
    }
    },

    async delete(id: string): Promise<servicoDBType | null> {
        try {
        const query = `DELETE FROM tbl_servicos WHERE id=?;`

        const value = [id]

        const rows: any = await db.execute<servicoDBType & RowDataPacket[]>(query, value)

        return rows[0]?.affectedRows === 0 ? null : rows
        
    } catch (error) {
        console.log(error)
        return null
    }
    },

    async getAllServicoDetalhadO(limit: number, offset: number) {
        try {
            const query = `
            SELECT
                s.id
                s.nome
                s.descricao
                c.designacao as designacao_categoria
                c.icone as icone_categoria
                e.id as id_empresa
                e.designacao as designacao_empresa
                e.icone as icone_empresa
                s.enabled
            FROM tbl_servicos s
            INNER JOIN tbl_categoria c ON c.id = s.id_categoria
            INNER JOIN tbl_empresa e ON e.id = s.id_empresa
            LIMIT ? OFFSET ?
            `

            const values = [limit, offset]

            const [rows] = await db.execute<ServicoDetalhadoType[] & RowDataPacket[]>(query, values)

            return Array.isArray(rows) && rows.length > 0 ? rows as ServicoDetalhadoType[] : null

        } catch (error) {
            console.log(error)
            return null
        }
    }
}
