import type { RowDataPacket } from "mysql2"
import type { EmpresaDBType } from "../utils/types.js"
import db from "../lib/db.js"


export const EmpresaModel = {
    async create(empresa: EmpresaDBType): Promise<EmpresaDBType | null> {
        try {
        const [rows] = await db.execute<EmpresaDBType & RowDataPacket[]>(
            `INSERT INTO tbl_empresa VALUES (?,?,?,?,?,?,?,?,?,?)`,

            [
                null,
                empresa.designacao,
                empresa.descricao,
                empresa.nif,
                empresa.icone,
                empresa.id_utilizador,
                empresa.localizacao,
                empresa.enabled,
                new Date(),
                new Date()
            ],
        )
    
    console.log({ rows })
        return rows
    } catch (error) {
        console.log(error)
        return null
    }
},

async getAll(): Promise<EmpresaDBType[] | null> {
    const [rows] = await db.execute<EmpresaDBType[] & RowDataPacket[]>("SELECT * FROM tbl_empresa")

    return rows
},

async get(id: string): Promise<EmpresaDBType | null>{
    try {
        const [rows] = await db.execute<EmpresaDBType[] & RowDataPacket[]>(
            `SELECT * FROM tbl_empresa
        WHERE tbl_empresa.id = ?`,

            [id]
        )

        if (Array.isArray(rows) && rows.length === 0) return null
        return Array.isArray(rows) ? rows[0] as EmpresaDBType : null
    } catch (error) {
        console.log(error)
        return null
    }
},

async update(id: string, empresaAtualizada: EmpresaDBType) {
    try {
        const query = 
        `UPDATE FROM tbl_empresa
        SET
            id = ?,
            designacao = ?,
            descricao = ?,
            nif = ?,
            icone = ?,
            id_utilizador = ?,
            localizacao = ?,
            enabled = ?,
            updated_at = ?
        WHERE id = ?
        `
        const values = [
                empresaAtualizada.designacao,
                empresaAtualizada.descricao,
                empresaAtualizada.nif,
                empresaAtualizada.icone,
                empresaAtualizada.id_utilizador,
                empresaAtualizada.localizacao,
                empresaAtualizada.enabled,
                new Date(),
                id
        ]

        const rows = await db.execute(query, values)
        return Array.isArray(rows) && rows.length > 0 ? rows[0] : null

    }catch(error) {
        console.log(error)
        return null
    }
},

async delete(id: string): Promise<EmpresaDBType | null> {
    try {
        const query = `
        DELETE FROM tbl_empresa
        WHERE id = ?
        `
        const values = [id]

        const rows: any = await db.execute<EmpresaDBType & RowDataPacket[]>(query, values)
        return rows[0]?.affectedRows === 0 ? null : rows

    } catch(error) {
        console.log(error)
        return null
    }
}

}